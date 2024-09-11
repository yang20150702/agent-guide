## LLM Agent 与 robotics

> 基于综述，简单做一个PPT，重点在于顶层规划方向，以及Agent的应用场景；同时，展示几个实际的用例，主要用 huggface开源的能力

画一个领域分层架构图：
+ 分为几层
+ 每层的能力
+ 上层的业务能力

LLM Agent 在robotics领域的进展

找一篇综述论文，挑一篇针对性的论文，确定LLM Agent快速落地robotics的方向

梳理LLM Agent与robotics的技术栈

## 技术分享

ROS与LLM是相互交互的关系，ROSDescribe

机器人系统的领域知识：构成以及对应的解决方案
机器人系统的具体实现
Agent与机器人想结合的领域以及功能：目前的关注的重点在LLM侧，比如：语言条件下的robot操作
如何落地机器人的实现：划定功能域（基于现有的机器人进行功能整合（半成品，强化我们的大模型能力，针对Robot系统的构成进行优化）、从头开始（成本较高，））

机器人系统的构成
+ Robot Perception
+ Robot Decision-making and Planning
+ Robot Action Generation

我们将单独训练的语言、视觉和机器人控制模型组合到PaLM-E（一种机器人学的具体多模态模型）和Robotic Transformer 2 (RT-2)中，这是一种新颖的视觉-语言-动作 (VLA) 模型，可以学习网络和机器人数据，并将这些知识转化为机器人控制的通用指令。

Robotic Transformer 2 (RT-2) 是一种新颖的视觉-语言-动作 (VLA) 模型，可以从网络和机器人数据中学习，并将这些知识转化为机器人控制的通用指令
https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/

https://sites.google.com/view/transperception : Robotic Perception of Transparent Objects: A Review
机器人技术的层次范式遵循自上而下的方法，机器人首先感知世界，然后计划下一步行动，最后执行它。分层范式也称为协商架构。层次结构中的每一层都依赖于其下方的层来获取信息和指导。反应式范例优先考虑直接与传感器输入相关的即时响应，无需进行广泛的规划。混合审议-反应范式在反应性响应和更高级别决策之间取得平衡，利用基于感官信息的即时反应和计划行动。
从机器人吸尘器到半自动汽车，人工智能机器人系统已成为我们日常生活中不可或缺的一部分。这些系统建立在三个基本架构元素之上：感知、导航和规划以及控制
一个通用的三层混合架构，对应于感知-计划-行动范式，其中感知、导航和规划以及控制作为其组成层

机器人感知；机器人规划和导航、机器人控制
机器学习（ML）和深度学习（DL）技术的最新进展为开发具有执行感知、导航和规划以及控制等功能的认知能力的机器人铺平了道路。这种赋权使机器人能够感知、学习、推理并做出实时决策，密切模仿人类行为。

参考：
https://robotics-fm-survey.github.io/
https://pupper-independent-study.readthedocs.io/en/latest/index.html : 斯坦福大学的机器人课程
https://tidybot.cs.princeton.edu/
https://github.com/huggingface/lerobot
https://github.com/hk-zh/language-conditioned-robot-manipulation-models
https://github.com/jrin771/Everything-LLMs-And-Robotics

## robotics论文

Multimodal Human–Robot Interaction for Human-Centric Smart Manufacturing: A Survey: https://onlinelibrary.wiley.com/doi/full/10.1002/aisy.202300359
在认知科学中，人类智能大致分为感知、认知和行动三类，[ 16 ]如图1所示。感知涉及感知环境、人类和物体以及解释传感器数据。这个过程包括通过视觉、音频和触觉等感官方式收集信息，并对其进行处理以进行识别和预测。认知涉及推理、根据感知信息和指定目标提出建议以及与他人沟通。这包括规划、解决问题和学习等程序。行动涉及基于感知和认知能力与他人、环境和任务执行进行身体互动。这包括对象操作、协作任务和身体动作。为机器人配备最大程度的这些智能类型将使我们更接近实现更自然的 HRI。

Language-conditioned Learning for Robot Manipulation: A Survey
语言条件下的机器人操作代表着一个尖端领域的研究，实现了人类和机器人代理之间的无缝沟通和合作。这一领域专注于教导机器人系统理解并执行自然语言传达的指令。为实现这一目标，开发能够从文本输入中提取可操作见解的强大语言理解模型至关重要。在这份全面的调查中，我们系统地探讨了语言条件下机器人操作领域的最新进展。我们根据它们的学习范式对这些方法进行了分析，这些范式包括强化学习、模仿学习以及基础模型的整合，如大型语言模型和视觉-语言模型。此外，我们进行了深入的比较分析，考虑到语义信息提取、环境与评估、辅助任务以及任务表示等方面。最后，我们概述了语言条件下学习用于机器人操作领域的潜在未来研究方向，包括泛化能力和安全问题的主题。

这种体系结构框架提供了对语言条件下的机器人操作的概览。该代理包含三个关键模块：语言模块、感知模块和控制模块。这些模块分别用于理解指令、感知环境状态和习得技能。视觉-语言模块建立了指令与周围环境之间的联系，实现对两个方面的更深入理解。来自两种模态的信息交互使机器人能够进行高层规划并执行视觉问答任务，从而最终提升其整体性能。控制模块具有通过从奖励学习（强化学习）和专家制定的示范（模仿学习）获得低层策略的能力。有时，这些低层策略也可以直接设计或硬编码，利用路径规划和运动规划算法。有两个关键循环值得强调。位于左侧的交互循环便于人机语言交互。右侧的控制循环表示代理与周围环境之间的互动。

AutoRT: https://auto-rt.github.io/
结合了语言、视觉和最近的行动的基础模型彻底改变了利用互联网规模数据来推理有用任务的能力。 然而，训练具体基础模型的关键挑战之一是缺乏基于物理世界的数据。 在本文中，我们提出了 AutoRT，这是一个利用现有基础模型在完全看不见的场景中以最少的人工监督来扩大操作机器人部署的系统。 AutoRT 利用视觉语言模型 (VLM) 进行场景理解和基础，并进一步使用大型语言模型 (LLM) 来提出由一组机器人执行的多样化和新颖的指令。 通过利用基础模型的知识来指导数据收集，使 AutoRT 能够有效地推理自主权衡和安全性，同时显着扩大机器人学习的数据收集范围。 我们演示了 AutoRT 向多个建筑物中的 20 多个机器人提出指令，并通过远程操作和自主机器人策略收集 77,000 个真实的机器人事件。 我们通过实验表明，AutoRT 收集的此类“野外”数据明显更加多样化，并且 AutoRT 对 LLM 的使用允许遵循可以符合人类偏好的数据收集机器人的指令。

RoboGen: https://robogen-ai.github.io/

RoboGen，这是一种生成式机器人Agent，可以通过生成模拟来自动大规模学习各种机器人技能

Toward General-Purpose Robots via Foundation Models: A Survey and Meta-Analysis  https://robotics-fm-survey.github.io/
在本文中，我们提出了一项通过基础模型构建通用机器人的综述。 我们主要将基础模型分为机器人中使用的视觉和语言模型以及机器人基础模型。
我们还介绍了这些模型如何缓解经典机器人挑战的挑战，以及对未来潜在研究方向的预测。

Large Language Models for Robotics: A Survey
人类通过多模态反馈学习、概括和控制复杂操作任务的能力表明了一种独特的能力，我们将其称为灵巧智能。 理解和评估这种情报是一项复杂的任务。 随着大语言模型（LLM）的快速发展和广泛普及，它们在机器人领域的应用越来越受到关注。 法学硕士拥有处理和生成自然语言的能力，促进与机器人的高效交互和协作。 机器人领域的研究人员和工程师已经认识到法学硕士在增强机器人智能、人机交互和自主性方面的巨大潜力。 因此，本次综合综述旨在总结法学硕士在机器人领域的应用，深入探讨其对机器人控制、感知、决策和路径规划等关键领域的影响和贡献。 我们首先概述机器人学法学硕士的背景和发展，然后描述机器人学法学硕士的好处以及基于法学硕士的机器人模型的最新进展。 然后，我们深入研究模型中使用的各种技术，包括感知、决策、控制和交互中使用的技术。 最后，我们探讨了法学硕士在机器人领域的应用以及它们在不久的将来可能面临的一些潜在挑战。 具身智能是智能科学的未来，而基于法学硕士的机器人技术是实现这一目标的有前途但具有挑战性的途径之一


Real-World Robot Applications of Foundation Models: A Review
我们将简单描述机器人应用中使用的基础模型的类型以及下游任务，并参考[25]对基础模型本身的讨论。
2021年，经过大量数据训练并且可以轻松应用于各种下游任务的模型被称为“基础模型”[25]。 基础模型具有三个主要特征：
• 情境学习
• 缩放定律
• 同质化
情境学习只需几个示例即可完成新任务，无需重新训练或微调。 随着数据、计算资源和模型大小的增加，缩放定律允许持续改进性能。
同质化允许某些基础模型架构以统一的方式处理不同的模式。
n 2021, a model that has been trained on a large amount of data and can be easily applied to a wide range of downstream tasks has come to be referred to as a “foundation model” [25]. Foundation models are characterized by three main characteristics:
• In-context learning
• Scaling law
• Homogenization
In-context learning enables the accomplishment of new tasks with just a few examples, without the need for retraining or fine-tuning. Scaling laws allow for continued performance improvements as data, computational resources, and model sizes are increased.
Homogenization allows for certain foundation model architectures to handle diverse modalities in a unified manner.

基础模型包括：
+ 语言基础模型: LLM
+ Vision-Language Model: VLM
+ Vision: Large Vision Model
+ Audio-Language Model: ALM
+ Foundation Models for 3D Representation
+ 其他模态

应用
low-level perception
• high-level perception
• high-level planning
• low-level planning
• data augmentation

机器人基础模型应用概述。 有了基础模型，低层感知进行特征提取或场景识别，高层感知进行奖励生成或地图构建，高层规划进行任务规划或代码生成，低层规划进行足迹生成或命令生成以及数据 增强进行图像增强或指令增强。机器人基础模型的利用概述。 具有基础模型、低级
感知进行特征提取或场景识别，高层感知进行奖励生成或地图构建，高层规划进行任务规划或代码生成，低层规划进行足迹生成或命令生成，数据增强进行图像增强或指令增强 。

Manipulation（操作）、Navigation、Locomotion（运动）、Communications

PaLM-E [171] is a multimodal language model
除了专注于利用基础模型进行机器人感知和规划的研究之外，还有一些旨在为机器人本身创建基础模型的工作，这些模型可以称为机器人基础模型。 与 LLM 或 VLM 相比，开发机器人基础模型需要对机器人领域进行特殊考虑。 例如，为机器人收集不同的数据集比 LLM 和 VLM 的成本更高，后者可以使用从互联网收集的数据轻松进行训练，而这种困难抑制了机器人基础模型的扩展。 此外，机器人系统应该处理除图像或文本之外的多种类型的数据。

### Toward General-Purpose Robots via Foundation Models: A Survey and Meta-Analysis

https://robotics-fm-survey.github.io/

在本文中，我们提出了一项通过基础模型构建通用机器人的综述。 我们主要将基础模型分为机器人中使用的视觉和语言模型以及机器人基础模型。
我们还介绍了这些模型如何缓解经典机器人挑战的挑战，以及对未来潜在研究方向的预测。

#### Robotic系统的组成部分

Robot Peception:
+ Rassive Perception 被动感知
+ State Estimation 状态估计
+ Active Perception

机器人需要感知机制，以便从原始传感器观察中提取语义知识，建立状态表示，并在其操作环境中进行推理。 与典型的计算机视觉系统不同，机器人感知强调实时能力、多模态（RGB、深度、LiDAR、IMU、触觉等）的使用、与其他机器人系统模块（决策、规划、控制）的耦合 ，并与实施例和环境接地[46, 47]。

被动感知：机器人感知系统中典型计算机视觉算法最常见的用例是场景理解。 这里的目标是通过处理视觉信号（例如，2D 图像数据、雷达信息、LiDAR/RGB-D 点云）来提取有关环境的语义和几何属性的见解，也许是为了执行目标检测和跟踪等特定任务 、语义分割、姿势估计、新颖的视图合成或场景重建[48-52]。
状态估计是基于传感器测量估计机器人的姿态或速度的具有挑战性的问题。 同步定位与建图（SLAM）任务将姿态估计和建图问题无缝地集成在一起。
主动感知：前面介绍的方法使机器人只能以被动方式感知环境的能力，其中信息获取或决策在感知系统的暂时演化中不起作用。 由于机器人会移动并经常与环境交互，因此机器人还应该能够主动感知环境。 先前解决主动感知问题的方法着眼于与环境交互的镜头[76]或通过改变观看方向来获取更多视觉信息

Robot Decision-making and Planning:
+ Classical Planning
_+ learning-based planning

Robot Action Generation:
+ Classical Control: 通过直接驱动或电机控制实现的低级动作控制是大多数机器人栈的最后一步。 堆栈的这一部分通常取决于确切的平台，并且通常包含动力学和执行器约束，从而通过将机器人保持在其操作范围内来确保生成的动作的可行性。 虽然控制输入通常位于连续空间中，但运动原语通常用于提供一组离散的动作，以便于与更高级别的决策循环连接。 可以说，PID 控制回路是机器人系统中使用最广泛的底层控制结构。 当成本函数可用时，基于优化的方法（又称最优控制），例如模型预测控制（MPC）及其变体[100-103]通常用于在后退设置中生成动作序列。 模型预测路径积分（MPPI）控制器[104]是 MPC 的一种变体，广泛应用于学习成本图的采样公式中。
+ Learning-based Control Applying imitation learning [105] or reinforcement learning [106] in robotic control has beenstudied for decades. 模仿学习和强化学习已经被研究了好多年

### Robotics的挑战

Data Scarcity: 数据稀缺

Requirements of Models and Primitives: 经典的规划和控制方法通常需要精心设计的环境和机器人模型

Task Specifications: 理解任务规范并将其扎根于机器人当前对世界的理解是获得通才智能体的关键挑战。

Uncertainty and Safety: 不确定性和安全性
One of the critical challenges in deploying robots in the real world comes from dealing with the uncertainty inherent in the environments and task specifications. Uncertainty, based on its source, can be characterized either as epistemic (uncertainty caused by a lack of knowledge) or aleatoric (noise inherent in the environment).
在现实世界中部署机器人的关键挑战之一来自于处理环境和任务规范中固有的不确定性。 根据其来源，不确定性可以分为认知性（由于缺乏知识而导致的不确定性）或随意性（环境中固有的噪音）。

Foundation Models used in Robotics and Robotics Foundation Models (RFMs).


#### LLMs and VLMs in Task Planning

该直方图显示了我们纳入本次调查的论文中，开发机器人系统时使用不同基础模型的次数。 在图中我们可以看到 GPT-4、GPT-3 是首选，因为它们具有少量提示的性质，以及通过 API 的可访问性。 CLIP 和 ViLD 经常用于桥接图像和文本表示。 除了 CLIP 之外，T5 系列模型也经常用于对文本进行编码以获取文本特征。 PaLM和PaLM-E用于机器人规划。 RT-1 最初是为操纵而开发的，后来作为其他操纵模型构建的新基础模型出现

## 结论

在这篇调查论文中，我们根据两个主要类别分析了当前机器人基础模型的研究工作：（1）将基础模型应用于机器人任务的工作，以及（2）尝试使用机器人技术开发用于机器人任务的机器人基础模型的工作 数据。 我们回顾了这些论文的方法和实验，并根据这些研究工作提供了分析和见解。 此外，我们还特别介绍了这些基础模型如何帮助解决机器人技术中的常见挑战。 最后，我们讨论了基础模型尚未解决的机器人技术的剩余挑战，以及其他有前途的研究方向。
