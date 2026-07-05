// AboKlar — build 9 — 2026-07-05T08:15:03.236Z

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
    sort_date: '📅 Data',
    sort_name: '🔤 Nome A-Z',
    status: 'Estado',
    active_lbl: 'Ativa',
    inactive_lbl: 'Desativada',
    activate: 'Ativar',
    deactivate: 'Desativar',
    method: 'Método',
    bank: 'Banco',
    card: 'Cartão',
    country: 'País',
    website_ph: 'Site (opcional, ex: netflix.com — para o logótipo)',
    bank_ph: 'Banco (opcional)',
    card_ph: 'Cartão — últimos 4 dígitos (opcional)',
    next_charge: 'Próxima cobrança',
    close: 'Fechar',
    category: 'Categoria',
    value_lbl: 'Valor',
    in_days: 'em',
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
// Subscrições — CRUD + detalhe + estado + ordenação
const CURRENCIES = ['CHF', 'EUR', 'USD', 'GBP'];
const PAY_METHODS = ['Débito', 'Cartão', 'Twint', 'Apple Pay', 'Google Pay', 'PayPal', 'Transferência', 'Outro'];
const COUNTRIES = ['CH', 'PT', 'DE', 'FR', 'IT', 'AT', 'ES', 'NL', 'BE', 'GB', 'US'];
let SUBS_CACHE = [];
let SUBS_SORT = 'date';

function fmtMoney(v, cur) { return `${Number(v).toFixed(2)} ${cur}`; }

function flagEmoji(cc) {
  if (!cc || cc.length !== 2) return '';
  const A = 0x1F1E6;
  return String.fromCodePoint(A + cc.charCodeAt(0) - 65, A + cc.charCodeAt(1) - 65);
}

function subIcon(s) {
  if (s.website) {
    const dom = s.website.replace(/^https?:\/\//, '').split('/')[0];
    return `<img class="sub-logo" src="https://www.google.com/s2/favicons?domain=${dom}&sz=64" alt="" onerror="this.outerHTML=subLetter('${(s.name||'?')[0]}')">`;
  }
  return subLetter((s.name || '?')[0]);
}

function subLetter(ch) {
  return `<span class="sub-letter">${ch.toUpperCase()}</span>`;
}

function nextRenewal(s) {
  const today = new Date(); today.setHours(0,0,0,0);
  let base = null;
  if (s.renewal_date) base = new Date(s.renewal_date + 'T00:00:00');
  else if (s.billing_cycle === 'monthly' && s.renewal_day)
    base = new Date(today.getFullYear(), today.getMonth(), s.renewal_day);
  if (!base) return null;

  let d = new Date(base);
  const dayWanted = base.getDate();
  let guard = 0;
  while (d < today && guard++ < 600) {
    if (s.billing_cycle === 'yearly') {
      d = new Date(d.getFullYear() + 1, d.getMonth(), dayWanted);
    } else {
      let m = d.getMonth() + 1, y = d.getFullYear();
      if (m > 11) { m = 0; y++; }
      const lastDay = new Date(y, m + 1, 0).getDate();
      d = new Date(y, m, Math.min(dayWanted, lastDay));
    }
  }
  const days = Math.round((d - today) / 86400000);
  const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  return { date: iso, days };
}

async function loadSubs() {
  const { data, error } = await sb.from('subscriptions').select('*').order('name');
  if (error) { console.error(error); return []; }
  SUBS_CACHE = data || [];
  return SUBS_CACHE;
}

function subsTotals(subs) {
  const byCur = {};
  for (const s of subs) {
    if (!s.active) continue;
    const cur = s.currency || 'CHF';
    if (!byCur[cur]) byCur[cur] = { monthly: 0, yearly: 0 };
    const amt = Number(s.amount) || 0;
    if (s.billing_cycle === 'yearly') { byCur[cur].yearly += amt; byCur[cur].monthly += amt / 12; }
    else { byCur[cur].monthly += amt; byCur[cur].yearly += amt * 12; }
  }
  return byCur;
}

function setSubsSort(mode) { SUBS_SORT = mode; renderSubs(); }

async function renderSubs() {
  const subs = await loadSubs();
  const totals = subsTotals(subs);

  const sorted = [...subs].sort((a, b) => {
    if (SUBS_SORT === 'name') return a.name.localeCompare(b.name);
    const ra = nextRenewal(a), rb = nextRenewal(b);
    if (!ra && !rb) return a.name.localeCompare(b.name);
    if (!ra) return 1; if (!rb) return -1;
    return ra.days - rb.days;
  });

  const totalCards = Object.keys(totals).length
    ? `<div class="totals-row">
        <div class="total-card"><span class="total-label">${t('total_monthly')}</span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val">${fmtMoney(v.monthly, c)}</span>`).join('')}</div>
        <div class="total-card"><span class="total-label">${t('total_yearly')}</span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val">${fmtMoney(v.yearly, c)}</span>`).join('')}</div>
      </div>` : '';

  const list = sorted.length
    ? sorted.map(s => {
        const nr = nextRenewal(s);
        const meta2 = [s.payment_method, s.bank, s.card_last4 ? '••••' + s.card_last4 : null].filter(Boolean).join(' · ');
        return `
      <div class="row-card sub-row${s.active ? '' : ' off'}" onclick="renderSubDetail('${s.id}')">
        <div class="sub-icon-wrap">${subIcon(s)}</div>
        <div class="row-main">
          <span class="row-name"><span class="dot ${s.active ? 'dot-on' : 'dot-off'}"></span>${s.name} ${flagEmoji(s.country)}</span>
          <span class="row-cat">${[s.category, s.billing_cycle === 'yearly' ? t('yearly') : t('monthly')].filter(Boolean).join(' · ')}</span>
          ${meta2 ? `<span class="row-cat">${meta2}</span>` : ''}
          ${nr ? `<span class="row-cat">${nr.date} (${t('in_days')} ${nr.days}d)</span>` : ''}
        </div>
        <div class="row-side">
          <span class="row-amount">${fmtMoney(s.amount, s.currency)}</span>
          <div class="row-actions">
            <button class="mini-btn" onclick="event.stopPropagation();renderSubForm('${s.id}')">✏️</button>
            <button class="mini-btn danger" onclick="event.stopPropagation();deleteSub('${s.id}')">🗑️</button>
          </div>
        </div>
      </div>`;
      }).join('')
    : `<p class="muted" style="margin-top:30px">${t('no_subs')}</p>`;

  sectionShell(t('subs'), `
    ${totalCards}
    <button class="btn-primary" style="width:100%;margin:14px 0" onclick="renderSubForm()">${t('new')}</button>
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${SUBS_SORT === 'date' ? ' on' : ''}" onclick="setSubsSort('date')">${t('sort_date')}</button>
      <button class="seg-btn${SUBS_SORT === 'name' ? ' on' : ''}" onclick="setSubsSort('name')">${t('sort_name')}</button>
    </div>
    <div class="rows">${list}</div>
  `);
}

function renderSubDetail(id) {
  const s = SUBS_CACHE.find(x => x.id === id);
  if (!s) return;
  const nr = nextRenewal(s);
  const rows = [
    [t('category'), s.category],
    [t('cycle'), s.billing_cycle === 'yearly' ? t('yearly') : t('monthly')],
    [t('value_lbl'), fmtMoney(s.amount, s.currency)],
    [t('method'), s.payment_method],
    [t('bank'), s.bank],
    [t('card'), s.card_last4 ? '•••• ' + s.card_last4 : null],
    [t('country'), s.country ? `${flagEmoji(s.country)} ${s.country}` : null],
    [t('next_charge'), nr ? `${nr.date} (${t('in_days')} ${nr.days}d)` : null],
    [t('status'), s.active ? t('active_lbl') : t('inactive_lbl')]
  ].filter(r => r[1]);

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <div class="sub-icon-wrap big">${subIcon(s)}</div>
        <div>
          <div class="modal-title">${s.name} ${flagEmoji(s.country)}</div>
          <div class="modal-sub">${fmtMoney(s.amount, s.currency)} / ${s.billing_cycle === 'yearly' ? t('yearly').toLowerCase() : t('monthly').toLowerCase()}</div>
        </div>
      </div>
      ${rows.map(r => `<div class="detail-row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}
      <button class="btn-secondary" style="margin-top:14px" onclick="toggleSubActive('${s.id}', ${!s.active})">${s.active ? t('deactivate') + ' ⏸' : t('activate') + ' ▶️'}</button>
      <div class="modal-btns">
        <button class="btn-primary" onclick="this.closest('.modal-bg').remove();renderSubForm('${s.id}')">${t('edit')} ✏️</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('close')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function toggleSubActive(id, val) {
  const { error } = await sb.from('subscriptions').update({ active: val }).eq('id', id);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderSubs();
}

function renderSubForm(id) {
  const s = id ? SUBS_CACHE.find(x => x.id === id) : null;
  const isEdit = !!s;
  const cur = (s && s.currency) || 'CHF';
  const cycle = (s && s.billing_cycle) || 'monthly';
  const esc = v => (v || '').replace(/"/g, '&quot;');

  sectionShell(isEdit ? t('edit') : t('new'), `
    <div class="form">
      <input id="s-name" type="text" placeholder="${t('sub_name_ph')}" value="${esc(s && s.name)}">
      <input id="s-website" type="text" placeholder="${t('website_ph')}" value="${esc(s && s.website)}">
      <input id="s-cat" type="text" placeholder="${t('category_ph')}" value="${esc(s && s.category)}">
      <div class="form-row">
        <input id="s-amount" type="number" step="0.01" inputmode="decimal" placeholder="${t('amount_ph')}" value="${s ? s.amount : ''}">
        <select id="s-cur">${CURRENCIES.map(c => `<option value="${c}"${c === cur ? ' selected' : ''}>${c}</option>`).join('')}</select>
      </div>
      <div class="form-row">
        <select id="s-method"><option value="">${t('method')}…</option>${PAY_METHODS.map(m => `<option value="${m}"${s && s.payment_method === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
        <select id="s-country"><option value="">${t('country')}…</option>${COUNTRIES.map(c => `<option value="${c}"${s && s.country === c ? ' selected' : ''}>${flagEmoji(c)} ${c}</option>`).join('')}</select>
      </div>
      <input id="s-bank" type="text" placeholder="${t('bank_ph')}" value="${esc(s && s.bank)}">
      <input id="s-card" type="text" inputmode="numeric" maxlength="4" placeholder="${t('card_ph')}" value="${esc(s && s.card_last4)}">
      <label class="lbl">${t('cycle')}</label>
      <div class="seg">
        <button type="button" class="seg-btn${cycle === 'monthly' ? ' on' : ''}" onclick="segCycle(this,'monthly')">${t('monthly')}</button>
        <button type="button" class="seg-btn${cycle === 'yearly' ? ' on' : ''}" onclick="segCycle(this,'yearly')">${t('yearly')}</button>
      </div>
      <input type="hidden" id="s-cycle" value="${cycle}">
      <label class="lbl">${t('renewal_date')}</label>
      <input id="s-date" type="date" value="${s && s.renewal_date ? s.renewal_date : ''}">
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
}

async function saveSub(id) {
  const g = i => document.getElementById(i);
  const name = g('s-name').value.trim();
  const amount = parseFloat(g('s-amount').value);
  const cycle = g('s-cycle').value;
  const rdate = g('s-date').value || null;
  const errEl = g('s-err');

  if (!name) { errEl.innerHTML = `<div class="err">${t('err_fill')}</div>`; return; }
  if (!amount || amount <= 0) { errEl.innerHTML = `<div class="err">${t('err_amount')}</div>`; return; }

  const { data: { user } } = await sb.auth.getUser();
  const row = {
    user_id: user.id, name,
    website: g('s-website').value.trim() || null,
    category: g('s-cat').value.trim() || null,
    amount, currency: g('s-cur').value,
    payment_method: g('s-method').value || null,
    country: g('s-country').value || null,
    bank: g('s-bank').value.trim() || null,
    card_last4: g('s-card').value.trim() || null,
    billing_cycle: cycle,
    renewal_day: cycle === 'monthly' && rdate ? parseInt(rdate.slice(8, 10), 10) : null,
    renewal_date: rdate
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
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderSubs();
}

