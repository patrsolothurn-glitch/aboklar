// AboKlar — build 7 — 2026-07-05T07:58:57.093Z

// ===== 00-config.js =====
// Config Supabase (anon key é pública por design; segurança vem do RLS)
const SUPA_URL = 'https://dxmuchztqiglbmgswdsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4bXVjaHp0cWlnbGJtZ3N3ZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxOTM1MDIsImV4cCI6MjA5ODc2OTUwMn0.98Hq3MmpepzCpjE0lDcV-caT5r6xyANmjpU_aEckeVE';
const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);


// ===== 01-i18n.js =====
// i18n — PT completo; DE/FR/IT/EN acrescentam-se sem mexer no código
const I18N = {
  pt: {
    tagline: 'Subscrições e faturas, claro.',
    email: 'Email',
    password: 'Palavra-passe',
    password2: 'Repetir palavra-passe',
    name: 'Nome',
    login: 'Entrar',
    register: 'Criar conta',
    no_account: 'Ainda não tens conta?',
    has_account: 'Já tens conta?',
    forgot: 'Esqueceste a palavra-passe?',
    reset_send: 'Enviar link de recuperação',
    back: 'Voltar',
    confirm_title: 'Confirma o teu email 📬',
    confirm_body: 'Enviámos um link de confirmação para',
    confirm_hint: 'Abre o email e toca no link. Depois volta aqui e entra.',
    reset_sent: 'Se o email existir, enviámos um link de recuperação.',
    logout: 'Sair',
    welcome: 'Olá',
    home_soon: 'Subscrições e Faturas chegam no próximo passo 🚧',
    subs: 'Subscrições',
    subs_hint: 'mensal · anual',
    bills: 'Faturas',
    bills_hint: '✓ pago · arquivo',
    settings: 'Definições',
    section_soon: 'Esta secção chega no próximo passo 🚧',
    new: '+ Nova',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Apagar',
    delete_confirm: 'Apagar mesmo? Esta ação não pode ser desfeita.',
    edit: 'Editar',
    monthly: 'Mensal',
    yearly: 'Anual',
    per_month: '/mês',
    per_year: '/ano',
    total_monthly: 'Total mensal',
    total_yearly: 'Total anual',
    sub_name_ph: 'Nome (ex: Netflix)',
    amount_ph: 'Valor',
    category_ph: 'Categoria (opcional)',
    renewal_day: 'Dia de renovação',
    renewal_date: 'Data de renovação',
    cycle: 'Ciclo',
    currency_lbl: 'Moeda',
    no_subs: 'Ainda não tens subscrições. Toca em + Nova para começar.',
    next_renewal: 'Renova dia',
    err_amount: 'Valor inválido.',
    err_day: 'Dia inválido (1–31).',
    help: 'Ajuda',
    help_intro: 'Como funciona o AboKlar, passo a passo.',
    help_subs_title: '📋 Subscrições',
    help_subs_steps: [
      'Toca em <b>Subscrições</b> no ecrã inicial.',
      'Toca em <b>+ Nova</b> e preenche: nome (ex: Netflix), valor, moeda, ciclo (mensal ou anual) e dia de renovação.',
      'A subscrição aparece na lista com o valor e a próxima renovação.',
      'Os cartões no topo mostram o <b>total mensal</b> e o <b>total anual</b>.',
      'Para editar ou apagar, toca na subscrição e escolhe o lápis ✏️ ou o lixo 🗑️.'
    ],
    help_bills_title: '🧾 Faturas',
    help_bills_steps: [
      'Toca em <b>Faturas</b> no ecrã inicial.',
      'Toca em <b>+ Nova</b> e preenche: nome (ex: Eletricidade), valor de referência, dia do mês e, se quiseres, um <b>limite</b> para controlo.',
      'Cada mês, quando o dinheiro sair do banco, toca em <b>✓ Pago</b>.',
      'O valor aparece pré-preenchido com o último pagamento — corrige se for diferente e confirma.',
      'O pagamento vai para o <b>arquivo do mês</b>. Se passar o limite, fica marcado a vermelho.',
      'Podes corrigir o valor durante <b>5 dias úteis</b>. Depois bloqueia 🔒 — para editar na mesma, prime longo no registo.'
    ],
    help_general_title: '⚙️ Geral',
    help_general_steps: [
      'Em <b>Definições</b> podes mudar o idioma, a moeda e o tema (claro/escuro).',
      'Os teus dados são só teus — cada conta vê apenas as suas subscrições e faturas.',
      'Instala a app no telemóvel: no Chrome, menu ⋮ → <b>Adicionar ao ecrã principal</b>.'
    ],
    err_fill: 'Preenche todos os campos.',
    err_pw_match: 'As palavras-passe não coincidem.',
    err_pw_short: 'A palavra-passe deve ter pelo menos 8 caracteres.',
    err_invalid: 'Email ou palavra-passe errados.',
    err_not_confirmed: 'Email ainda não confirmado. Verifica a tua caixa de correio.',
    err_exists: 'Já existe uma conta com este email.',
    err_generic: 'Algo correu mal. Tenta outra vez.'
  }
};
let LANG = 'pt';
function t(k) { return (I18N[LANG] && I18N[LANG][k]) || I18N.pt[k] || k; }


// ===== 02-auth.js =====
// Lógica de autenticação
async function doLogin(email, pw) {
  const { error } = await sb.auth.signInWithPassword({ email, password: pw });
  if (error) {
    if (/not confirmed/i.test(error.message)) throw new Error(t('err_not_confirmed'));
    throw new Error(t('err_invalid'));
  }
}

async function doRegister(name, email, pw) {
  const { data, error } = await sb.auth.signUp({
    email,
    password: pw,
    options: {
      data: { display_name: name },
      emailRedirectTo: 'https://patrsolothurn-glitch.github.io/aboklar/'
    }
  });
  if (error) {
    if (/already/i.test(error.message)) throw new Error(t('err_exists'));
    throw new Error(t('err_generic'));
  }
  // signUp com email já registado devolve user sem identities
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw new Error(t('err_exists'));
  }
}

async function doReset(email) {
  await sb.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://patrsolothurn-glitch.github.io/aboklar/'
  });
}

async function doLogout() {
  await sb.auth.signOut();
  renderAuth('login');
}


// ===== 03-ui.js =====
// UI — ecrãs de auth e home provisória
const $app = () => document.getElementById('app');

function logoBlock() {
  return `
    <div class="logo-block">
      <img src="assets/icon-512.png" alt="AboKlar" class="logo-img">
      <h1 class="brand">Abo<span class="klar">Klar</span></h1>
      <p class="tagline">${t('tagline')}</p>
    </div>`;
}

function errBox(msg) {
  return msg ? `<div class="err">${msg}</div>` : '';
}

function pwField(id, placeholder, autocomplete) {
  return `<div class="pw-wrap">
    <input id="${id}" type="password" placeholder="${placeholder}" autocomplete="${autocomplete}">
    <button type="button" class="pw-eye" onclick="togglePw('${id}', this)">👁</button>
  </div>`;
}

function togglePw(id, btn) {
  const el = document.getElementById(id);
  if (el.type === 'password') { el.type = 'text'; btn.classList.add('on'); }
  else { el.type = 'password'; btn.classList.remove('on'); }
}

function renderAuth(view, ctx = {}) {
  let inner = '';
  if (view === 'login') {
    inner = `
      ${errBox(ctx.err)}
      <input id="f-email" type="email" placeholder="${t('email')}" autocomplete="email" value="${ctx.email || ''}">
      ${pwField('f-pw', t('password'), 'current-password')}
      <button class="btn-primary" onclick="uiLogin()">${t('login')}</button>
      <button class="btn-link" onclick="renderAuth('reset')">${t('forgot')}</button>
      <div class="divider"></div>
      <p class="muted">${t('no_account')}</p>
      <button class="btn-secondary" onclick="renderAuth('register')">${t('register')}</button>`;
  } else if (view === 'register') {
    inner = `
      ${errBox(ctx.err)}
      <input id="f-name" type="text" placeholder="${t('name')}" autocomplete="name" value="${ctx.name || ''}">
      <input id="f-email" type="email" placeholder="${t('email')}" autocomplete="email" value="${ctx.email || ''}">
      ${pwField('f-pw', t('password'), 'new-password')}
      ${pwField('f-pw2', t('password2'), 'new-password')}
      <button class="btn-primary" onclick="uiRegister()">${t('register')}</button>
      <div class="divider"></div>
      <p class="muted">${t('has_account')}</p>
      <button class="btn-secondary" onclick="renderAuth('login')">${t('login')}</button>`;
  } else if (view === 'confirm') {
    inner = `
      <div class="confirm-box">
        <h2>${t('confirm_title')}</h2>
        <p><strong>${ctx.email || ''}</strong></p>
        <p class="muted">${t('confirm_hint')}</p>
      </div>
      <button class="btn-secondary" onclick="renderAuth('login', {email:'${ctx.email || ''}'})">${t('login')}</button>`;
  } else if (view === 'reset') {
    inner = `
      ${ctx.sent ? `<div class="ok">${t('reset_sent')}</div>` : errBox(ctx.err)}
      <input id="f-email" type="email" placeholder="${t('email')}" autocomplete="email" value="${ctx.email || ''}">
      <button class="btn-primary" onclick="uiReset()">${t('reset_send')}</button>
      <button class="btn-link" onclick="renderAuth('login')">${t('back')}</button>`;
  }
  $app().innerHTML = `<div class="auth-card">${logoBlock()}${inner}</div>`;
}

async function renderHome(user) {
  const name = (user.user_metadata && user.user_metadata.display_name) || user.email;
  $app().innerHTML = `
    <div class="page">
      <header class="topbar">
        <div class="topbar-brand">
          <img src="assets/icon-512.png" alt="" class="topbar-logo">
          <span class="topbar-name">Abo<span class="klar">Klar</span></span>
        </div>
        <button class="icon-btn" onclick="renderSettings()" title="${t('settings')}">⚙️</button>
      </header>
      <p class="greet">${t('welcome')}, ${name} 👋</p>
      <div class="home-grid">
        <button class="home-card card-subs" onclick="renderSubs()">
          <span class="home-emoji">📋</span>
          <span class="home-title">${t('subs')}</span>
          <span class="home-hint">${t('subs_hint')}</span>
        </button>
        <button class="home-card card-bills" onclick="renderBills()">
          <span class="home-emoji">🧾</span>
          <span class="home-title">${t('bills')}</span>
          <span class="home-hint">${t('bills_hint')}</span>
        </button>
      </div>
      <button class="btn-help" onclick="renderHelp()">❓ ${t('help')}</button>
    </div>`;
}

function sectionShell(title, inner) {
  $app().innerHTML = `
    <div class="page">
      <header class="topbar">
        <button class="icon-btn" onclick="boot()">←</button>
        <span class="topbar-name">${title}</span>
        <span style="width:40px"></span>
      </header>
      ${inner}
    </div>`;
}

function renderBills() {
  sectionShell(t('bills'), `<p class="muted" style="margin-top:40px">${t('section_soon')}</p>`);
}

function helpSection(title, steps, open) {
  const items = steps.map((st, i) => `<li>${st}</li>`).join('');
  return `<details class="help-sec"${open ? ' open' : ''}>
    <summary>${title}</summary>
    <ol class="help-steps">${items}</ol>
  </details>`;
}

function renderHelp() {
  sectionShell(t('help'), `
    <p class="muted" style="text-align:left;margin-bottom:16px">${t('help_intro')}</p>
    ${helpSection(t('help_subs_title'), t('help_subs_steps'), true)}
    ${helpSection(t('help_bills_title'), t('help_bills_steps'), false)}
    ${helpSection(t('help_general_title'), t('help_general_steps'), false)}
  `);
}

function renderSettings() {
  sectionShell(t('settings'), `
    <p class="muted" style="margin-top:40px">${t('section_soon')}</p>
    <button class="btn-secondary" style="margin-top:24px" onclick="doLogout()">${t('logout')}</button>`);
}

// ---- handlers ----
async function uiLogin() {
  const email = document.getElementById('f-email').value.trim();
  const pw = document.getElementById('f-pw').value;
  if (!email || !pw) return renderAuth('login', { err: t('err_fill'), email });
  try {
    await doLogin(email, pw);
    boot();
  } catch (e) { renderAuth('login', { err: e.message, email }); }
}

async function uiRegister() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const pw = document.getElementById('f-pw').value;
  const pw2 = document.getElementById('f-pw2').value;
  if (!name || !email || !pw || !pw2) return renderAuth('register', { err: t('err_fill'), name, email });
  if (pw !== pw2) return renderAuth('register', { err: t('err_pw_match'), name, email });
  if (pw.length < 8) return renderAuth('register', { err: t('err_pw_short'), name, email });
  try {
    await doRegister(name, email, pw);
    renderAuth('confirm', { email });
  } catch (e) { renderAuth('register', { err: e.message, name, email }); }
}

async function uiReset() {
  const email = document.getElementById('f-email').value.trim();
  if (!email) return renderAuth('reset', { err: t('err_fill') });
  await doReset(email);
  renderAuth('reset', { sent: true, email });
}

// ---- arranque ----
async function boot() {
  const { data: { session } } = await sb.auth.getSession();
  if (session && session.user) renderHome(session.user);
  else renderAuth('login');
}
document.addEventListener('DOMContentLoaded', boot);


// ===== 04-subs.js =====
// Subscrições — CRUD + totais
const CURRENCIES = ['CHF', 'EUR', 'USD', 'GBP'];
let SUBS_CACHE = [];

function fmtMoney(v, cur) {
  return `${cur} ${Number(v).toFixed(2)}`;
}

async function loadSubs() {
  const { data, error } = await sb.from('subscriptions')
    .select('*').eq('active', true).order('name');
  if (error) { console.error(error); return []; }
  SUBS_CACHE = data || [];
  return SUBS_CACHE;
}

function subsTotals(subs) {
  // agrupar por moeda, sem conversão cambial
  const byCur = {};
  for (const s of subs) {
    const cur = s.currency || 'CHF';
    if (!byCur[cur]) byCur[cur] = { monthly: 0, yearly: 0 };
    const amt = Number(s.amount) || 0;
    if (s.billing_cycle === 'yearly') {
      byCur[cur].yearly += amt;
      byCur[cur].monthly += amt / 12;
    } else {
      byCur[cur].monthly += amt;
      byCur[cur].yearly += amt * 12;
    }
  }
  return byCur;
}

async function renderSubs() {
  const subs = await loadSubs();
  const totals = subsTotals(subs);

  const totalCards = Object.keys(totals).length
    ? `<div class="totals-row">
        <div class="total-card">
          <span class="total-label">${t('total_monthly')}</span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val">${fmtMoney(v.monthly, c)}</span>`).join('')}
        </div>
        <div class="total-card">
          <span class="total-label">${t('total_yearly')}</span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val">${fmtMoney(v.yearly, c)}</span>`).join('')}
        </div>
      </div>`
    : '';

  const list = subs.length
    ? subs.map(s => `
      <button class="row-card" onclick="renderSubForm('${s.id}')">
        <div class="row-main">
          <span class="row-name">${s.name}</span>
          ${s.category ? `<span class="row-cat">${s.category}</span>` : ''}
        </div>
        <div class="row-side">
          <span class="row-amount">${fmtMoney(s.amount, s.currency)}</span>
          <span class="row-sub">${s.billing_cycle === 'yearly' ? t('per_year') : t('per_month')}${s.renewal_day ? ' · ' + t('next_renewal') + ' ' + s.renewal_day : ''}</span>
        </div>
      </button>`).join('')
    : `<p class="muted" style="margin-top:30px">${t('no_subs')}</p>`;

  sectionShell(t('subs'), `
    ${totalCards}
    <button class="btn-primary" style="width:100%;margin:14px 0" onclick="renderSubForm()">${t('new')}</button>
    <div class="rows">${list}</div>
  `);
}

function renderSubForm(id) {
  const s = id ? SUBS_CACHE.find(x => x.id === id) : null;
  const isEdit = !!s;
  const cur = (s && s.currency) || 'CHF';
  const cycle = (s && s.billing_cycle) || 'monthly';

  sectionShell(isEdit ? t('edit') : t('new'), `
    <div class="form">
      <input id="s-name" type="text" placeholder="${t('sub_name_ph')}" value="${s ? s.name.replace(/"/g,'&quot;') : ''}">
      <input id="s-cat" type="text" placeholder="${t('category_ph')}" value="${s && s.category ? s.category.replace(/"/g,'&quot;') : ''}">
      <div class="form-row">
        <input id="s-amount" type="number" step="0.01" inputmode="decimal" placeholder="${t('amount_ph')}" value="${s ? s.amount : ''}">
        <select id="s-cur">${CURRENCIES.map(c => `<option value="${c}"${c === cur ? ' selected' : ''}>${c}</option>`).join('')}</select>
      </div>
      <label class="lbl">${t('cycle')}</label>
      <div class="seg">
        <button type="button" class="seg-btn${cycle === 'monthly' ? ' on' : ''}" onclick="segCycle(this,'monthly')">${t('monthly')}</button>
        <button type="button" class="seg-btn${cycle === 'yearly' ? ' on' : ''}" onclick="segCycle(this,'yearly')">${t('yearly')}</button>
      </div>
      <input type="hidden" id="s-cycle" value="${cycle}">
      <div id="s-day-wrap"${cycle === 'yearly' ? ' style="display:none"' : ''}>
        <label class="lbl">${t('renewal_day')}</label>
        <input id="s-day" type="number" min="1" max="31" inputmode="numeric" value="${s && s.renewal_day ? s.renewal_day : ''}">
      </div>
      <div id="s-date-wrap"${cycle === 'monthly' ? ' style="display:none"' : ''}>
        <label class="lbl">${t('renewal_date')}</label>
        <input id="s-date" type="date" value="${s && s.renewal_date ? s.renewal_date : ''}">
      </div>
      <div id="s-err"></div>
      <button class="btn-primary" onclick="saveSub(${isEdit ? `'${s.id}'` : 'null'})">${t('save')}</button>
      <button class="btn-secondary" onclick="renderSubs()">${t('cancel')}</button>
      ${isEdit ? `<button class="btn-danger" onclick="deleteSub('${s.id}')">${t('delete')} 🗑️</button>` : ''}
    </div>
  `);
}

function segCycle(btn, val) {
  document.getElementById('s-cycle').value = val;
  document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('s-day-wrap').style.display = val === 'monthly' ? '' : 'none';
  document.getElementById('s-date-wrap').style.display = val === 'yearly' ? '' : 'none';
}

async function saveSub(id) {
  const name = document.getElementById('s-name').value.trim();
  const category = document.getElementById('s-cat').value.trim() || null;
  const amount = parseFloat(document.getElementById('s-amount').value);
  const currency = document.getElementById('s-cur').value;
  const cycle = document.getElementById('s-cycle').value;
  const day = parseInt(document.getElementById('s-day').value, 10);
  const rdate = document.getElementById('s-date').value || null;
  const errEl = document.getElementById('s-err');

  if (!name) { errEl.innerHTML = `<div class="err">${t('err_fill')}</div>`; return; }
  if (!amount || amount <= 0) { errEl.innerHTML = `<div class="err">${t('err_amount')}</div>`; return; }
  if (cycle === 'monthly' && day && (day < 1 || day > 31)) { errEl.innerHTML = `<div class="err">${t('err_day')}</div>`; return; }

  const { data: { user } } = await sb.auth.getUser();
  const row = {
    user_id: user.id, name, category, amount, currency,
    billing_cycle: cycle,
    renewal_day: cycle === 'monthly' && day ? day : null,
    renewal_date: cycle === 'yearly' ? rdate : null
  };

  let error;
  if (id) ({ error } = await sb.from('subscriptions').update(row).eq('id', id));
  else ({ error } = await sb.from('subscriptions').insert(row));

  if (error) { console.error(error); errEl.innerHTML = `<div class="err">${t('err_generic')}</div>`; return; }
  renderSubs();
}

async function deleteSub(id) {
  if (!confirm(t('delete_confirm'))) return;
  const { error } = await sb.from('subscriptions').delete().eq('id', id);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  renderSubs();
}

