const CACHE_NAME = 'tretasharma-v1';
const urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/css/print.css',
  '/assets/js/main.js',
  '/assets/images/profile-placeholder.jpg',
  'https://fonts.googleapis.com/css2?family=Georgia:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
