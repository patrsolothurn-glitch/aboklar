// Faturas — CRUD + ✓ Pago + arquivo mensal + limite + bloqueio 5 dias úteis
let BILLS_CACHE = [];
const BHIDE_KEYS = {
  month: 'aboklar_hide_billmonth',
  archmonth: 'aboklar_hide_archtotal',
  archyear: 'aboklar_hide_archyear'
};
let BHIDE = {
  month: localStorage.getItem(BHIDE_KEYS.month) === '1',
  archmonth: localStorage.getItem(BHIDE_KEYS.archmonth) === '1',
  archyear: localStorage.getItem(BHIDE_KEYS.archyear) === '1'
};

function toggleBillTotal(which) {
  BHIDE[which] = !BHIDE[which];
  localStorage.setItem(BHIDE_KEYS[which], BHIDE[which] ? '1' : '0');
  const card = document.getElementById('btotal-' + which);
  if (card) {
    card.querySelectorAll('.total-val').forEach(el => el.classList.toggle('hidden-val', BHIDE[which]));
    const eye = card.querySelector('.total-eye');
    if (eye) eye.textContent = BHIDE[which] ? '🙈' : '👁';
  }
  if (which === 'archyear')
    document.querySelectorAll('.arch-mrow .row-amount').forEach(el => el.classList.toggle('hidden-val', BHIDE[which]));
}

function billTotalCard(which, label, byCur, base) {
  const hid = BHIDE[which] ? ' hidden-val' : '';
  const sec = base === 'EUR' ? 'CHF' : 'EUR';
  const secRate = FX && FX.base === base && FX.rates[sec] ? FX.rates[sec] : null;
  let total = 0, ok = true;
  for (const [c, v] of Object.entries(byCur)) {
    const conv = toBase(v, c, base);
    if (conv === null) { ok = false; break; }
    total += conv;
  }
  let inner;
  if (ok && Object.keys(byCur).length) {
    inner = `<span class="total-val${hid}">${fmtMoney(total, base)}</span>` +
      (secRate ? `<span class="total-val total-sec${hid}">${fmtMoney(total * secRate, sec)}</span>` : '');
  } else {
    inner = Object.entries(byCur).map(([c, v]) => `<span class="total-val${hid}">${fmtMoney(v, c)}</span>`).join('') || `<span class="total-val">—</span>`;
  }
  return `<div class="total-card" id="btotal-${which}" onclick="toggleBillTotal('${which}')">
    <span class="total-label">${label} <span class="total-eye">${BHIDE[which] ? '🙈' : '👁'}</span></span>
    ${inner}</div>`;
}
let PAYMENTS_CACHE = [];
let BILLS_TAB = 'bills'; // 'bills' | 'archive'
let BILLS_GROUP = 'due'; // 'due' | 'paid' | 'later' | 'inactive'
function setBillsGroup(g) { BILLS_GROUP = g; renderBills(); }
let ARCH_PERIOD = null;  // 'YYYY-MM'
let ARCH_YEAR = null;
let ARCH_VIEW = 'year'; // 'year' | 'month'
function shiftArchYear(d) { ARCH_YEAR = String(parseInt(ARCH_YEAR, 10) + d); renderBills(); }
function openArchMonth(p) { ARCH_PERIOD = p; ARCH_VIEW = 'month'; renderBills(); }
function backToYear() { ARCH_VIEW = 'year'; renderBills(); }
let ARCH_SORT = 'date'; // 'date' | 'name'
function setArchSort(m) { ARCH_SORT = m; renderBills(); }

function csvEscape(v) {
  v = String(v == null ? '' : v);
  return /[";\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

function exportArch(scope) {
  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title" style="margin-bottom:12px">${t('export_btn')}</div>
      <div class="form">
        <label class="lbl">${t('export_name_lbl')}</label>
        <input id="exp-name" type="text" value="aboklar-${scope}">
        <button class="btn-primary" onclick="doExportArch('${scope}', document.getElementById('exp-name').value); this.closest('.modal-bg').remove()">${t('export_btn')}</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('cancel')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function doExportArch(scope, rawName) {
  // scope: 'YYYY' (ano) ou 'YYYY-MM' (mês)
  const like = scope.length === 4 ? scope + '-%' : scope;
  const q = sb.from('bill_payments').select('bill_id,amount,period,paid_at');
  const { data: pays } = scope.length === 4 ? await q.like('period', like) : await q.eq('period', scope);
  const billById = {};
  for (const b of BILLS_CACHE) billById[b.id] = b;
  const rows = (pays || []).sort((a, b) => a.period.localeCompare(b.period) || new Date(a.paid_at) - new Date(b.paid_at));
  const header = [t('csv_bill'), t('csv_paid'), t('csv_period'), t('csv_amount'), t('csv_currency')].join(';');
  const lines = rows.map(p => {
    const b = billById[p.bill_id] || {};
    return [csvEscape(b.name || '?'), fmtDate(p.paid_at), p.period, Number(p.amount).toFixed(2), b.currency || 'CHF'].join(';');
  });
  const csv = '\ufeff' + header + '\n' + lines.join('\n');
  let name = (rawName || `aboklar-${scope}`).trim().replace(/[\\/:*?"<>|]/g, '-');
  if (!name) name = `aboklar-${scope}`;
  const filename = name.toLowerCase().endsWith('.csv') ? name : name + '.csv';
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const file = new File([blob], filename, { type: 'text/csv' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: 'AboKlar ' + scope }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function curPeriod() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function periodLabel(p) {
  const [y, m] = p.split('-');
  const months = t('months');
  return `${months[parseInt(m, 10) - 1]} ${y}`;
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

const PER_MONTHS = { monthly: 1, quarterly: 3, halfyear: 6, yearly: 12 };

function nextBillDue(b) {
  const today = new Date(); today.setHours(0,0,0,0);
  let base = b.due_date ? new Date(b.due_date + 'T00:00:00')
    : (b.due_day ? new Date(today.getFullYear(), today.getMonth(), b.due_day) : null);
  if (!base) return null;
  const step = PER_MONTHS[b.periodicity || 'monthly'] || 1;
  const dayWanted = base.getDate();
  let d = new Date(base); let g = 0;
  while (d < today && g++ < 600) {
    let m = d.getMonth() + step, y = d.getFullYear();
    while (m > 11) { m -= 12; y++; }
    const last = new Date(y, m + 1, 0).getDate();
    d = new Date(y, m, Math.min(dayWanted, last));
  }
  const days = Math.round((d - today) / 86400000);
  const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  return { date: iso, days };
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

function setBillsTab(tab) { BILLS_TAB = tab; if (tab === 'archive') ARCH_VIEW = 'year'; renderBills(); }
function shiftArch(delta) { ARCH_PERIOD = shiftPeriod(ARCH_PERIOD, delta); renderBills(); }

async function renderBills() {
  localStorage.setItem('aboklar_last_view', 'bills');
  localStorage.setItem('aboklar_last_section', 'bills');
  if (!ARCH_PERIOD) ARCH_PERIOD = curPeriod();
  const base = (typeof PROFILE !== 'undefined' && PROFILE && PROFILE.currency) || 'CHF';
  await getRates(base);
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

    const billRow = b => {
      const pay = paidBy[b.id];
      const nd = nextBillDue(b);
      const meta2 = [b.payment_method, b.bank, b.card_last4 ? '••••' + b.card_last4 : null].filter(Boolean).join(' · ');
      return `
        <div class="row-card sub-row${b.active ? '' : ' off'}${pay ? ' paid-row' : ''}" onclick="renderBillDetail('${b.id}')">
          <div class="sub-icon-wrap">${subIcon(b)}</div>
          <div class="row-main">
            <span class="row-name"><span class="dot ${b.active ? 'dot-on' : 'dot-off'}"></span>${b.name} ${flagEmoji(b.country)}</span>
            <span class="row-cat">${[b.category, b.periodicity && b.periodicity !== 'monthly' ? ({quarterly:t('per_quarterly'),halfyear:t('per_halfyear'),yearly:t('yearly')})[b.periodicity] : null].filter(Boolean).join(' · ')}</span>
            ${meta2 ? `<span class="row-cat">${meta2}</span>` : ''}
            ${nd ? `<span class="row-cat">${fmtDate(nd.date)} (${t('in_days')} ${nd.days}d)</span>` : ''}
            ${b.period_start || b.period_end ? `<span class="row-cat">📆 ${b.period_start ? fmtDate(b.period_start) : '…'} – ${b.period_end ? fmtDate(b.period_end) : '…'}</span>` : ''}
          </div>
          <div class="row-side">
            <span class="row-amount">${fmtMoney(pay ? pay.amount : b.reference_amount, b.currency)}</span>
            ${pay
              ? `<span class="paid-badge">✓ ${t('paid_badge')}</span>`
              : (b.active ? `<button class="btn-paid" onclick="event.stopPropagation();openPaidModal('${b.id}')">${t('mark_paid')}</button>` : '')}
          </div>
        </div>`;
    };

    const now = new Date();
    const groups = { due: [], paid: [], later: [], inactive: [] };
    for (const b of BILLS_CACHE) {
      if (!b.active) { groups.inactive.push(b); continue; }
      if (paidBy[b.id]) { groups.paid.push(b); continue; }
      const nd = nextBillDue(b);
      if (nd && new Date(nd.date + 'T00:00:00').getMonth() === now.getMonth() &&
          new Date(nd.date + 'T00:00:00').getFullYear() === now.getFullYear()) groups.due.push(b);
      else groups.later.push(b);
    }
    const byDays = (a, c) => {
      const da = nextBillDue(a), dc = nextBillDue(c);
      if (!da && !dc) return a.name.localeCompare(c.name);
      if (!da) return 1; if (!dc) return -1;
      return da.days - dc.days;
    };
    groups.due.sort(byDays); groups.later.sort(byDays);
    groups.paid.sort((a, c) => a.name.localeCompare(c.name));

    const groupBtn = (key, label) =>
      `<button class="seg-btn grp-btn${BILLS_GROUP === key ? ' on' : ''}" onclick="setBillsGroup('${key}')">${label} (${groups[key].length})</button>`;

    const groupBtns = `<div class="grp-row">
      ${groupBtn('due', t('group_due'))}
      ${groupBtn('paid', t('group_paid'))}
      ${groupBtn('later', t('group_later'))}
      ${groupBtn('inactive', t('group_inactive'))}
    </div>`;

    const monthCur = {};
    for (const b of [...groups.due, ...groups.paid]) {
      const cur = b.currency || 'CHF';
      const amt = Number(paidBy[b.id] ? paidBy[b.id].amount : b.reference_amount) || 0;
      monthCur[cur] = (monthCur[cur] || 0) + amt;
    }
    const monthCard = Object.keys(monthCur).length
      ? `<div style="margin-bottom:14px">${billTotalCard('month', t('month_total'), monthCur, base)}</div>` : '';

    const sel = groups[BILLS_GROUP] || [];
    const list = BILLS_CACHE.length
      ? monthCard + groupBtns + (sel.length ? sel.map(billRow).join('') : `<p class="muted" style="margin-top:24px">—</p>`)
      : `<p class="muted" style="margin-top:30px">${t('no_bills')}</p>`;

    sectionShell(t('bills'), `
      ${tabs}
      <button class="btn-primary" style="width:100%;margin-bottom:14px" onclick="renderBillForm()">${t('new')}</button>
      <div class="rows">${list}</div>
    `);
  } else {
    if (!ARCH_YEAR) ARCH_YEAR = ARCH_PERIOD.slice(0, 4);
    const billById = {};
    for (const b of BILLS_CACHE) billById[b.id] = b;

    if (ARCH_VIEW === 'year') {
      const year = ARCH_YEAR;
      const { data: yearPays } = await sb.from('bill_payments').select('bill_id,amount,period').like('period', year + '-%');
      const yearCur = {};
      const byMonth = {};
      for (const p of (yearPays || [])) {
        const b = billById[p.bill_id];
        const cur = (b && b.currency) || 'CHF';
        yearCur[cur] = (yearCur[cur] || 0) + Number(p.amount);
        if (!byMonth[p.period]) byMonth[p.period] = { count: 0, byCur: {} };
        byMonth[p.period].count++;
        byMonth[p.period].byCur[cur] = (byMonth[p.period].byCur[cur] || 0) + Number(p.amount);
      }

      const months = t('months');
      const hid = BHIDE.archyear ? ' hidden-val' : '';
      const rows = Object.keys(byMonth).sort().reverse().map(per => {
        const mi = parseInt(per.slice(5), 10) - 1;
        let tot = 0, ok = true;
        for (const [c, v] of Object.entries(byMonth[per].byCur)) {
          const x = toBase(v, c, base);
          if (x === null) { ok = false; break; }
          tot += x;
        }
        const amt = ok ? fmtMoney(tot, base)
          : Object.entries(byMonth[per].byCur).map(([c, v]) => fmtMoney(v, c)).join(' + ');
        return `<button class="row-card arch-mrow" onclick="openArchMonth('${per}')">
          <div class="row-main">
            <span class="row-name">📅 ${months[mi]}</span>
            <span class="row-cat">${byMonth[per].count} ${t('pay_count')}</span>
          </div>
          <span class="row-amount${hid}">${amt}</span>
        </button>`;
      }).join('');

      sectionShell(t('bills'), `
        ${tabs}
        <div class="arch-nav">
          <button class="icon-btn" onclick="shiftArchYear(-1)">‹</button>
          <span class="arch-title">${year}</span>
          <button class="icon-btn" onclick="shiftArchYear(1)">›</button>
        </div>
        <div style="margin-bottom:14px">${billTotalCard('archyear', t('year_total') + ' ' + year, yearCur, base)}</div>
        <button class="btn-secondary" style="width:100%;margin-bottom:14px" onclick="exportArch('${year}')">${t('export_btn')} · ${year}</button>
        <div class="rows">${rows || `<p class="muted" style="margin-top:24px">${t('no_payments')}</p>`}</div>
      `);
    } else {
      const pays = await loadPayments(ARCH_PERIOD);
      const totals = {};
      for (const p of pays) {
        const b = billById[p.bill_id];
        const cur = (b && b.currency) || 'CHF';
        totals[cur] = (totals[cur] || 0) + Number(p.amount);
      }

      if (ARCH_SORT === 'name') {
        pays.sort((a, b) => ((billById[a.bill_id] || {}).name || '').localeCompare((billById[b.bill_id] || {}).name || ''));
      } else {
        pays.sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at));
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
          <button class="icon-btn" onclick="backToYear()">←</button>
          <span class="arch-title">${periodLabel(ARCH_PERIOD)}</span>
          <span style="display:flex;gap:8px">
            <button class="icon-btn" onclick="shiftArch(-1)">‹</button>
            <button class="icon-btn" onclick="shiftArch(1)">›</button>
          </span>
        </div>
        <div style="margin-bottom:14px">${billTotalCard('archmonth', t('month_total'), totals, base)}</div>
        <div class="seg" style="margin-bottom:14px">
          <button class="seg-btn${ARCH_SORT === 'date' ? ' on' : ''}" onclick="setArchSort('date')">${t('sort_date')}</button>
          <button class="seg-btn${ARCH_SORT === 'name' ? ' on' : ''}" onclick="setArchSort('name')">${t('sort_name')}</button>
        </div>
        <button class="btn-secondary" style="width:100%;margin-bottom:14px" onclick="exportArch('${ARCH_PERIOD}')">${t('export_btn')} · ${periodLabel(ARCH_PERIOD)}</button>
        <div class="rows">${list}</div>
      `);
      setupLongPress();
    }
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
  const perLbl = { monthly: t('monthly'), quarterly: t('per_quarterly'), halfyear: t('per_halfyear'), yearly: t('yearly') };
  const rows = [
    [t('category'), b.category],
    [t('customer_ref_lbl'), b.customer_ref],
    [t('periodicity'), perLbl[b.periodicity || 'monthly']],
    [t('ref_lbl'), fmtMoney(b.reference_amount, b.currency)],
    [t('limit_lbl'), b.limit_amount ? fmtMoney(b.limit_amount, b.currency) : null],
    [t('next_due'), (() => { const nd = nextBillDue(b); return nd ? `${fmtDate(nd.date)} (${t('in_days')} ${nd.days}d)` : null; })()],
    [t('period_row'), b.period_start || b.period_end ? `${b.period_start ? fmtDate(b.period_start) : '…'} – ${b.period_end ? fmtDate(b.period_end) : '…'}` : null],
    [t('method'), b.payment_method],
    [t('bank'), b.bank],
    [t('card'), b.card_last4 ? '•••• ' + b.card_last4 : null],
    [t('country'), b.country ? `${flagEmoji(b.country)} ${b.country}` : null],
    [t('nif_lbl'), b.nif],
    [t('phone_lbl'), b.phone ? `<a href="tel:${b.phone}">${b.phone}</a>` : null],
    [t('email'), b.email ? `<a href="mailto:${b.email}">${b.email}</a>` : null],
    [t('notes_lbl'), b.notes],
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
      <input id="b-ref" type="text" placeholder="${t('customer_ref_ph')}" value="${esc(b && b.customer_ref)}">
      <label class="lbl">${t('periodicity')}</label>
      <select id="b-per">
        <option value="monthly"${!b || b.periodicity === 'monthly' || !b.periodicity ? ' selected' : ''}>${t('monthly')}</option>
        <option value="quarterly"${b && b.periodicity === 'quarterly' ? ' selected' : ''}>${t('per_quarterly')}</option>
        <option value="halfyear"${b && b.periodicity === 'halfyear' ? ' selected' : ''}>${t('per_halfyear')}</option>
        <option value="yearly"${b && b.periodicity === 'yearly' ? ' selected' : ''}>${t('yearly')}</option>
      </select>
      <label class="lbl">${t('next_due')}</label>
      <input id="b-date" type="date" value="${b && b.due_date ? b.due_date : ''}">
      <label class="lbl">${t('period_lbl')}</label>
      <div class="form-row">
        <input id="b-pstart" type="date" value="${b && b.period_start ? b.period_start : ''}">
        <input id="b-pend" type="date" value="${b && b.period_end ? b.period_end : ''}">
      </div>
      <div class="form-row">
        <select id="b-method"><option value="">${t('method')}…</option>${PAY_METHODS.map(m => `<option value="${m}"${b && b.payment_method === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
        <select id="b-country"><option value="">${t('country')}…</option>${COUNTRIES.map(c => `<option value="${c}"${b && b.country === c ? ' selected' : ''}>${flagEmoji(c)} ${c}</option>`).join('')}</select>
      </div>
      <input id="b-bank" type="text" placeholder="${t('bank_ph')}" value="${esc(b && b.bank)}">
      <input id="b-card" type="text" inputmode="numeric" maxlength="4" placeholder="${t('card_ph')}" value="${esc(b && b.card_last4)}">
      <input id="b-nif" type="text" placeholder="${t('nif_ph')}" value="${esc(b && b.nif)}">
      <input id="b-phone" type="tel" placeholder="${t('phone_ph')}" value="${esc(b && b.phone)}">
      <input id="b-email" type="email" placeholder="${t('email_ph')}" value="${esc(b && b.email)}">
      <input id="b-notes" type="text" placeholder="${t('notes_ph')}" value="${esc(b && b.notes)}">
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
  const ddate = g('b-date').value || null;
  const errEl = g('b-err');

  if (!name) { errEl.innerHTML = `<div class="err">${t('err_fill')}</div>`; return; }
  if (g('b-amount').value.trim() !== '' && (isNaN(amount) || amount < 0)) { errEl.innerHTML = `<div class="err">${t('err_amount')}</div>`; return; }

  const { data: { user } } = await sb.auth.getUser();
  const row = {
    user_id: user.id, name,
    website: g('b-website').value.trim() || null,
    category: g('b-cat').value.trim() || null,
    reference_amount: isNaN(amount) ? 0 : amount,
    period_start: g('b-pstart').value || null,
    period_end: g('b-pend').value || null,
    limit_amount: limit > 0 ? limit : null,
    currency: g('b-cur').value,
    due_date: ddate,
    due_day: ddate ? parseInt(ddate.slice(8, 10), 10) : null,
    customer_ref: g('b-ref').value.trim() || null,
    periodicity: g('b-per').value,
    notes: g('b-notes').value.trim() || null,
    payment_method: g('b-method').value || null,
    country: g('b-country').value || null,
    bank: g('b-bank').value.trim() || null,
    card_last4: g('b-card').value.trim() || null,
    nif: g('b-nif').value.trim() || null,
    phone: g('b-phone').value.trim() || null,
    email: g('b-email').value.trim() || null
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
