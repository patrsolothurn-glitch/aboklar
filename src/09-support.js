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
let ADMIN_TAB = 'chats';

async function renderAdminSupport() {
  sectionShell(t('admin_support'), `
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${ADMIN_TAB === 'stats' ? ' on' : ''}" onclick="setAdminTab('stats')">📊 Stats</button>
      <button class="seg-btn${ADMIN_TAB === 'chats' ? ' on' : ''}" onclick="setAdminTab('chats')">${t('admin_support')}</button>
    </div>
    <div id="admin-content"><p class="muted">A carregar…</p></div>
  `);
  if (ADMIN_TAB === 'stats') loadAdminStats();
  else renderAdminChatsPanel();
}

function setAdminTab(tab) { ADMIN_TAB = tab; renderAdminSupport(); }

async function loadAdminStats() {
  const box = document.getElementById('admin-content');
  if (!box) return;
  box.innerHTML = `<p class="muted">A carregar estatísticas…</p>`;
  const [statsRes, usersRes] = await Promise.all([
    sb.rpc('get_admin_stats'),
    sb.rpc('get_user_list')
  ]);
  if (statsRes.error || !statsRes.data) {
    box.innerHTML = `<p class="muted" style="color:var(--err)">Erro: ${statsRes.error?.message || 'sem dados'}</p>`;
    return;
  }
  const s = { ...statsRes.data, users: (usersRes.data || []).sort((a,b) => new Date(a.created_at) - new Date(b.created_at)) };
  const badge = (icon, val, label) => `
    <div style="display:flex;align-items:center;gap:6px;background:var(--bg);border-radius:8px;padding:7px 10px">
      <span style="font-size:1rem">${icon}</span>
      <div>
        <div style="font-weight:700;font-size:.95rem;line-height:1.2">${val}</div>
        <div style="font-size:.68rem;color:var(--muted)">${label}</div>
      </div>
    </div>`;
  const userCard = u => `
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border)">
        <div style="width:38px;height:38px;border-radius:50%;background:var(--acc);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1rem;color:#000;flex-shrink:0">${(u.display_name || '?')[0].toUpperCase()}</div>
        <div style="min-width:0">
          <div style="font-weight:600;font-size:.95rem">${u.display_name || '—'}</div>
          <div style="font-size:.78rem;color:var(--acc);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.email || '—'}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${badge('📅', u.created_at ? new Date(u.created_at).toLocaleDateString('pt-PT') : '—', 'Registo')}
        ${badge('🌐', (u.language || '?').toUpperCase() + ' · ' + (u.currency || '?'), 'Idioma · Moeda')}
        ${badge('📋', u.sub_count || 0, 'Subscrições')}
        ${badge('🧾', u.bill_count || 0, 'Faturas')}
      </div>
    </div>`;
  const statBlock = (icon, val, label) => `
    <div style="text-align:center;padding:12px 8px">
      <div style="font-size:1.5rem;font-weight:700;color:var(--acc);line-height:1">${val}</div>
      <div style="font-size:.65rem;color:var(--muted);margin-top:4px">${icon} ${label}</div>
    </div>`;
  box.innerHTML = `
    <div style="font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:10px">Utilizadores</div>
    ${s.users && s.users.length ? s.users.map(userCard).join('') : '<p class="muted">—</p>'}
    <div style="font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:16px 0 10px">Totais</div>
    <div class="card" style="display:grid;grid-template-columns:repeat(3,1fr);margin-bottom:8px;border-radius:14px;overflow:hidden">
      ${statBlock('👤', s.total_users, 'Utilizadores')}
      ${statBlock('📋', s.total_subs, 'Subscrições')}
      ${statBlock('🧾', s.total_bills, 'Faturas')}
    </div>
    <div class="card" style="display:grid;grid-template-columns:1fr 1fr;border-radius:14px;overflow:hidden">
      ${statBlock('🆕', s.new_7d, 'Novos 7 dias')}
      ${statBlock('📅', s.new_30d, 'Novos 30 dias')}
    </div>
  `;
}

function renderAdminChatsPanel() {
  const box = document.getElementById('admin-content');
  if (!box) return;
  box.innerHTML = `
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${ADMIN_FILTER === 'unread' ? ' on' : ''}" onclick="setAdminFilter('unread')">${t('admin_unread')}</button>
      <button class="seg-btn${ADMIN_FILTER === 'all' ? ' on' : ''}" onclick="setAdminFilter('all')">${t('admin_all')}</button>
    </div>
    <div id="admin-chats"><p class="muted">A carregar…</p></div>
  `;
  loadAdminChats();
}

function setAdminFilter(f) { ADMIN_FILTER = f; renderAdminChatsPanel(); }

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
