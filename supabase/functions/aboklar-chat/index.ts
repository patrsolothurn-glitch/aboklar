import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
const C={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type, x-cron-secret','Access-Control-Allow-Methods':'POST, GET, OPTIONS'}
const MODELO_PRIMARIO='openai/gpt-oss-20b'
const MODELO_FALLBACK='openai/gpt-oss-120b'
function pedirGroq(KEY,msg,modelo){
return fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+KEY},body:JSON.stringify({model:modelo,max_tokens:500,messages:[{role:'system',content:'Es o assistente AboKlar. Ajudas utilizadores a gerir subscricoes e faturas mensais. Se conciso, max 3 paragrafos.'},{role:'user',content:msg}]})})
}
serve(async function(req){
if(req.method==='OPTIONS')return new Response('ok',{headers:C})
const KEY=Deno.env.get('ANTHROPIC_API_KEY')
if(!KEY)return new Response(JSON.stringify({error:'sem chave'}),{status:500,headers:{...C,'Content-Type':'application/json'}})
try{
const body=await req.json()
const msg=body.message||''
if(!msg)return new Response(JSON.stringify({error:'sem msg'}),{status:400,headers:{...C,'Content-Type':'application/json'}})
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
return new Response(JSON.stringify({error:true,code:ar.status,message:errMsg}),{status:200,headers:{...C,'Content-Type':'application/json'}})
}
console.log('modelo respondeu:',modelo)
const d=JSON.parse(txt)
const reply=d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content
if(!reply)return new Response(JSON.stringify({error:'vazio'}),{status:502,headers:{...C,'Content-Type':'application/json'}})
return new Response(JSON.stringify({reply:reply}),{headers:{...C,'Content-Type':'application/json'}})
}catch(e){
console.error('ERR:',e&&e.message)
return new Response(JSON.stringify({error:'interno'}),{status:500,headers:{...C,'Content-Type':'application/json'}})
}
})
