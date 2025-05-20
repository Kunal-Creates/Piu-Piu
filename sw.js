const CACHE_NAME = 'playz-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/styles.css',
  '/script.js',
  '/Images/Favicon.png',
  '/Images/Bloom.webp',
  '/Images/broken-platform.webp',
  '/Images/chess.webp',
  '/Images/classical-snake.webp',
  '/Images/color-chaser.webp',
  '/Images/Dodger.webp',
  '/Images/Pixel-Runner.webp',
  '/Images/Tetris.webp',
  '/Images/tic-tac-toe.webp',
  '/Images/truck-tunk.webp',
  '/Images/Whack-a-Hole.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
