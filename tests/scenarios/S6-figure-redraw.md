# S6 — 重画与版本验收场景

## 目标
选中图 → 输入重画要求 → v2 出现 → 切回 v1；旧版本不覆盖。

## 前置
定量项目已完成 make_figures（figures/ 有图）；FigureRedraw 可用。

## 用户输入序列
1. 「选中 coefplot，重画要求：配色改蓝橙」
2. 「切回 v1」

## 验收清单
| # | 断言 |
|---|---|
| F1 | redraw 返回 v2 且 lineage 长度 2 |
| F2 | v1 记录仍存在（路径/sha 不变） |
| F3 | switch v1 后 current 指向 version=1 |
| F4 | v1 内容未被 v2 覆盖（不同 sha） |

## 判定
F1–F4 全成立 → S6 = PASS。
