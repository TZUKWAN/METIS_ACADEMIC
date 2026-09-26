---
description: 启动 METIS 研究工作流（项目初始化 → 研究类型选择 → 工作流装配 → 执行 → 交付）
argument-hint: [研究兴趣或项目名]
---

按 `engine/` 下 METIS ACADEMIC 运行时的调用契约驱动研究工作流：
1. 若存在进行中的 Workspace 项目 → 提示恢复（转 /metis-resume 语义）。
2. 否则初始化项目：记录研究兴趣 `$ARGUMENTS`，引导研究类型选择（质化/量化/机制+案例/理论/申报）。
3. 装配工作流（Common + Paradigm + Artifact + Level/Language/Template Rules）。
4. 按任务计划逐段推进：每段完成后运行阶段验证（fail-closed），产物落 Workspace。
5. 到检查点（选题定板、研究设计确认、结论把关）必须停下请求用户判断。
铁律：文献未核验不得进参考文献；定量变量必须来自显式研究设计；未接入模型时语义成文拒绝执行。
