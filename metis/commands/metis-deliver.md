# /metis-deliver — 交付研究项目

1. 引擎 `verify`：跑当前项目全局校验（引用链/占位/一致性）。有失败 → 逐条向用户
   展示并停在交付前（fail-closed），询问是否修复。
2. 引擎 `deliver`：组装 `deliverables/`（manuscript、references、figures、tables、
   data-package、code-package、复现报告、验证报告、delivery-note）。
3. 向用户展示 delivery-note 四段（完成了什么/在哪里/仍有哪些问题/需用户最终确认）。
