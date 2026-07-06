// Monitor global de erros — mostra falhas no ecrã (estilo Carvalho-55)
function showFatal(msg) {
  const el = document.getElementById('app');
  if (el) el.innerHTML = `<div style="max-width:360px;margin:40px auto;padding:16px;border-radius:14px;background:rgba(220,38,38,.12);color:#F87171;font-family:monospace;font-size:13px;word-break:break-word">⚠️ ${msg}</div>
  <button onclick="location.reload()" style="display:block;margin:0 auto;padding:12px 24px;border-radius:12px;border:none;background:#F59E0B;font-weight:700">Recarregar</button>`;
}
window.addEventListener('error', e => showFatal('Erro: ' + (e.message || e.type) + (e.filename ? '<br>' + e.filename.split('/').pop() + ':' + e.lineno : '')));
window.addEventListener('unhandledrejection', e => showFatal('Erro (promise): ' + (e.reason && e.reason.message ? e.reason.message : String(e.reason))));
