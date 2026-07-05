// Subscrições — CRUD + detalhe + estado + ordenação
const CURRENCIES = ['CHF', 'EUR', 'USD', 'GBP'];
const PAY_METHODS = ['Débito', 'Cartão', 'Twint', 'Apple Pay', 'Google Pay', 'PayPal', 'Transferência', 'Outro'];
const COUNTRIES = ['CH', 'PT', 'DE', 'FR', 'IT', 'AT', 'ES', 'NL', 'BE', 'GB', 'US'];
let SUBS_CACHE = [];
let SUBS_SORT = 'date';
const HIDE_STATE = {
  monthly: localStorage.getItem('aboklar_hide_monthly') === '1',
  yearly: localStorage.getItem('aboklar_hide_yearly') === '1'
};

function toggleTotals(which) {
  HIDE_STATE[which] = !HIDE_STATE[which];
  localStorage.setItem('aboklar_hide_' + which, HIDE_STATE[which] ? '1' : '0');
  const card = document.getElementById('total-' + which);
  if (!card) return;
  card.querySelectorAll('.total-val').forEach(el => el.classList.toggle('hidden-val', HIDE_STATE[which]));
  const eye = card.querySelector('.total-eye');
  if (eye) eye.textContent = HIDE_STATE[which] ? '🙈' : '👁';
}

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

  const hvM = HIDE_STATE.monthly ? ' hidden-val' : '';
  const hvY = HIDE_STATE.yearly ? ' hidden-val' : '';
  const totalCards = Object.keys(totals).length
    ? `<div class="totals-row">
        <div class="total-card" id="total-monthly" onclick="toggleTotals('monthly')">
          <span class="total-label">${t('total_monthly')} <span class="total-eye">${HIDE_STATE.monthly ? '🙈' : '👁'}</span></span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val${hvM}">${fmtMoney(v.monthly, c)}</span>`).join('')}</div>
        <div class="total-card" id="total-yearly" onclick="toggleTotals('yearly')">
          <span class="total-label">${t('total_yearly')} <span class="total-eye">${HIDE_STATE.yearly ? '🙈' : '👁'}</span></span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val${hvY}">${fmtMoney(v.yearly, c)}</span>`).join('')}</div>
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
