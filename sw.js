const CACHE = 'trove-v3';
const ASSETS = ['/trove/', '/trove/index.html', '/trove/src/tokens.js', '/trove/src/data.js', '/trove/src/icons.js', '/trove/src/primitives.js', '/trove/src/quickadd.js', '/trove/src/screens.js', '/trove/src/screens-more.js', '/trove/src/app.js', '/trove/icon-192.png', '/trove/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('/trove/index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
