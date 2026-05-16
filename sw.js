const CACHE = 'trove-v2';
const ASSETS = ['/trove/', '/trove/index.html', '/trove/src/tokens.js', '/trove/src/data.js', '/trove/src/icons.js', '/trove/src/primitives.js', '/trove/src/quickadd.js', '/trove/src/screens.js', '/trove/src/screens-more.js', '/trove/src/app.js', '/trove/icon-192.png', '/trove/icon-512.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
