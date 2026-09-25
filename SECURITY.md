# 安全策略

## 报告漏洞
请通过 GitHub Issues（标记 security）或仓库所有者私信报告。72 小时内响应。

## 安全边界
- Workspace 写入限制在项目根目录内（路径越界拒绝）
- URL 下载仅写入 data/raw/，记录日志与 hash
- MCP/外部工具的敏感操作需显式确认（permission gate）
- 仓库不接受密钥入库；发现 secret 请立即报告
