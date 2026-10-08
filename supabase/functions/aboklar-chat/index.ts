import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
const C={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type, x-cron-secret','Access-Control-Allow-Methods':'POST, GET, OPTIONS'}
const MODELO_PRIMARIO='openai/gpt-oss-20b'
const MODELO_FALLBACK='openai/gpt-oss-120b'
function pedirGroq(KEY,msg,modelo){
return fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+KEY},body:JSON.stringify({model:modelo,max_tokens:500,messages:[{role:'system',content:'Es o assistente AboKlar. Ajudas utilizadores a gerir subscricoes e faturas mensais. Se conciso, max 3 paragrafos.'},{role:'user',content:msg}]})})
}
async function getUser(authHeader,SRK,SUPA_URL){
if(!authHeader||!authHeader.startsWith('Bearer ')||authHeader==='Bearer ')return null
try{
const r=await fetch(SUPA_URL+'/auth/v1/user',{headers:{Authorization:authHeader,apikey:SRK}})
if(!r.ok)return null
const u=await r.json()
if(!u||!u.id)return null
return {id:u.id,email:u.email||null,display_name:(u.user_metadata&&u.user_metadata.display_name)||null}
}catch(_e){return null}
}
async function isAdmin(userId,SRK,SUPA_URL){
try{
const r=await fetch(SUPA_URL+'/rest/v1/profiles?id=eq.'+userId+'&select=is_admin',{headers:{apikey:SRK,Authorization:'Bearer '+SRK}})
const d=await r.json()
return !!(d&&d[0]&&d[0].is_admin)
}catch(_e){return false}
}
async function saveMsg(SRK,row,SUPA_URL){
try{
await fetch(SUPA_URL+'/rest/v1/support_chats',{method:'POST',headers:{apikey:SRK,Authorization:'Bearer '+SRK,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(row)})
}catch(e){console.error('SAVE ERR:',e&&e.message)}
}
serve(async function(req){
if(req.method==='OPTIONS')return new Response('ok',{headers:C})
const url=new URL(req.url)
const KEY=Deno.env.get('ANTHROPIC_API_KEY')
const SRK=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const SUPA_URL=Deno.env.get('SUPABASE_URL')

if(req.method==='GET'&&url.searchParams.get('admin')==='1'){
if(!SRK||!SUPA_URL)return new Response(JSON.stringify({error:'sem configuracao de base de dados'}),{status:500,headers:{...C,'Content-Type':'application/json'}})
const caller=await getUser(req.headers.get('Authorization')||'',SRK,SUPA_URL)
if(!caller)return new Response(JSON.stringify({error:'nao autenticado'}),{status:401,headers:{...C,'Content-Type':'application/json'}})
if(!await isAdmin(caller.id,SRK,SUPA_URL))return new Response(JSON.stringify({error:'sem permissao'}),{status:403,headers:{...C,'Content-Type':'application/json'}})
const filter=url.searchParams.get('filter')||'unread'
let q=SUPA_URL+'/rest/v1/support_chats?select=*&order=created_at.asc'
if(filter==='unread')q+='&admin_read=eq.false'
const rowsR=await fetch(q,{headers:{apikey:SRK,Authorization:'Bearer '+SRK}})
const rows=await rowsR.json()
const bySession={}
for(const r of (rows||[])){
if(!bySession[r.session_id])bySession[r.session_id]={session_id:r.session_id,display_name:r.display_name,user_email:r.user_email,last_at:r.created_at,admin_read:true,messages:[]}
const s=bySession[r.session_id]
s.messages.push({role:r.role,content:r.content})
s.last_at=r.created_at
if(!r.admin_read)s.admin_read=false
}
const sessions=Object.values(bySession).sort((a,b)=>(b.last_at||'').localeCompare(a.last_at||''))
return new Response(JSON.stringify({sessions}),{headers:{...C,'Content-Type':'application/json'}})
}

if(req.method==='POST'&&url.searchParams.get('mark_read')){
if(!SRK||!SUPA_URL)return new Response(JSON.stringify({error:'sem configuracao de base de dados'}),{status:500,headers:{...C,'Content-Type':'application/json'}})
const caller=await getUser(req.headers.get('Authorization')||'',SRK,SUPA_URL)
if(!caller)return new Response(JSON.stringify({error:'nao autenticado'}),{status:401,headers:{...C,'Content-Type':'application/json'}})
if(!await isAdmin(caller.id,SRK,SUPA_URL))return new Response(JSON.stringify({error:'sem permissao'}),{status:403,headers:{...C,'Content-Type':'application/json'}})
const sessionId=url.searchParams.get('mark_read')
await fetch(SUPA_URL+'/rest/v1/support_chats?session_id=eq.'+encodeURIComponent(sessionId),{method:'PATCH',headers:{apikey:SRK,Authorization:'Bearer '+SRK,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({admin_read:true})})
return new Response(JSON.stringify({ok:true}),{headers:{...C,'Content-Type':'application/json'}})
}

if(!KEY)return new Response(JSON.stringify({error:'sem chave'}),{status:500,headers:{...C,'Content-Type':'application/json'}})
try{
const body=await req.json()
const msg=body.message||''
const sessionId=body.session_id||null
if(!msg)return new Response(JSON.stringify({error:'sem msg'}),{status:400,headers:{...C,'Content-Type':'application/json'}})

let base=null
if(SRK&&SUPA_URL&&sessionId){
const caller=await getUser(req.headers.get('Authorization')||'',SRK,SUPA_URL)
base={session_id:sessionId,user_id:caller?caller.id:null,user_email:caller?caller.email:null,display_name:caller?caller.display_name:null}
await saveMsg(SRK,{...base,role:'user',content:msg},SUPA_URL)
}

let modelo=MODELO_PRIMARIO
let ar=await pedirGroq(KEY,msg,modelo)
let txt=await ar.text()
console.log('STATUS:',ar.status,txt.slice(0,200))
if(!ar.ok&&(ar.status===404||ar.status===400)){
console.log('modelo',modelo,'falhou com',ar.status,'- a tentar',MODELO_FALLBACK)
modelo=MODELO_FALLBACK
ar=await pedirGroq(KEY,msg,modelo)
txt=await ar.text()
console.log('STATUS (fallback):',ar.status,txt.slice(0,200))
}
if(!ar.ok){
let errMsg='Erro desconhecido'
try{
const errBody=JSON.parse(txt)
errMsg=(errBody.error&&errBody.error.message)||errBody.message||txt.slice(0,300)
}catch(_e){
errMsg=txt.slice(0,300)
}
if(base)await saveMsg(SRK,{...base,role:'assistant',content:'[erro '+ar.status+'] '+errMsg},SUPA_URL)
return new Response(JSON.stringify({error:true,code:ar.status,message:errMsg}),{status:200,headers:{...C,'Content-Type':'application/json'}})
}
console.log('modelo respondeu:',modelo)
const d=JSON.parse(txt)
const reply=d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content
if(!reply){
if(base)await saveMsg(SRK,{...base,role:'assistant',content:'[erro vazio] resposta da Groq sem conteudo'},SUPA_URL)
return new Response(JSON.stringify({error:'vazio'}),{status:502,headers:{...C,'Content-Type':'application/json'}})
}
if(base)await saveMsg(SRK,{...base,role:'assistant',content:reply},SUPA_URL)
return new Response(JSON.stringify({reply:reply}),{headers:{...C,'Content-Type':'application/json'}})
}catch(e){
console.error('ERR:',e&&e.message)
return new Response(JSON.stringify({error:'interno'}),{status:500,headers:{...C,'Content-Type':'application/json'}})
}
})
