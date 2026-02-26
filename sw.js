// sw.js - Minimal Service Worker for PWA compliance
const CACHE_NAME = 'roaring-wasm-v1';

// Install event: Pre-caches the main page
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['./index.html']);
        })
    );
    self.skipWaiting();
});

// Activate event: Cleans up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Fetch event: Necessary for the "Install" prompt to appear
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
