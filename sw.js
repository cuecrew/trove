const CACHE = 'trove-v1';
const ASSETS = ['/', '/index.html', '/src/tokens.js', '/src/data.js', '/src/icons.js', '/src/primitives.js', '/src/quickadd.js', '/src/screens.js', '/src/screens-more.js', '/src/app.js'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
