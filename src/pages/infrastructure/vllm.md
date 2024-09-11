## vLLM:

vLLM针对GPT类模型推理过程中KVCache这个显存占用大头专门设计了block_table，将KVCache分段成多个block存储在GPU中。一方面，这种设计可以共用beam search多batch之间share prompt sequence（的KVCache），减少显存占用。另一方面，在gpu显存和cpu内存间调度这些block，可以在有限的gpu显存空间下同时推理更大batch的sequence，换句话说，就是尽可能拉满gpu显存使用率，提高吞吐。

LLMEngine：接受来自clients的请求，并从LLM生成text。
+ tokenizer：分词器
+ language model(可能分布运行在多个GPU)
+ GPU memory space(为中间状态分配，例如aka KV Cache)

> LLMEngine利用了分层迭代调度和高效内存管理来最大化服务吞吐量(serving throughput)

## LLMEngine

`__init__`:
+ `_initialize_kv_caches`: 在worker(`model_executor`)中初始化KV Cache，worker来决定GPU cache和swap CPU cache中的blocks数量；并初始化cache

`add_request`：接收用户输入的Prompt，处理为Model Input，由Model进行推理
+ 模型推理的过程为：
  + 构造Sequence，通过不同的Params(SampleParams, PoolingParams)来创建SequenceGroup
  + scheduler添加`seq_group`，以便于后续调度

`step()`：执行一次decoding iteration，并返回新的生成结果
+ schedule()可执行的Sequence到下一个迭代：Schedules the sequences to be executed in the next iteration and the token blocks to be swapped in/out/copy.
+ 调用distributed executor来execute model
+ 处理模型输出

ModelExecutor：
Scheduler:
SequenceGroupOutputProcessor: 用于beamsearch或者speculative decoding

## Executor: 负责在特定device(CPU, GPU, NEuron...)上运行Model；也可以是一个分布式Executor

ExecutorBase
ExecutorAsyncBase

CPUExecutor

GPUExecutor：只支持单个GPU。
+ `_init_executor`：创建Worker，初始化device，然后`load_model()`
+ 核心能力都是由Worker来提供的

DistributedGPUExecutor


### Scheduler & BlockSpaceManager

Scheduler 内部维护了三个队列：waiting，running 和 swapped，分别对应三种 STATE。队列里的元素都是 SequenceGroup。此外，一个 scheduler 还包含一个 BlockSpaceManager，它用来管理 logical blocks 和 physical blocks 之间的映射关系。

然后就是 Scheduler 的关键接口 schedule。现在它只有一个 policy：FCFS（先来先服务）。

实际上，BlockSpaceManager只负责维护cache block到gpu/cpu空间的索引，真正进行换入、换出、拷贝操作都需要通过Worker中CacheEngine进行。因此在Scheduler调度的时候，也会收集BlockSpaceManager返回结果，得到当前step所需KVCache的block_to_swap_in、block_to_swap_out、block_to_copy，以供后续CacheEngine操作内存空间。

### CacheEngine

用于管理 KV Cache 的单元。

初始化时候，它先根据之前 profile 的数据（cpu/gpu blocks数）来 allocate cache。然后再给 caching 操作初始化一个 CUDA Stream，以及给每一个 layer 初始化一个 cuda event 来用做 stream synchronization。

在 vLLM 里，每个 key block 的 shape 是num_heads, head_size // x, block_size, x，其中 x 是 16 // dtype 的大小。也就是说 fp32 时 x=4，fp16 时 x=8。每个 value block 的 shape 是 num_heads, head_size, block_size。（为什么 key block 要按 x split？在后面的 kernel 实现里会提到这个加速）

在分配 cpu cache 时候，默认是会用 pin memory 的（除非在 WSL）。

cache engine 里支持了其它两个操作：

copy。由专门的 cu 函数 copy_blocks 支持。
swap_in 和 swap_out。有点像操作系统里的 swap 概念。in 就是 cpu to gpu，out 就是 gpu to cpu。内部实现由专门的 cu 函数 swap_blocks 支持。

### Preemption: Recompute @ Swap

vLLM 的 preemption 包含两种机制，一个是 recompute，另一个是 swap。recompute 就是把正在 running 中的seq group 状态设成 waiting，并且直接释放相关的 blocks。Swap 就是把正在 running 中的 seq group 状态设成 swapped，然后对应的 blocks swap 到 CPU 上。

在合适的时候，scheduler 调用 schedule 函数时会尝试把 swapped 状态的 seq group 从 CPU 再 swap in 回来，然后状态设成 running。

### PageAttention

在 self-attention 中，计算速度比内存速度快得多，因此进程(操作)越来越多地受到内存(HBM)访问的瓶颈。
PagedAttention是vLLM的核心技术，它解决了LLM服务中内存的瓶颈问题。传统的注意力算法在自回归解码过程中，需要将所有输入令牌的注意力键和值张量存储在GPU内存中，以生成下一个令牌。这些缓存的键和值张量通常被称为KV缓存。PagedAttention采用了虚拟内存和分页的经典思想，允许在非连续的内存空间中存储连续的键和值。通过将每个序列的KV缓存划分为块，PagedAttention可以高效地进行注意力计算。PagedAttention的内存利用效率接近最优，仅浪费不到4%的内存。此外，PagedAttention还支持高效的内存共享，进一步减少了复杂采样算法的内存开销，提高了吞吐量。

## transformer

Transformer模块主要由Attention+MLP/MOE组成。

`Z_{i} = Attention(Q_{i}, K_{i}, V_{i}) = softmax(\div{Q_{i} * K_{i}^T}{\sqrt{d_k}}) V_i`

prefilling：大模型计算全部的prompt，生成第一个token，并存储所有的KV缓存。decoding：输入前面生成的单个token，利用KV缓存一起计算出下一个token，将当前token计算出的新kv值添加到kv缓存队列中。循环当前步骤，直至当前输出的token等于截至token或者生成的token总数目到达输出上限。

LLM性能指标有
+ Time to First Token (TTFT)：prefilling阶段耗时
+ Time-Per-Output-Token (TPOT)：每次decoder阶段平均耗时
+ Latency：生成总耗时=TTFT+TPOT\*生成的token数目
+ throughput：生成的token数目/Latency
+ Model memory：模型内存
+ Peak Momery：峰值内存=模型内存+kvcache

推理优化

数据优化：prompt总结、压缩、检索
模型优化：1、架构优化，GQA、GLA、MOE等；2、量化、蒸馏等
系统优化：vllm、lmdeploy、tensorRT等

架构优化
架构上来说，主要是针对Attention和FFN进行优化。

Attention：MHA->MQA->GQA->MLA等。
FFN->MOE

系统级别优化是工程性优化，主要是算子合并、加速、多卡并行、内存管理等方面进行优化。主要有FlashAttention、PagedAttention、FlashDecoding和continues batching等。

Prefill vs decoding

以 Llama2-7B（4096 序列长度，float16精度）为例，计算一下 batch_size = 1的理想推理速度。
+ Prefilling：假设 prompt 的长度是 350 token，那么预填充所需要的时间 = number of tokens * ( number of parameters / accelerator compute bandwidth) = 350 * (2 * 7B) FLOP / 125 TFLOP/s = 39 ms（A10)。这个阶段主要是计算瓶颈。
+ decoding：time/token = total number of bytes moved (the model weights) / accelerato     r memory bandwidth = (2 * 7B) bytes / (600 GB/s) = 23 ms/token（A10)。这个阶段的瓶颈是带宽。

2、prefill多数据并行，属于计算瓶颈。decode阶段一次迭代一个token，内存耗时更多。因此加速方式如下降低输入长度可以优化prefill阶段耗时算子合并、优化的方式对prefill阶段加速更明显降低kv cache显存对降低decoding阶段耗时更有效MOE降低了激活参数也可以减少计算量，降低耗时一次预测多个token减少decode迭代步骤；用小draft模型快速推理初始结果，将prompt和初始结果一起输入大模型做判别，充分利用了LLM在prefill阶段计算效率更高的特点，在某种程度上也可以加速。
3、vllm和tensorRT-llm等框架，在处理时都会将不同batch的数据合并成一个batch（超长的total_seq），去除batch间不同长度的seq需要pad到同一长度造成的内存和计算量浪费。
4、FlashAttention的cuda实现，在bs小、seq小的场景下分配的cuda block数量小，会导致计算效率低。因此FlashAttention在实际推理场景加速效果不是特别好。且FA不支持head_dim超过256的场景。
5、FlashDecoding在FlashAttention的基础上，在query数据很小无法分块的场景下，针对kv继续分块，增加并行度，提高了计算效率。
6、PagedAttention碎片化内存管理大幅减少了内存的浪费，但不连续的内存无法一次性读取，在超超长token场景下会多出很多次的内存读取操作，大幅增减了耗时。其不连贯的内存读取需要修改kernel实现，无法和FlashAttention通用。
