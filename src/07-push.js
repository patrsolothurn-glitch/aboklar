// Push notifications — subscrição do dispositivo
const VAPID_PUBLIC = 'BA2j4REGfVURlASSywNEFnaiXS3Q2ZYZ56__ap0YMQKJI0q9LTBHHQ8dtPVTZ80S9tuNvbyS8pF7Lx2LooTUcIU';

function urlB64ToUint8(base64) {
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

async function registerSW() {
  if (!('serviceWorker' in navigator)) return null;
  return navigator.serviceWorker.register('sw.js');
}

async function pushIsEnabled() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return false;
  const sub = await reg.pushManager.getSubscription();
  return !!sub;
}

async function enablePush() {
  try {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { showToast(t('push_denied')); return false; }
    const reg = await registerSW();
    await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8(VAPID_PUBLIC)
    });
    const { data: { user } } = await sb.auth.getUser();
    await sb.from('push_subscriptions').insert({ user_id: user.id, subscription: sub.toJSON() });
    showToast(t('push_on'));
    return true;
  } catch (e) { console.error(e); showToast(t('err_generic')); return false; }
}

async function disablePush() {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    const sub = reg && await reg.pushManager.getSubscription();
    if (sub) {
      const json = sub.toJSON();
      await sub.unsubscribe();
      await sb.from('push_subscriptions').delete().eq('subscription->>endpoint', json.endpoint);
    }
    showToast(t('push_off'));
    return true;
  } catch (e) { console.error(e); return false; }
}

async function togglePush(btn) {
  const on = await pushIsEnabled();
  const ok = on ? await disablePush() : await enablePush();
  if (ok) renderSettings();
}
