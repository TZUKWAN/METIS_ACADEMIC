/** The selected step belongs to one native owner message, not to the whole session. */
import {existsSync, linkSync, mkdirSync, readFileSync, unlinkSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {createHash, randomUUID} from 'node:crypto';
import {configurationHome, ConfigurationError} from './configuration.js';

const uuid = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i;

function contextFile(sessionId, requestId) {
  if (typeof sessionId !== 'string' || !sessionId || sessionId.length > 200 || typeof requestId !== 'string' || !uuid.test(requestId)) {
    throw new ConfigurationError('查看步骤的消息标识无效');
  }
  const key = createHash('sha256').update(sessionId).digest('hex');
  return join(configurationHome(), 'metis-project-message-context', key, requestId + '.json');
}

export function recordMessageStep(project, requestId, stepId) {
  const path = contextFile(project.sessionId, requestId);
  const record = {version:1, projectId:project.id, versionId:project.versionId, sessionId:project.sessionId, requestId, stepId};
  const bytes = JSON.stringify(record) + '\n';
  mkdirSync(dirname(path), {recursive:true, mode:0o700});
  const temporary = path + '.' + randomUUID() + '.tmp';
  writeFileSync(temporary, bytes, {flag:'wx', mode:0o600});
  try {
    try { linkSync(temporary, path); }
    catch (error) {
      if (error.code !== 'EEXIST') throw error;
      if (readFileSync(path, 'utf8') !== bytes) throw new ConfigurationError('此消息已关联另一查看步骤',409);
    }
  } finally { unlinkSync(temporary); }
  return record;
}

export function readMessageStep(agent, message, versionId) {
  const source = message?.source;
  if (!source || !['user','user-rpc'].includes(source.kind) || (source.principal && source.principal.kind !== 'owner') || !uuid.test(source.rpcId || '')) return null;
  const path = contextFile(agent.session.id, source.rpcId);
  if (!existsSync(path)) return null;
  const record = JSON.parse(readFileSync(path,'utf8'));
  if (record.version !== 1 || record.sessionId !== agent.session.id || record.requestId !== source.rpcId || record.versionId !== versionId) {
    throw new ConfigurationError('消息绑定的项目会话或固定版本不一致',409);
  }
  return record;
}
