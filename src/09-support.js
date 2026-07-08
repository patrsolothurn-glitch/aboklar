// Suporte: chat com IA + painel admin
const SUPPORT_URL = 'https://dxmuchztqiglbmgswdsh.supabase.co/functions/v1/aboklar-chat';
let CHAT_HISTORY = [];
let CHAT_SESSION = null;

function getChatSession() {
  if (!CHAT_SESSION) CHAT_SESSION = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36);
  return CHAT_SESSION;
}

async function renderSupportChat() {
  sectionShell(t('help_chat_title'), `
    <div class="chat-hint">${t('help_chat_hint')}</div>
    <div id="chat-msgs" class="chat-msgs"></div>
    <div class="chat-input-row">
      <input id="chat-in" type="text" placeholder="${t('help_chat_ph')}" onkeydown="if(event.key==='Enter')sendChatMsg()">
      <button class="btn-primary chat-send" onclick="sendChatMsg()">${t('help_chat_send')}</button>
    </div>
  `);
  renderChatMsgs();
}

function renderChatMsgs() {
  const box = document.getElementById('chat-msgs');
  if (!box) return;
  box.innerHTML = CHAT_HISTORY.map(m => `
    <div class="chat-bubble ${m.role}">
      <span>${m.content.replace(/\n/g, '<br>')}</span>
    </div>`).join('');
  box.scrollTop = box.scrollHeight;
}

async function sendChatMsg() {
  const inp = document.getElementById('chat-in');
  if (!inp) return;
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  inp.disabled = true;

  CHAT_HISTORY.push({ role: 'user', content: msg });
  CHAT_HISTORY.push({ role: 'assistant', content: t('help_chat_thinking') });
  renderChatMsgs();

  try {
    const { data: { session } } = await sb.auth.getSession();
    const res = await fetch(SUPPORT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session ? session.access_token : ''}`,
        'x-cron-secret': 'aboklar-cron-7k2m9x4p'
      },
      body: JSON.stringify({
        message: msg,
        history: CHAT_HISTORY.slice(0, -1).filter(m => m.content !== t('help_chat_thinking')),
        session_id: getChatSession(),
        lang: LANG
      })
    });
    const d = await res.json();
    CHAT_HISTORY[CHAT_HISTORY.length - 1].content = d.reply || t('err_generic');
  } catch (e) {
    CHAT_HISTORY[CHAT_HISTORY.length - 1].content = t('err_generic');
  }
  renderChatMsgs();
  if (inp) inp.disabled = false;
}

// ---- painel admin (só para is_admin) ----
let ADMIN_FILTER = 'unread';

async function renderAdminSupport() {
  sectionShell(t('admin_support'), `
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${ADMIN_FILTER === 'unread' ? ' on' : ''}" onclick="setAdminFilter('unread')">${t('admin_unread')}</button>
      <button class="seg-btn${ADMIN_FILTER === 'all' ? ' on' : ''}" onclick="setAdminFilter('all')">${t('admin_all')}</button>
    </div>
    <div id="admin-chats"><p class="muted">A carregar…</p></div>
  `);
  loadAdminChats();
}

function setAdminFilter(f) { ADMIN_FILTER = f; renderAdminSupport(); }

async function loadAdminChats() {
  const { data: { session } } = await sb.auth.getSession();
  const res = await fetch(`${SUPPORT_URL}?admin=1&filter=${ADMIN_FILTER}`, {
    headers: {
      'Authorization': `Bearer ${session ? session.access_token : ''}`,
      'x-cron-secret': 'aboklar-cron-7k2m9x4p'
    }
  });
  const d = await res.json();
  const box = document.getElementById('admin-chats');
  if (!box) return;
  const sessions = d.sessions || [];
  if (!sessions.length) { box.innerHTML = `<p class="muted">—</p>`; return; }
  box.innerHTML = sessions.map(sess => `
    <div class="admin-sess" id="sess-${sess.session_id}">
      <div class="admin-sess-head">
        <span class="row-name">${sess.display_name || sess.user_email || '?'}${!sess.admin_read ? ' 🔴' : ''}</span>
        <span class="row-cat">${fmtDate(sess.last_at)}</span>
      </div>
      <div class="admin-msgs">${sess.messages.map(m =>
        `<div class="chat-bubble ${m.role}">${m.content.replace(/\n/g, '<br>')}</div>`
      ).join('')}</div>
      ${!sess.admin_read ? `<button class="btn-secondary" style="margin-top:8px" onclick="markRead('${sess.session_id}')">${t('mark_read')}</button>` : ''}
    </div>
  `).join('');
}

async function markRead(session_id) {
  const { data: { session } } = await sb.auth.getSession();
  await fetch(`${SUPPORT_URL}?mark_read=${session_id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session ? session.access_token : ''}`,
      'x-cron-secret': 'aboklar-cron-7k2m9x4p'
    }
  });
  loadAdminChats();
}
