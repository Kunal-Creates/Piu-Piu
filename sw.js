const CACHE_NAME = 'playz-v2';
const BASE_URL = 'https://playz.pages.dev';
const urlsToCache = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/about.html`,
  `${BASE_URL}/styles.css`,
  `${BASE_URL}/script.js`,
  `${BASE_URL}/Images/Favicon.png`,
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
  // Handle navigation requests separately
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then(response => {
              if (response) {
                return response;
              }
              // If the specific page is not in cache, return the index page
              return caches.match(`${BASE_URL}/index.html`);
            });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we have a cached response, return it immediately
        if (response) {
          return response;
        }

        // Clone the request - a request is a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        // Make the network request
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Handle redirects specially for Safari
          if (response.redirected) {
            // Create a new response rather than using the redirected response directly
            return Response.redirect(response.url, response.status);
          }

          // Clone the response - a response is a stream and can only be consumed once
          const responseToCache = response.clone();

          // Add the response to the cache
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, return a fallback offline page
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline content not available');
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
