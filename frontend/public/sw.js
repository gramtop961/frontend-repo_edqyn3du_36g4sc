const CACHE_NAME = 'tradeglass-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then(cacheRes => {
      const fetchPromise = fetch(request).then(networkRes => {
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return networkRes;
      }).catch(() => cacheRes);
      return cacheRes || fetchPromise;
    })
  );
});

// Background sync example for market data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-market') {
    event.waitUntil(fetch('/api/sync-market'))
  }
});
