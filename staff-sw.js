self.addEventListener('push', event => {
  let data = {
    title: '🔔 Yawd Sweetness Staff Alert',
    body: 'A new order has arrived.',
    url: '/staff.html'
  };

  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: 'yawd-staff-new-order',
      renotify: true,
      requireInteraction: true,
      data: { url: data.url || '/staff.html' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const target =
    (event.notification.data && event.notification.data.url) ||
    '/staff.html';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(list => {
      for (const client of list) {
        if ('focus' in client) {
          client.navigate(target);
          return client.focus();
        }
      }

      return clients.openWindow(target);
    })
  );
});
