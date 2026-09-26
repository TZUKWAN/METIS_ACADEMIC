# S7 — Data 链路验收场景（接入数据集 → 描述统计 → 产物落库）

## 目标
子智能体经插件能力完成一次数据接入与描述统计，产物落库且可复现。

## 前置
quant 项目（quant-design.yaml 已确认）；一个 CSV 数据集（用户提供/公开索引指向）。

## 用户输入序列
1. 「接入数据集 panel.csv 到 data/raw（来源记录到 data_sources.md）」
2. 「跑描述统计并把结果注册为 artifact"描述统计" v1」

## 验收清单
| # | 断言 |
|---|---|
| G1 | data/raw/panel.csv 存在，inventory 有 hash 记录 |
| G2 | data/metadata/data_sources.md 有来源行 |
| G3 | results/descriptives.md + .json 落盘 |
| G4 | artifacts.jsonl 有"描述统计" v1（sha256 非空） |
| G5 | 引擎 run_all 复现路径可用（summary.json 可再生） |

## 判定
G1–G5 全成立 → S7 = PASS。
