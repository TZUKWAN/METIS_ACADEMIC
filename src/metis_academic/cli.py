"""``metis`` CLI 入口。

- ``metis``            ：在当前目录启动 /metis 交互流程（文本向导）
- ``metis --version``  ：显示版本
"""

from __future__ import annotations

import argparse
import sys


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(
        prog="metis", description="METIS ACADEMIC — 对话级研究工作流运行时"
    )
    ap.add_argument("--version", action="store_true", help="显示版本")
    ap.add_argument("--workspace", default=None, help="Workspace 根目录（默认当前目录）")
    args = ap.parse_args(argv)
    if args.version:
        from . import __version__

        print(f"metis-academic {__version__}")
        return 0
    try:
        from .adapters import CliAdapter
        from .command import MetisCommand

        adapter = CliAdapter(workspace_root=args.workspace or ".")
        cmd = MetisCommand(adapter)
        cmd.run()
        return 0
    except EOFError:
        print("\n输入流结束。再次运行 `metis` 可从断点恢复。", file=sys.stderr)
        return 130
    except KeyboardInterrupt:
        print("\n已中断。再次运行 `metis` 可从断点恢复。", file=sys.stderr)
        return 130
    except Exception as e:  # noqa: BLE001 — CLI 顶层兜底
        from metis_academic.errors import MetisError

        if isinstance(e, MetisError):
            print(f"[METIS] {e}", file=sys.stderr)
        else:
            print(f"[METIS] 未预期的错误：{e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
