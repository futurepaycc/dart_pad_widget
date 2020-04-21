'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "3ecd5f3149c4721d301e8d8109cf7190",
"/": "3ecd5f3149c4721d301e8d8109cf7190",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"assets/FontManifest.json": "d751713988987e9331980363e24189ce",
"assets/AssetManifest.json": "99914b932bd37a50b983c5e7c90ae93b",
"assets/LICENSE": "155d30c2a7871cc26875fd0384d58d2a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js": "b516083f63adbee40915e9b73361d50e",
"manifest.json": "00e0b69b49487ce4f9ff0c5fac8fda49"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
