/**
 * METIS ACADEMIC mode — host half.
 *
 * Serves /metis/api/v1/* exact routes on the host web server so the client
 * panel can list METIS projects. Project state always comes from the
 * metis-academic engine CLI (`python -m metis_academic.cli status --json
 * --workspace <root>`) — the sanctioned ENGINE_CONTRACT v1 surface — never
 * from parsing .metis/ internals here.
 *
 * Persists mode state and scan roots in <DSH_HOME|~/.dsh>/metis-mode.json.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { createHash } from 'node:crypto';
import { createComposerAssistant } from './assistant.js';
import {createProjectDocuments} from './project-documents.js';

const PKG_ID = 'metis-academic-mode';

function configPath() {
	const home = process.env.DSH_HOME || join(homedir(), '.dsh');
	return join(home, 'metis-mode.json');
}

/** Default scan root: the workspace that ships this plugin (…/dsh-plugin/metis-mode/host → up 3). */
function defaultRoot() {
	try {
		return dirname(dirname(dirname(fileURLToPath(import.meta.url))));
	} catch {
		return process.cwd();
	}
}

function readConfig() {
	try {
		const parsed = JSON.parse(readFileSync(configPath(), 'utf8'));
		return {
			enabled: parsed.enabled === true,
			roots: Array.isArray(parsed.roots) && parsed.roots.length ? parsed.roots.map(String) : [defaultRoot()]
		};
	} catch {
		return { enabled: false, roots: [defaultRoot()] };
	}
}

function writeConfig(config) {
	try {
		writeFileSync(configPath(), JSON.stringify(config, null, 2) + '\n', 'utf8');
		return true;
	} catch {
		return false;
	}
}

function sendJson(response, status, payload) {
	const body = JSON.stringify(payload);
	response.writeHead(status, {
		'content-type': 'application/json; charset=utf-8',
		'cache-control': 'no-store'
	});
	response.end(body);
}

function readJsonBody(request, limit = 1024 * 1024) {
	return new Promise((resolvePromise, rejectPromise) => {
		let size = 0;
		const chunks = [];
		request.on('data', (chunk) => {
			size += chunk.length;
			if (size > limit) {
				rejectPromise(new Error('body too large'));
				request.destroy();
				return;
			}
			chunks.push(chunk);
		});
		request.on('end', () => {
			try {
				const text = Buffer.concat(chunks).toString('utf8');
				resolvePromise(text ? JSON.parse(text) : {});
			} catch (error) {
				rejectPromise(new Error('invalid JSON body'));
			}
		});
		request.on('error', rejectPromise);
	});
}

/** Minimal origin guard: same-origin requests pass; foreign origins are refused. */
function sameOrigin(request) {
	const origin = request.headers.origin;
	if (!origin) return true;
	try {
		return new URL(origin).host === request.headers.host;
	} catch {
		return false;
	}
}

/** One engine CLI call (ENGINE_CONTRACT v1 surface). */
function runEngine(root, subcommand) {
	return spawnSync('python', ['-m', 'metis_academic.cli', subcommand, '--json', '--workspace', root], {
		encoding: 'utf8',
		timeout: 20_000,
		windowsHide: true,
		env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
	});
}

/** One engine probe: does <root> hold a METIS project, and what does the engine report? */
function probeRoot(root) {
	const yamlPath = join(root, '.metis', 'project.yaml');
	if (!existsSync(yamlPath)) return { root, metis: false, name: basename(root) };
	let status = null;
	let tasks = null;
	let error = null;
	try {
		const run = runEngine(root, 'status');
		if (run.status === 0) {
			try {
				status = JSON.parse(run.stdout);
			} catch {
				error = 'status 输出不可解析：' + String(run.stdout ?? '').slice(0, 200);
			}
		} else {
			error = String(run.stderr || run.stdout || ('engine exit ' + run.status)).slice(-400).trim();
		}
	} catch (spawnError) {
		error = String(spawnError);
	}
	if (status) {
		// Task list powers the per-stage rail; failure here is non-fatal (card degrades).
		try {
			const runTasks = runEngine(root, 'tasks');
			if (runTasks.status === 0) {
				try { tasks = JSON.parse(runTasks.stdout); } catch { }
			}
		} catch { }
	}
	let updated = null;
	try { updated = statSync(yamlPath).mtime.toISOString(); } catch { }
	return { root, metis: true, name: basename(root), status, tasks, error, updated };
}

function buildRoutes(ctx) {
	const assistant = createComposerAssistant(ctx);
	const researchProjects=()=>{const service=ctx.get('metisPresetCatalog')?.researchProjects;if(!service)throw Object.assign(new Error('新版自定义项目服务尚未加载，请让DSH完成METIS更新；现有会话未改变'),{status:503});return service;};
	const documents=createProjectDocuments(ctx,researchProjects);
	const projectResponse=async(response,operation)=>{try{sendJson(response,200,{ok:true,...await operation()});}catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}};
	const guard = (handler) => (request, response) => {
		const connection=ctx.get('connection');
		if(!connection?.admit){sendJson(response,503,{ok:false,error:'DSH原生认证服务尚未就绪'});return;}
		const admission=connection.admit(request);
		if('rejection' in admission){sendJson(response,admission.rejection,{ok:false,error:'DSH authentication required'});return;}
		if(admission.peer.principal.kind!=='owner'){sendJson(response,403,{ok:false,error:'METIS全局配置仅限DSH所有者访问'});return;}
		if (!sameOrigin(request)) {
			sendJson(response, 403, { ok: false, error: 'cross-origin refused' });
			return;
		}
		try {
			const result = handler(request, response);
			// async handlers send their own response; catch late rejections here
			if (result && typeof result.catch === 'function') {
				result.catch((error) => {
					try { sendJson(response, 500, { ok: false, error: String(error?.message ?? error) }); } catch { }
				});
			}
		} catch (error) {
			sendJson(response, 500, { ok: false, error: String(error?.message ?? error) });
		}
	};

	return [
		{kind:'exact',path:'/metis/api/v1/research-projects',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method==='GET')return {...await researchProjects().list(),projectApiRevision:5,documentClientRevision:createHash('sha256').update(readFileSync(new URL('../client/documents.js',import.meta.url))).digest('hex').slice(0,16),displayClientRevision:createHash('sha256').update(readFileSync(new URL('../client/project-scene.js',import.meta.url))).digest('hex').slice(0,16),displayRendererRevision:createHash('sha256').update(readFileSync(new URL('../client/ion-world.bundle.js',import.meta.url))).digest('hex').slice(0,16)};
			if(request.method==='POST')return {project:await researchProjects().create(await readJsonBody(request))};
			throw Object.assign(new Error('不支持此项目请求方法'),{status:405});
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method!=='GET')throw Object.assign(new Error('仅支持读取项目'),{status:405});
			return {project:await researchProjects().detail(new URL(request.url,'http://localhost').searchParams.get('id'))};
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project/continue',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method!=='POST')throw Object.assign(new Error('仅支持继续项目'),{status:405});
			const body=await readJsonBody(request);return {project:await researchProjects().resume(body.id)};
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project/revise',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method!=='POST')throw Object.assign(new Error('仅支持提交返修意见'),{status:405});
			return researchProjects().revise(await readJsonBody(request));
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project/control',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method!=='POST')throw Object.assign(new Error('仅支持研究控制操作'),{status:405});
			return researchProjects().control(await readJsonBody(request));
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project/message-step',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method!=='POST')throw Object.assign(new Error('仅支持绑定本条项目消息'),{status:405});
			return researchProjects().bindMessageStep(await readJsonBody(request));
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project/downstream',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method!=='POST')throw Object.assign(new Error('仅支持确认后续选择'),{status:405});
			return researchProjects().decideDownstream(await readJsonBody(request));
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project/revisions',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method!=='GET')throw Object.assign(new Error('仅支持读取返修历史'),{status:405});const query=new URL(request.url,'http://localhost').searchParams;
			return researchProjects().revisions(query.get('id'),query.get('stepId'),Number(query.get('offset')||0));
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project/revision-artifact',handler:guard(async(request,response)=>{
			try{if(request.method!=='GET')throw Object.assign(new Error('仅支持读取历史交付物'),{status:405});const query=new URL(request.url,'http://localhost').searchParams;if(!query.has('index'))throw Object.assign(new Error('缺少历史文件编号'),{status:400});
				const file=researchProjects().revisionArtifact(query.get('id'),query.get('revisionId'),query.get('stepId'),Number(query.get('index')));
				response.writeHead(200,{'content-type':'application/octet-stream','content-length':file.bytes.length,'content-disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(file.name),'cache-control':'no-store','x-content-type-options':'nosniff'});response.end(file.bytes);
			}catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
		})},
		{kind:'exact',path:'/metis/api/v1/research-project/document',handler:guard((request,response)=>projectResponse(response,async()=>{
			if(request.method==='GET'){const query=new URL(request.url,'http://localhost').searchParams;if(!query.has('index'))throw Object.assign(new Error('缺少交付物编号'),{status:400});return {document:await documents.load(query.get('id'),query.get('stepId'),Number(query.get('index')))};}
			if(request.method==='POST')return await documents.save(await readJsonBody(request,12*1024*1024));
			throw Object.assign(new Error('仅支持读取与保存文档'),{status:405});
		}))},
		{kind:'exact',path:'/metis/api/v1/research-project/display-renderer',handler:guard((request,response)=>{
			if(request.method!=='GET'){sendJson(response,405,{ok:false,error:'仅支持读取离子回路场景'});return;}
			response.writeHead(200,{'content-type':'application/javascript; charset=utf-8','cache-control':'no-store'});response.end(readFileSync(new URL('../client/ion-world.bundle.js',import.meta.url)));
		})},
		{kind:'exact',path:'/metis/api/v1/research-project/display-client',handler:guard((request,response)=>{
			if(request.method!=='GET'){sendJson(response,405,{ok:false,error:'仅支持读取研究现场界面'});return;}
			response.writeHead(200,{'content-type':'application/javascript; charset=utf-8','cache-control':'no-store'});response.end(readFileSync(new URL('../client/project-scene.js',import.meta.url)));
		})},
		{kind:'exact',path:'/metis/api/v1/research-project/document-client',handler:guard((request,response)=>{
			if(request.method!=='GET'){sendJson(response,405,{ok:false,error:'仅支持读取文档界面'});return;}
			response.writeHead(200,{'content-type':'application/javascript; charset=utf-8','cache-control':'no-store'});response.end(readFileSync(new URL('../client/documents.js',import.meta.url)));
		})},
		{kind:'exact',path:'/metis/api/v1/research-project/document-preview',handler:guard(async(request,response)=>{
			try{if(request.method!=='GET')throw Object.assign(new Error('仅支持预览文档'),{status:405});const query=new URL(request.url,'http://localhost').searchParams;if(!query.has('index'))throw Object.assign(new Error('缺少交付物编号'),{status:400});
				if(query.get('view')==='pages'){sendJson(response,200,{ok:true,...await documents.pages(query.get('id'),query.get('stepId'),Number(query.get('index')),query.get('version'))});return;}
				const result=query.get('view')==='page'?await documents.pages(query.get('id'),query.get('stepId'),Number(query.get('index')),query.get('version'),Number(query.get('page'))):await documents.preview(query.get('id'),query.get('stepId'),Number(query.get('index')),query.get('version'));
				response.writeHead(200,{'content-type':result.mime,'content-length':result.bytes.length,'content-disposition':'inline','cache-control':'no-store','x-content-type-options':'nosniff','content-security-policy':"frame-ancestors 'self'; default-src 'none'; style-src 'unsafe-inline'",'x-metis-missing-fonts':encodeURIComponent((result.missingFonts||[]).join(','))});response.end(result.bytes);
			}catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
		})},
		{kind:'exact',path:'/metis/api/v1/research-project/artifact',handler:guard(async(request,response)=>{
			try{
				if(request.method!=='GET')throw Object.assign(new Error('仅支持读取已提交交付物'),{status:405});
				const query=new URL(request.url,'http://localhost').searchParams;
				if(!query.has('index'))throw Object.assign(new Error('缺少交付物编号'),{status:400});
				const file=await researchProjects().artifact(query.get('id'),query.get('stepId'),Number(query.get('index')));
				response.writeHead(200,{'content-type':'application/octet-stream','content-length':file.bytes.length,'content-disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(file.name),'cache-control':'no-store','x-content-type-options':'nosniff'});response.end(file.bytes);
			}catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
		})},
		{
			kind: 'exact', path: '/metis/api/v1/composer/client',
			handler: guard((_request,response)=>{
				const code=readFileSync(new URL('../client/composer.js',import.meta.url),'utf8');
				response.writeHead(200,{'content-type':'application/javascript; charset=utf-8','cache-control':'no-store'});response.end(code);
			})
		},
		{
			kind: 'exact', path: '/metis/api/v1/composer',
			handler: guard(async(request,response)=>{
				const catalog=ctx.get('metisPresetCatalog');
				if(!catalog?.snapshot){sendJson(response,503,{ok:false,error:'模式编排服务尚未就绪'});return;}
				try{
					if(request.method==='GET'){
						const code=readFileSync(new URL('../client/composer.js',import.meta.url),'utf8');
						sendJson(response,200,{ok:true,...(await catalog.snapshot()),assistant:assistant.capability(),editorRevision:createHash('sha256').update(code).digest('hex').slice(0,16)});
					}else if(request.method==='POST'){
						const body=await readJsonBody(request);const record=await catalog.save(body.id,body.profile,body.expectedRevision);
						sendJson(response,200,{ok:true,...record});
					}else sendJson(response,405,{ok:false,error:'Method not allowed'});
				}catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/configuration',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{const body=await readJsonBody(request,24*1024*1024);const snapshot=await ctx.get('metisPresetCatalog').commit(body.configuration,body.expectedRevision);sendJson(response,200,{ok:true,...snapshot,assistant:assistant.capability()});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/proposal',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{const body=await readJsonBody(request,24*1024*1024);const result=await ctx.get('metisPresetCatalog').propose(body.modeId,body.profile,body.configuration,body.draftProfiles,body.edits,{authorization:typeof body.authorization==='string'?body.authorization:'',signal:AbortSignal.timeout(180000)});sendJson(response,200,{ok:true,...result});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/session-versions',
			handler:guard(async(request,response)=>{
				if(request.method!=='GET'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{const query=new URL(request.url,'http://localhost').searchParams;const result=await ctx.get('metisPresetCatalog').sessionVersions({offset:Number(query.get('offset')||0),limit:25,signal:AbortSignal.timeout(30000)});sendJson(response,200,{ok:true,...result});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/session-version',
			handler:guard(async(request,response)=>{
				if(request.method!=='GET'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{const id=new URL(request.url,'http://localhost').searchParams.get('id');sendJson(response,200,{ok:true,value:ctx.get('metisPresetCatalog').sessionVersion(id)});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/runtime/progress',
			handler:guard(async(request,response)=>{
				try{
					let id;if(request.method==='POST')id=(await readJsonBody(request,4096)).sessionId;else if(request.method==='GET')id=new URL(request.url,'http://localhost').searchParams.get('sessionId');else{sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
					const catalog=ctx.get('metisPresetCatalog');if(!catalog?.runtimeProgress){sendJson(response,503,{ok:false,error:'本会话步骤进度服务尚未就绪'});return;}sendJson(response,200,{ok:true,progress:await catalog.runtimeProgress(id)});
				}catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/session-version/current',
			handler:guard(async(request,response)=>{
				if(request.method!=='GET'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{const id=new URL(request.url,'http://localhost').searchParams.get('sessionId');sendJson(response,200,{ok:true,value:await ctx.get('metisPresetCatalog').sessionVersionFor(id)});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/session-version/bind',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{const result=await ctx.get('metisPresetCatalog').bindLegacySession(await readJsonBody(request));sendJson(response,200,{ok:true,value:result});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/read',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
                try{const body=await readJsonBody(request,24*1024*1024);sendJson(response,200,{ok:true,value:await ctx.get('metisPresetCatalog').readItem(body.request,body.configuration)});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/assistant/session',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{sendJson(response,200,{ok:true,...await assistant.open(await readJsonBody(request,24*1024*1024))});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/assistant/session/bind',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{sendJson(response,200,{ok:true,...await assistant.bind(await readJsonBody(request))});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/assistant/context',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{sendJson(response,200,{ok:true,...await assistant.sync(await readJsonBody(request,24*1024*1024))});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message,code:error.code});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/assistant/state',
			handler:guard(async(request,response)=>{
				try{
					if(request.method==='POST'){
						const body=await readJsonBody(request);
                        sendJson(response,200,{ok:true,...assistant.state(body.workspaceId,body.afterRevision,body.afterDraftHash)});
					}else if(request.method==='GET'){
						const query=new URL(request.url,'http://localhost').searchParams;
						sendJson(response,200,{ok:true,...assistant.state(query.get('workspaceId'),query.has('afterRevision')?Number(query.get('afterRevision')):undefined,query.get('afterDraftHash')||undefined)});
					}else sendJson(response,405,{ok:false,error:'Method not allowed'});
				}catch(error){sendJson(response,error.status||500,{ok:false,error:error.message,code:error.code});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/assistant/save',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{sendJson(response,200,{ok:true,...await assistant.saveProposal(await readJsonBody(request))});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/assistant/dismiss',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{sendJson(response,200,{ok:true,...await assistant.dismiss(await readJsonBody(request))});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/assistant/reset',
			handler:guard(async(request,response)=>{
				if(request.method!=='POST'){sendJson(response,405,{ok:false,error:'Method not allowed'});return;}
				try{sendJson(response,200,{ok:true,...await assistant.reset(await readJsonBody(request))});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message,code:error.code});}
			})
		},
		...['models','chat','cancel'].map(action=>({kind:'exact',path:'/metis/api/v1/composer/assistant/'+action,
			handler:guard((_request,response)=>sendJson(response,409,{ok:false,error:'配置助手已改用DSH原生会话，请重新打开工作台。'}))})),
		{
			kind:'exact',path:'/metis/api/v1/composer/preview',
			handler:guard(async(request,response)=>{
				try{const body=await readJsonBody(request,24*1024*1024);const preview=ctx.get('metisPresetCatalog').preview(body.id,body.profile,body.stepId,body.configuration);sendJson(response,200,{ok:true,...preview});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind:'exact',path:'/metis/api/v1/composer/definition',
			handler:guard(async(request,response)=>{
				try{const id=new URL(request.url,'http://localhost').searchParams.get('mode');const value=await ctx.get('metisPresetCatalog').definition(id);sendJson(response,200,{ok:true,...value});}
				catch(error){sendJson(response,error.status||500,{ok:false,error:error.message});}
			})
		},
		{
			kind: 'exact',
			path: '/metis/api/v1/state',
			handler: guard((_request, response) => {
				const config = readConfig();
				sendJson(response, 200, { ok: true, enabled: config.enabled, roots: config.roots, modes: ctx.get('metisPresetCatalog')?.list() ?? [],versionAliases:ctx.get('metisPresetCatalog')?.versionAliases?.()??{} });
			})
		},
		{
			kind: 'exact',
			path: '/metis/api/v1/projects',
			handler: guard((_request, response) => {
				const config = readConfig();
				const projects = config.roots.map(probeRoot);
				sendJson(response, 200, { ok: true, scannedAt: new Date().toISOString(), projects });
			})
		},
		{
			kind: 'exact',
			path: '/metis/api/v1/tasks',
			handler: guard((request, response) => {
				const url = new URL(request.url, 'http://localhost');
				const root = url.searchParams.get('root') ?? '';
				if (!root || !existsSync(join(root, '.metis', 'project.yaml'))) {
					sendJson(response, 400, { ok: false, error: 'not a METIS project root: ' + root });
					return;
				}
				let payload = null;
				let error = null;
				try {
					const run = runEngine(root, 'tasks');
					if (run.status === 0) {
						try {
							payload = JSON.parse(run.stdout);
						} catch {
							error = 'tasks 输出不可解析';
						}
					} else {
						error = String(run.stderr || run.stdout || ('engine exit ' + run.status)).slice(-400).trim();
					}
				} catch (spawnError) {
					error = String(spawnError);
				}
				if (error) {
					sendJson(response, 500, { ok: false, error });
					return;
				}
				sendJson(response, 200, { ok: true, root, ...(payload ?? {}) });
			})
		},
		{
			kind: 'exact',
			path: '/metis/api/v1/modes',
			handler: guard(async (_request, response) => {
				const registry = ctx.get('agentPresets');
				const catalog = ctx.get('metisPresetCatalog');
				if (!registry || !catalog) { sendJson(response, 503, { ok: false, error: 'METIS preset registry is unavailable' }); return; }
				sendJson(response, 200, { ok: true, enabled: readConfig().enabled, catalog: catalog.list(), roster: (await registry.remoteExportList()).presets, registered: await registry.list() });
			})
		},
		{
			kind: 'exact',
			path: '/metis/api/v1/mode',
			handler: guard(async (request, response) => {
				const body = await readJsonBody(request);
				const config = readConfig();
				config.enabled = body.enabled === true;
				if (!writeConfig(config)) { sendJson(response, 500, { ok: false, error: 'Unable to persist METIS mode' }); return; }
				ctx.get('metisPresetCatalog')?.refresh();
				sendJson(response, 200, { ok: true, enabled: config.enabled });
			})
		},
		{
			kind: 'exact',
			path: '/metis/api/v1/roots',
			handler: guard(async (request, response) => {
				const body = await readJsonBody(request);
				const raw = typeof body.path === 'string' ? body.path.trim() : '';
				if (!raw) {
					sendJson(response, 400, { ok: false, error: 'path required' });
					return;
				}
				const resolved = join(raw); // normalize separators, keep as-given drive
				if (!existsSync(resolved)) {
					sendJson(response, 400, { ok: false, error: 'directory does not exist: ' + resolved });
					return;
				}
				const config = readConfig();
				if (!config.roots.some((existing) => existing.toLowerCase() === resolved.toLowerCase())) {
					config.roots.push(resolved);
					writeConfig(config);
				}
				sendJson(response, 200, { ok: true, roots: config.roots });
			})
		},
		{
			kind: 'exact',
			path: '/metis/api/v1/roots/remove',
			handler: guard(async (request, response) => {
				const body = await readJsonBody(request);
				const raw = typeof body.path === 'string' ? body.path : '';
				const config = readConfig();
				config.roots = config.roots.filter((existing) => existing.toLowerCase() !== raw.toLowerCase());
				writeConfig(config);
				sendJson(response, 200, { ok: true, roots: config.roots });
			})
		}
	];
}

export function apply(ctx) {
	ctx.provide('metisModeState', { get enabled() { return readConfig().enabled; } });
	ctx.inject(['webServer'], (hostCtx) => {
		const routes = buildRoutes(ctx);
		const disposers = [];
		for (const route of routes) {
			try {
				const off = hostCtx.webServer.register(route);
				if (typeof off === 'function') disposers.push(off);
			} catch (error) {
				console.warn('[' + PKG_ID + '] route failed to register:', route.path, String(error));
			}
		}
		ctx.effect(() => () => {
			for (const off of disposers) {
				try { off(); } catch { }
			}
		}, PKG_ID + ': routes');
	});
}

export const inject = ['webServer','connection'];
