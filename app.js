// AboKlar — build 13 — 2026-07-05T08:42:14.462Z

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
    bills_tab: 'Faturas',
    archive_tab: '📦 Arquivo',
    bill_name_ph: 'Nome (ex: Eletricidade)',
    ref_amount_ph: 'Valor de referência',
    limit_ph: 'Limite (opcional)',
    due_day: 'Dia do mês (aprox.)',
    mark_paid: '✓ Pago',
    paid_badge: 'Pago',
    pending: 'Pendente',
    no_bills: 'Ainda não tens faturas. Toca em + Nova para começar.',
    no_payments: 'Sem pagamentos neste mês.',
    month_total: 'Total do mês',
    over_limit: 'acima do limite',
    confirm_paid_title: 'Confirmar pagamento',
    paid_on: 'Pago a',
    locked_hint: 'Bloqueado 🔒 — prime longo para editar',
    edit_payment: 'Corrigir valor',
    delete_payment: 'Apagar pagamento',
    limit_lbl: 'Limite',
    ref_lbl: 'Referência',
    set_language: 'Idioma',
    set_currency: 'Moeda por defeito',
    set_theme: 'Tema',
    theme_auto: 'Automático',
    theme_light: 'Claro',
    theme_dark: 'Escuro',
    set_name: 'Nome',
    saved: 'Guardado ✓',
    lang_soon: '(brevemente)',
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
  if (session && session.user) {
    await loadProfile();
    renderHome(session.user);
  } else renderAuth('login');
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
function fmtDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}.${m}.${y}`;
}

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
          ${nr ? `<span class="row-cat">${fmtDate(nr.date)} (${t('in_days')} ${nr.days}d)</span>` : ''}
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
    [t('next_charge'), nr ? `${fmtDate(nr.date)} (${t('in_days')} ${nr.days}d)` : null],
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


// ===== 05-bills.js =====
// Faturas — CRUD + ✓ Pago + arquivo mensal + limite + bloqueio 5 dias úteis
let BILLS_CACHE = [];
let PAYMENTS_CACHE = [];
let BILLS_TAB = 'bills'; // 'bills' | 'archive'
let ARCH_PERIOD = null;  // 'YYYY-MM'
const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function curPeriod() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function periodLabel(p) {
  const [y, m] = p.split('-');
  return `${MONTHS_PT[parseInt(m, 10) - 1]} ${y}`;
}

function shiftPeriod(p, delta) {
  let [y, m] = p.split('-').map(Number);
  m += delta;
  while (m < 1) { m += 12; y--; }
  while (m > 12) { m -= 12; y++; }
  return `${y}-${String(m).padStart(2, '0')}`;
}

function businessDaysSince(iso) {
  const start = new Date(iso.slice(0, 10) + 'T00:00:00');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let count = 0;
  const d = new Date(start);
  while (d < today) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) count++;
  }
  return count;
}

async function loadBills() {
  const { data, error } = await sb.from('bills').select('*').order('due_day');
  if (error) { console.error(error); return []; }
  BILLS_CACHE = data || [];
  return BILLS_CACHE;
}

async function loadPayments(period) {
  const { data, error } = await sb.from('bill_payments').select('*').eq('period', period);
  if (error) { console.error(error); return []; }
  PAYMENTS_CACHE = data || [];
  return PAYMENTS_CACHE;
}

function setBillsTab(tab) { BILLS_TAB = tab; renderBills(); }
function shiftArch(delta) { ARCH_PERIOD = shiftPeriod(ARCH_PERIOD, delta); renderBills(); }

async function renderBills() {
  if (!ARCH_PERIOD) ARCH_PERIOD = curPeriod();
  await loadBills();

  const tabs = `
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${BILLS_TAB === 'bills' ? ' on' : ''}" onclick="setBillsTab('bills')">${t('bills_tab')}</button>
      <button class="seg-btn${BILLS_TAB === 'archive' ? ' on' : ''}" onclick="setBillsTab('archive')">${t('archive_tab')}</button>
    </div>`;

  if (BILLS_TAB === 'bills') {
    const period = curPeriod();
    const pays = await loadPayments(period);
    const paidBy = {};
    for (const p of pays) paidBy[p.bill_id] = p;

    const list = BILLS_CACHE.length
      ? BILLS_CACHE.map(b => {
          const pay = paidBy[b.id];
          const meta2 = [b.payment_method, b.bank, b.card_last4 ? '••••' + b.card_last4 : null].filter(Boolean).join(' · ');
          return `
        <div class="row-card sub-row${b.active ? '' : ' off'}" onclick="renderBillDetail('${b.id}')">
          <div class="sub-icon-wrap">${subIcon(b)}</div>
          <div class="row-main">
            <span class="row-name"><span class="dot ${b.active ? 'dot-on' : 'dot-off'}"></span>${b.name} ${flagEmoji(b.country)}</span>
            <span class="row-cat">${[b.category, b.due_day ? t('due_day').split(' ')[0] + ' ' + b.due_day : null].filter(Boolean).join(' · ')}</span>
            ${meta2 ? `<span class="row-cat">${meta2}</span>` : ''}
          </div>
          <div class="row-side">
            <span class="row-amount">${fmtMoney(pay ? pay.amount : b.reference_amount, b.currency)}</span>
            ${pay
              ? `<span class="paid-badge">✓ ${t('paid_badge')}</span>`
              : (b.active ? `<button class="btn-paid" onclick="event.stopPropagation();openPaidModal('${b.id}')">${t('mark_paid')}</button>` : '')}
          </div>
        </div>`;
        }).join('')
      : `<p class="muted" style="margin-top:30px">${t('no_bills')}</p>`;

    sectionShell(t('bills'), `
      ${tabs}
      <button class="btn-primary" style="width:100%;margin-bottom:14px" onclick="renderBillForm()">${t('new')}</button>
      <div class="rows">${list}</div>
    `);
  } else {
    const pays = await loadPayments(ARCH_PERIOD);
    const billById = {};
    for (const b of BILLS_CACHE) billById[b.id] = b;

    const totals = {};
    for (const p of pays) {
      const b = billById[p.bill_id];
      const cur = (b && b.currency) || 'CHF';
      totals[cur] = (totals[cur] || 0) + Number(p.amount);
    }

    const list = pays.length
      ? pays.map(p => {
          const b = billById[p.bill_id] || { name: '?', currency: 'CHF' };
          const over = b.limit_amount && Number(p.amount) > Number(b.limit_amount);
          const bd = businessDaysSince(p.paid_at);
          const locked = bd > 5;
          return `
        <div class="row-card pay-row" data-pid="${p.id}" data-locked="${locked ? '1' : '0'}"
             onclick="payTap('${p.id}', ${locked})">
          <div class="row-main">
            <span class="row-name">${b.name} ${locked ? '🔒' : ''}</span>
            <span class="row-cat">${t('paid_on')} ${fmtDate(p.paid_at)}</span>
            ${over ? `<span class="row-cat over">⚠️ ${t('over_limit')} (${fmtMoney(b.limit_amount, b.currency)})</span>` : ''}
          </div>
          <span class="row-amount${over ? ' over' : ''}">${fmtMoney(p.amount, b.currency)}</span>
        </div>`;
        }).join('')
      : `<p class="muted" style="margin-top:30px">${t('no_payments')}</p>`;

    sectionShell(t('bills'), `
      ${tabs}
      <div class="arch-nav">
        <button class="icon-btn" onclick="shiftArch(-1)">‹</button>
        <span class="arch-title">${periodLabel(ARCH_PERIOD)}</span>
        <button class="icon-btn" onclick="shiftArch(1)">›</button>
      </div>
      ${Object.keys(totals).length ? `
        <div class="total-card" style="margin-bottom:14px">
          <span class="total-label">${t('month_total')}</span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val">${fmtMoney(v, c)}</span>`).join('')}
        </div>` : ''}
      <div class="rows">${list}</div>
    `);
    setupLongPress();
  }
}

// ---- premir longo para desbloquear ----
let LP_TIMER = null;
let LP_FIRED = false;

function setupLongPress() {
  document.querySelectorAll('.pay-row[data-locked="1"]').forEach(el => {
    el.addEventListener('pointerdown', () => {
      LP_FIRED = false;
      LP_TIMER = setTimeout(() => {
        LP_FIRED = true;
        openPaymentEdit(el.getAttribute('data-pid'), true);
      }, 600);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev =>
      el.addEventListener(ev, () => clearTimeout(LP_TIMER)));
  });
}

function payTap(pid, locked) {
  if (LP_FIRED) { LP_FIRED = false; return; }
  if (locked) { showToast(t('locked_hint')); return; }
  openPaymentEdit(pid, false);
}

function showToast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

// ---- ✓ Pago ----
async function openPaidModal(billId) {
  const b = BILLS_CACHE.find(x => x.id === billId);
  if (!b) return;
  // último valor pago desta fatura
  const { data } = await sb.from('bill_payments')
    .select('amount').eq('bill_id', billId)
    .order('period', { ascending: false }).limit(1);
  const prefill = (data && data.length) ? data[0].amount : b.reference_amount;

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title" style="margin-bottom:4px">${t('confirm_paid_title')}</div>
      <div class="modal-sub" style="margin-bottom:14px">${b.name} · ${periodLabel(curPeriod())}</div>
      <div class="form">
        <div class="form-row">
          <input id="pay-amount" type="number" step="0.01" inputmode="decimal" value="${prefill}">
          <span style="align-self:center;font-weight:700">${b.currency}</span>
        </div>
        ${b.limit_amount ? `<p class="muted" style="text-align:left;font-size:13px">${t('limit_lbl')}: ${fmtMoney(b.limit_amount, b.currency)}</p>` : ''}
        <button class="btn-primary" onclick="confirmPaid('${b.id}')">${t('mark_paid')}</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('cancel')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function confirmPaid(billId) {
  const amount = parseFloat(document.getElementById('pay-amount').value);
  if (!amount || amount <= 0) return;
  const { data: { user } } = await sb.auth.getUser();
  const { error } = await sb.from('bill_payments').insert({
    bill_id: billId, user_id: user.id, period: curPeriod(), amount
  });
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}

// ---- editar/apagar pagamento no arquivo ----
function openPaymentEdit(pid, unlocked) {
  const p = PAYMENTS_CACHE.find(x => x.id === pid);
  if (!p) return;
  const b = BILLS_CACHE.find(x => x.id === p.bill_id) || { name: '?', currency: 'CHF' };

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title" style="margin-bottom:4px">${t('edit_payment')} ${unlocked ? '🔓' : ''}</div>
      <div class="modal-sub" style="margin-bottom:14px">${b.name} · ${periodLabel(p.period)}</div>
      <div class="form">
        <div class="form-row">
          <input id="pay-amount" type="number" step="0.01" inputmode="decimal" value="${p.amount}">
          <span style="align-self:center;font-weight:700">${b.currency}</span>
        </div>
        <button class="btn-primary" onclick="savePaymentEdit('${p.id}')">${t('save')}</button>
        <button class="btn-danger" onclick="deletePayment('${p.id}')">${t('delete_payment')} 🗑️</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('cancel')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function savePaymentEdit(pid) {
  const amount = parseFloat(document.getElementById('pay-amount').value);
  if (!amount || amount <= 0) return;
  const { error } = await sb.from('bill_payments').update({ amount }).eq('id', pid);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}

async function deletePayment(pid) {
  if (!confirm(t('delete_confirm'))) return;
  const { error } = await sb.from('bill_payments').delete().eq('id', pid);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}

// ---- detalhe da fatura ----
function renderBillDetail(id) {
  const b = BILLS_CACHE.find(x => x.id === id);
  if (!b) return;
  const rows = [
    [t('category'), b.category],
    [t('ref_lbl'), fmtMoney(b.reference_amount, b.currency)],
    [t('limit_lbl'), b.limit_amount ? fmtMoney(b.limit_amount, b.currency) : null],
    [t('due_day'), b.due_day],
    [t('method'), b.payment_method],
    [t('bank'), b.bank],
    [t('card'), b.card_last4 ? '•••• ' + b.card_last4 : null],
    [t('country'), b.country ? `${flagEmoji(b.country)} ${b.country}` : null],
    [t('status'), b.active ? t('active_lbl') : t('inactive_lbl')]
  ].filter(r => r[1]);

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <div class="sub-icon-wrap big">${subIcon(b)}</div>
        <div>
          <div class="modal-title">${b.name} ${flagEmoji(b.country)}</div>
          <div class="modal-sub">${fmtMoney(b.reference_amount, b.currency)}</div>
        </div>
      </div>
      ${rows.map(r => `<div class="detail-row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}
      <button class="btn-secondary" style="margin-top:14px" onclick="toggleBillActive('${b.id}', ${!b.active})">${b.active ? t('deactivate') + ' ⏸' : t('activate') + ' ▶️'}</button>
      <div class="modal-btns">
        <button class="btn-primary" onclick="this.closest('.modal-bg').remove();renderBillForm('${b.id}')">${t('edit')} ✏️</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('close')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function toggleBillActive(id, val) {
  const { error } = await sb.from('bills').update({ active: val }).eq('id', id);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}

// ---- formulário fatura ----
function renderBillForm(id) {
  const b = id ? BILLS_CACHE.find(x => x.id === id) : null;
  const isEdit = !!b;
  const cur = (b && b.currency) || 'CHF';
  const esc = v => (v || '').replace(/"/g, '&quot;');

  sectionShell(isEdit ? t('edit') : t('new'), `
    <div class="form">
      <input id="b-name" type="text" placeholder="${t('bill_name_ph')}" value="${esc(b && b.name)}">
      <input id="b-website" type="text" placeholder="${t('website_ph')}" value="${esc(b && b.website)}">
      <input id="b-cat" type="text" placeholder="${t('category_ph')}" value="${esc(b && b.category)}">
      <div class="form-row">
        <input id="b-amount" type="number" step="0.01" inputmode="decimal" placeholder="${t('ref_amount_ph')}" value="${b ? b.reference_amount : ''}">
        <select id="b-cur">${CURRENCIES.map(c => `<option value="${c}"${c === cur ? ' selected' : ''}>${c}</option>`).join('')}</select>
      </div>
      <input id="b-limit" type="number" step="0.01" inputmode="decimal" placeholder="${t('limit_ph')}" value="${b && b.limit_amount ? b.limit_amount : ''}">
      <label class="lbl">${t('due_day')}</label>
      <input id="b-day" type="number" min="1" max="31" inputmode="numeric" value="${b && b.due_day ? b.due_day : ''}">
      <div class="form-row">
        <select id="b-method"><option value="">${t('method')}…</option>${PAY_METHODS.map(m => `<option value="${m}"${b && b.payment_method === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
        <select id="b-country"><option value="">${t('country')}…</option>${COUNTRIES.map(c => `<option value="${c}"${b && b.country === c ? ' selected' : ''}>${flagEmoji(c)} ${c}</option>`).join('')}</select>
      </div>
      <input id="b-bank" type="text" placeholder="${t('bank_ph')}" value="${esc(b && b.bank)}">
      <input id="b-card" type="text" inputmode="numeric" maxlength="4" placeholder="${t('card_ph')}" value="${esc(b && b.card_last4)}">
      <div id="b-err"></div>
      <button class="btn-primary" onclick="saveBill(${isEdit ? `'${b.id}'` : 'null'})">${t('save')}</button>
      <button class="btn-secondary" onclick="renderBills()">${t('cancel')}</button>
      ${isEdit ? `<button class="btn-danger" onclick="deleteBill('${b.id}')">${t('delete')} 🗑️</button>` : ''}
    </div>
  `);
}

async function saveBill(id) {
  const g = i => document.getElementById(i);
  const name = g('b-name').value.trim();
  const amount = parseFloat(g('b-amount').value);
  const limit = parseFloat(g('b-limit').value);
  const day = parseInt(g('b-day').value, 10);
  const errEl = g('b-err');

  if (!name) { errEl.innerHTML = `<div class="err">${t('err_fill')}</div>`; return; }
  if (!amount || amount <= 0) { errEl.innerHTML = `<div class="err">${t('err_amount')}</div>`; return; }
  if (day && (day < 1 || day > 31)) { errEl.innerHTML = `<div class="err">${t('err_day')}</div>`; return; }

  const { data: { user } } = await sb.auth.getUser();
  const row = {
    user_id: user.id, name,
    website: g('b-website').value.trim() || null,
    category: g('b-cat').value.trim() || null,
    reference_amount: amount,
    limit_amount: limit > 0 ? limit : null,
    currency: g('b-cur').value,
    due_day: day || null,
    payment_method: g('b-method').value || null,
    country: g('b-country').value || null,
    bank: g('b-bank').value.trim() || null,
    card_last4: g('b-card').value.trim() || null
  };

  let error;
  if (id) ({ error } = await sb.from('bills').update(row).eq('id', id));
  else ({ error } = await sb.from('bills').insert(row));
  if (error) { console.error(error); errEl.innerHTML = `<div class="err">${t('err_generic')}</div>`; return; }
  renderBills();
}

async function deleteBill(id) {
  if (!confirm(t('delete_confirm'))) return;
  const { error } = await sb.from('bills').delete().eq('id', id);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}


// ===== 06-settings.js =====
// Definições — nome, idioma, moeda, tema (guardado no perfil, sincroniza entre dispositivos)
let PROFILE = null;

const LANGS = [
  { code: 'pt', label: '🇵🇹 Português' },
  { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'it', label: '🇮🇹 Italiano' },
  { code: 'en', label: '🇬🇧 English' }
];

async function loadProfile() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
  PROFILE = data;
  if (PROFILE) {
    if (I18N[PROFILE.language]) LANG = PROFILE.language;
    applyTheme(PROFILE.theme || 'auto');
  }
  return PROFILE;
}

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode === 'auto' ? '' : mode);
}

async function renderSettings() {
  if (!PROFILE) await loadProfile();
  const p = PROFILE || {};
  sectionShell(t('settings'), `
    <div class="form">
      <label class="lbl">${t('set_name')}</label>
      <input id="set-name" type="text" value="${(p.display_name || '').replace(/"/g, '&quot;')}">

      <label class="lbl">${t('set_language')}</label>
      <select id="set-lang">
        ${LANGS.map(l => `<option value="${l.code}"${p.language === l.code ? ' selected' : ''}${I18N[l.code] ? '' : ' disabled'}>${l.label}${I18N[l.code] ? '' : ' ' + t('lang_soon')}</option>`).join('')}
      </select>

      <label class="lbl">${t('set_currency')}</label>
      <select id="set-cur">
        ${CURRENCIES.map(c => `<option value="${c}"${(p.currency || 'CHF') === c ? ' selected' : ''}>${c}</option>`).join('')}
      </select>

      <label class="lbl">${t('set_theme')}</label>
      <div class="seg">
        <button class="seg-btn${(p.theme || 'auto') === 'auto' ? ' on' : ''}" onclick="setTheme(this,'auto')">${t('theme_auto')}</button>
        <button class="seg-btn${p.theme === 'light' ? ' on' : ''}" onclick="setTheme(this,'light')">${t('theme_light')}</button>
        <button class="seg-btn${p.theme === 'dark' ? ' on' : ''}" onclick="setTheme(this,'dark')">${t('theme_dark')}</button>
      </div>
      <input type="hidden" id="set-theme" value="${p.theme || 'auto'}">

      <div id="set-msg"></div>
      <button class="btn-primary" onclick="saveSettings()">${t('save')}</button>
      <div class="divider"></div>
      <button class="btn-secondary" onclick="doLogout()">${t('logout')}</button>
    </div>
  `);
}

function setTheme(btn, mode) {
  document.getElementById('set-theme').value = mode;
  btn.parentElement.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  applyTheme(mode);
}

async function saveSettings() {
  const { data: { user } } = await sb.auth.getUser();
  const display_name = document.getElementById('set-name').value.trim();
  const language = document.getElementById('set-lang').value;
  const currency = document.getElementById('set-cur').value;
  const theme = document.getElementById('set-theme').value;

  const { error } = await sb.from('profiles')
    .update({ display_name, language, currency, theme }).eq('id', user.id);
  if (error) { console.error(error); document.getElementById('set-msg').innerHTML = `<div class="err">${t('err_generic')}</div>`; return; }

  // atualizar também os metadados de auth (para o "Olá, X")
  await sb.auth.updateUser({ data: { display_name } });

  PROFILE = { ...PROFILE, display_name, language, currency, theme };
  if (I18N[language]) LANG = language;
  applyTheme(theme);
  document.getElementById('set-msg').innerHTML = `<div class="ok">${t('saved')}</div>`;
  setTimeout(renderSettings, 700);
}

