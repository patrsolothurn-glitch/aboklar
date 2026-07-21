// AboKlar — Renewal reminders: 3, 5, 7, 10, 15 days
const SUPA_URL = 'https://dxmuchztqiglbmgswdsh.supabase.co';
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const VAPID_PUB = 'BE-bAwzQPaq5wiwvxaClpwUUGOc6g6dBE1ndwUoO5gaL1uD8eqIiVrkXEpsg0zMqvhKnA2Qm6TxTixrBec6qF-w';
const VAPID_PRIV = process.env.VAPID_PRIVATE_KEY;
const DAYS = [3, 5, 7, 10, 15];
const PER = { monthly:1, quarterly:3, halfyear:6, yearly:12 };

async function query(table, filter='') {
  const r = await fetch(`${SUPA_URL}/rest/v1/${table}?${filter}&select=*`, {
    headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` }
  });
  return r.json();
}

function nextSub(s) {
  const t = new Date(); t.setHours(0,0,0,0);
  let b = s.renewal_date ? new Date(s.renewal_date+'T00:00:00')
    : s.billing_cycle==='monthly'&&s.renewal_day ? new Date(t.getFullYear(),t.getMonth(),s.renewal_day) : null;
  if (!b) return null;
  let d = new Date(b); const dw = b.getDate(); let g=0;
  while (d < t && g++ < 600) {
    if (s.billing_cycle==='yearly') { d = new Date(d.getFullYear()+1,d.getMonth(),dw); }
    else { let m=d.getMonth()+1,y=d.getFullYear(); if(m>11){m=0;y++;} d=new Date(y,m,Math.min(dw,new Date(y,m+1,0).getDate())); }
  }
  return d >= t ? d : null;
}

function nextBill(b) {
  const t = new Date(); t.setHours(0,0,0,0);
  let base = b.due_date ? new Date(b.due_date+'T00:00:00')
    : b.due_day ? new Date(t.getFullYear(),t.getMonth(),b.due_day) : null;
  if (!base) return null;
  if (b.periodicity==='once') return base >= t ? base : null;
  const step = PER[b.periodicity||'monthly']||1;
  const dw = base.getDate(); let d = new Date(base); let g=0;
  while (d < t && g++ < 600) {
    let m=d.getMonth()+step, y=d.getFullYear();
    while(m>11){m-=12;y++;} d=new Date(y,m,Math.min(dw,new Date(y,m+1,0).getDate()));
  }
  return d >= t ? d : null;
}

async function sendPush(subscription, payload) {
  const { generateVAPIDKeys, sendNotification, setVapidDetails } = await import('./vapid.mjs');
  // Use web-push compatible approach via fetch + VAPID signing
  const webpush = await import('web-push');
  webpush.default.setVapidDetails('mailto:patr.carvalho@hotmail.com', VAPID_PUB, VAPID_PRIV);
  await webpush.default.sendNotification(subscription, JSON.stringify(payload));
}

async function main() {
  const today = new Date(); today.setHours(0,0,0,0);
  const targets = DAYS.map(n => { const t=new Date(today); t.setDate(t.getDate()+n); return {n, time:t.getTime()}; });

  const [subs, bills] = await Promise.all([
    query('subscriptions', 'active=eq.true'),
    query('bills', 'active=eq.true')
  ]);

  const msgs = {};
  const add = (uid, n, line) => {
    if (!msgs[uid]) msgs[uid] = {};
    if (!msgs[uid][n]) msgs[uid][n] = [];
    msgs[uid][n].push(line);
  };

  for (const s of subs||[]) { const d=nextSub(s); if(!d) continue; const m=targets.find(t=>t.time===d.getTime()); if(!m) continue; add(s.user_id,m.n,`📋 ${s.name} (${s.amount} ${s.currency})`); }
  for (const b of bills||[]) { const d=nextBill(b); if(!d) continue; const m=targets.find(t=>t.time===d.getTime()); if(!m) continue; add(b.user_id,m.n,`🧾 ${b.name} (${b.reference_amount} ${b.currency})`); }

  const webpush = (await import('web-push')).default;
  webpush.setVapidDetails('mailto:patr.carvalho@hotmail.com', VAPID_PUB, VAPID_PRIV);

  let sent = 0;
  for (const [uid, byDay] of Object.entries(msgs)) {
    const pushSubs = await query('push_subscriptions', `user_id=eq.${uid}`);
    if (!pushSubs?.length) continue;
    for (const [ds, lines] of Object.entries(byDay)) {
      const n = Number(ds);
      const body = lines.length===1 ? `${lines[0]} vence em ${n} dias` : `${lines.length} pagamentos vencem em ${n} dias`;
      for (const ps of pushSubs) {
        try { await webpush.sendNotification(ps.subscription, JSON.stringify({title:'🔔 AboKlar',body,url:'/'})); sent++; }
        catch(e) { console.error(e.message); }
      }
    }
  }
  console.log(`Sent: ${sent}`);
}

main().catch(console.error);
