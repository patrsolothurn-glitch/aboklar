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
