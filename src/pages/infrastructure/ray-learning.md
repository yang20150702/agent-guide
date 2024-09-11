## Ray框架

As a consequence of the growing computational demands of machine learning algorithms, the need for powerful computer clusters is increasing. However, existing infrastructure for implementing parallel machine learning algorithms is still primitive. While good solutions for specific use cases (e.g., parameter servers or hyperparameter search) and parallel data processing do exist (e.g., Hadoop or Spark), to parallelize machine learning algorithms, practitioners often end up building their own customized systems, leading to duplicated efforts.

To help address this issue, the RISELab has created Ray, a high-performance distributed execution framework. Ray supports general purpose parallel and distributed Python applications and enables large-scale machine learning and reinforcement learning applications. It achieves scalability and fault tolerance by abstracting the control state of the system in a global control store and keeping all other components stateless. It uses a shared-memory distributed object store to efficiently handle large data through shared memory, and it uses a bottom-up distributed scheduling architecture to achieve low-latency and high-throughput scheduling. It uses a lightweight API based on dynamic task graphs and actors to express a wide range of applications in a flexible manner.
由于机器学习算法的计算需求不断增长，对强大的计算机集群的需求也在不断增加。然而，用于实现并行机器学习算法的现有基础设施仍然很原始。虽然确实存在针对特定用例（例如参数服务器或超参数搜索）和并行数据处理（例如 Hadoop 或 Spark）的良好解决方案，但为了并行化机器学习算法，从业者通常最终会构建自己的定制系统，从而导致重复工作。

为了帮助解决这个问题，RISELab创建了Ray，一个高性能分布式执行框架。Ray 支持通用并行和分布式 Python 应用程序，并支持大规模机器学习和强化学习应用程序。它通过在全局控制存储中抽象系统的控制状态并使所有其他组件保持无状态来实现可扩展性和容错性。它采用共享内存分布式对象存储，通过共享内存高效处理大数据，并采用自下而上的分布式调度架构，实现低延迟、高吞吐量的调度。它使用基于动态任务图和参与者的轻量级API以灵活的方式表达广泛的应用程序。

Ray框架用来扩展AI和Python应用的统一框架。Ray包含一个核心的分布式运行时，Ray AIR libraries的tookit用来加速ML负载。
提供tuning和model serving。

提供的组件：
+ 用于机器学习任务的可扩展库：例如数据预处理、分布式训练、超参数调整、强化学习和模型服务
+ 分布式计算原语：用来并行化和扩展Python应用
+ 用于将Ray集群和现有基础设施集成和部署的程序

提供的能力：
+ 跨多个节点和GPU来并行和分配工作负载
+ 云原生化：云计算资源
+ 扩展ML生态系统
+ 自动处理关键流程：编排、调度、容错、自动伸缩


### 系统架构

领域分层图

细节分层图：详细学习每一层，具体可分为：接口设计，设计原理，设计方案，实现源码；找到这个领域的关键技术点

核心技术
