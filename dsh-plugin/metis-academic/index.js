import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, delimiter } from 'node:path';
import { fileURLToPath } from 'node:url';

export const name = 'metis-academic';

/**
 * METIS ACADEMIC 宿主插件。
 *
 * 职责：把 skills/metis/SKILL.md 注册为 DSH runtime skill（rank 250，
 * 压过用户目录 ~/.agents/skills/metis 的旧文件系统副本 rank 500）。
 * 资源（references/*）经 resourceBase 指向包内技能目录，由 DSH
 * 技能装载器按相对路径读取。七阶段执行纪律不进 Node 进程 —— 全部
 * 在技能正文中，由模型按 SKILL.md 驱动引擎 CLI 与 MCP 工具执行。
 */
export function apply(ctx, config = {}) {
  const sourceRoot=fileURLToPath(new URL('../../src/',import.meta.url)),python=config.python??'python';
  if(typeof python!=='string'||!python.trim())throw new Error('METIS Python executable must be a nonempty path or command.');
  if(config.bundledEngine===true&&!existsSync(join(sourceRoot,'metis_academic','mcp_server.py')))throw new Error('The unified METIS package is missing its Python engine source.');
  ctx.provide('metisAcademicEnvironment',Object.freeze({python,sourceRoot,pythonPath:[sourceRoot,process.env.PYTHONPATH].filter(Boolean).join(delimiter)}));
  // skills 是注入服务：必须经 ctx.inject 声明依赖后才能访问（否则
  // “cannot get property "skills" without inject”）。dshmarket 同款模式。
  ctx.inject(['skills'], (scope) => {
    const pkgDir = dirname(fileURLToPath(import.meta.url));
    const skillDir = join(pkgDir, 'skills', 'metis');
    const skillPath = join(skillDir, 'SKILL.md');
    const raw = readFileSync(skillPath, 'utf8');
    const { description, whenToUse, content } = parseSkillMarkdown(raw, skillPath);

    const dispose = scope.skills.register({
      name: 'metis',
      description,
      whenToUse,
      invocation: { modelInvocable: true, userInvocable: true },
      provider: 'metis-academic',
      source: 'plugin:metis-academic',
      content,
      path: skillPath,
      resourceBase: { kind: 'directory', path: skillDir },
    });

    scope.effect(() => dispose, 'metis-academic: dispose runtime skill');
  });
}

/** 解析 SKILL.md 的 YAML frontmatter（仅取单行标量字段，避免引入 yaml 依赖）。 */
function parseSkillMarkdown(raw, source) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) throw new Error(`metis-academic: ${source} 缺少 frontmatter`);
  const fm = m[1];
  const get = (key) => {
    const r = new RegExp(`^${key}:[ \\t]*(.+)$`, 'm').exec(fm);
    return r ? r[1].trim().replace(/^["']|["']$/g, '') : undefined;
  };
  return {
    description: get('description') || '哲学社会科学研究工作流（METIS）：七阶段纪律与真实性闸门',
    whenToUse: get('whenToUse'),
    content: raw.slice(m[0].length),
  };
}
