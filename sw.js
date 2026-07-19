// AboKlar service worker — push notifications + auto-update
self.addEventListener('install', e => self.skipWaiting());

self.addEventListener('activate', e => e.waitUntil(
  clients.claim().then(() =>
    clients.matchAll({ type: 'window' }).then(list =>
      list.forEach(c => c.postMessage({ type: 'SW_UPDATED' }))
    )
  )
));

self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) { data = { body: e.data && e.data.text() }; }
  const title = data.title || 'AboKlar';
  e.waitUntil(self.registration.showNotification(title, {
    body: data.body || '',
    icon: 'assets/icon-192.png',
    badge: 'assets/icon-192.png',
    data: { url: data.url || './' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    return clients.openWindow(e.notification.data.url || './');
  }));
});
