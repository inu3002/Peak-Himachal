const CACHE_NAME = "himachal-site-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/culture.html",
  "/districts.html",
  "/food.html",
  "/gallery.html",
  "/temples.html",
  "/trek.html",

  "/style.css",
  "/script.js",

  // folders
  "/pics/",
  "/temple/"
];

// Install event (cache files)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event (cleanup old cache)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event (serve from cache)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});