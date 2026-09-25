#!/usr/bin/env python3
"""补丁：fund.py 评审 rubric 化（H15-001/002/003）+ runtime 对齐。"""
from pathlib import Path

p = Path("src/metis_academic/generators/fund.py")
s = p.read_text(encoding="utf-8")

# 1) FundReview rubric 化
old = '''@dataclass
class FundReview:
    """模拟评审结果（T019）。"""

    scores: dict[str, int] = field(default_factory=dict)
    issues: list[str] = field(default_factory=list)

    @property
    def total(self) -> int:
        return sum(self.scores.values())

    def passed(self) -> bool:
        return not self.issues'''
new = '''@dataclass
class FundReview:
    """模拟评审（T019/H15-001/002）：rubric 解释项，无固定数值评分。

    criteria 每条 = {criterion, status(pass/warn/fail), evidence, suggestion}
    """

    criteria: list[dict] = field(default_factory=list)
    issues: list[str] = field(default_factory=list)

    def passed(self) -> bool:
        return not self.issues and not any(
            c.get("status") == "fail" for c in self.criteria)

    def to_markdown(self) -> str:
        lines = ["# 模拟评审（rubric）", ""]
        for c in self.criteria:
            lines.append(f"- [{c['status']}] {c['criterion']}：{c['evidence']}")
            if c.get("suggestion"):
                lines.append(f"  - 建议：{c['suggestion']}")
        lines += ["", "## 形式问题", ""] + [f"- {i}" for i in self.issues]
        return "\\n".join(lines) + "\\n"'''
assert old in s, "FundReview anchor"
s = s.replace(old, new)

# 2) mock_review 去 fixed 分数 → criteria
old = '''        review = FundReview()
        review.scores = {"选题价值": 80, "研究设计": 75, "可行性": 78, "创新性": 72}'''
new = '''        review = FundReview()
        rq_doc = self.asm.read_if_exists("research/research_questions.md")
        methods_ok = (self.ws.root / "research" / "methods.md").is_file()
        n_citations = len(self.asm.verified_citations())
        review.criteria = [
            {"criterion": "研究问题明确（RQ 可辨识）",
             "status": "pass" if "RQ1" in rq_doc else "fail",
             "evidence": f"research_questions.md 含 {rq_doc.count('RQ')} 处 RQ 标记",
             "suggestion": "" if "RQ1" in rq_doc else "先定义 RQ1–RQ3"},
            {"criterion": "方法与数据可行性",
             "status": "pass" if methods_ok else "fail",
             "evidence": "research/methods.md 存在" if methods_ok else "缺 methods 文档",
             "suggestion": ""},
            {"criterion": "参考文献全部经核验",
             "status": "pass" if n_citations else "warn",
             "evidence": f"已核验引用 {n_citations} 条",
             "suggestion": "" if n_citations else "完成文献核验（DOI/arXiv resolver）"},
        ]'''
assert old in s, "scores anchor"
s = s.replace(old, new)

# 3) revision_list 附 criteria warn/fail
old = '''        for i in review.issues:
            lines.append(f"- [ ] {i}")
        p.write_text("\\n".join(lines) + "\\n", encoding="utf-8")
        return p'''
new = '''        for i in review.issues:
            lines.append(f"- [ ] {i}")
        for c in review.criteria:
            if c.get("status") in ("warn", "fail"):
                lines.append(
                    f"- [ ] [{c['status']}] {c['criterion']}：{c.get('suggestion', '')}")
        p.write_text("\\n".join(lines) + "\\n", encoding="utf-8")
        return p'''
assert old in s, "revision anchor"
s = s.replace(old, new)
p.write_text(s, encoding="utf-8")
print("fund.py patched")

# 4) runtime 对齐：rubric 报告
p2 = Path("src/metis_academic/runtime.py")
s2 = p2.read_text(encoding="utf-8")
old = '''        review = fund_review_gen(t)'''
if old in s2:
    pass  # 旧结构
old2 = '''        lines = ["# 模拟评审", "", f"总分: {review.total}", ""]
        lines += [f"- {k}: {v}" for k, v in review.scores.items()]
        lines += ["", "## 形式问题", ""] + [f"- {i}" for i in review.issues]'''
new2 = '''        lines = ["# 模拟评审（rubric）", ""]
        for c in review.criteria:
            lines.append(f"- [{c['status']}] {c['criterion']}：{c['evidence']}")
        lines += ["", "## 形式问题", ""] + [f"- {i}" for i in review.issues]'''
assert old2 in s2, "runtime review anchor"
s2 = s2.replace(old2, new2)
p2.write_text(s2, encoding="utf-8")
print("runtime patched")

# 5) 测试对齐
p3 = Path("tests/test_generators.py")
s3 = p3.read_text(encoding="utf-8")
old3 = '''        review = g.mock_review(tpl)
        assert review.total >= 200'''
new3 = '''        review = g.mock_review(tpl)
        # H15-001：无固定数值分；rubric 项均有 evidence
        assert not hasattr(review, "scores") or not review.scores
        assert review.criteria and all(c.get("evidence") for c in review.criteria)'''
assert old3 in s3, "test anchor"
s3 = s3.replace(old3, new3)
p3.write_text(s3, encoding="utf-8")
print("test patched")
