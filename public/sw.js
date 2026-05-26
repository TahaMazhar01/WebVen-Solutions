/* Webven Service Worker
   Provides offline support + makes the site installable as a PWA.
*/

const CACHE = 'webven-v1'
const SHELL = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/favicon-32.png',
  '/favicon-96.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
]

// Install — precache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  )
})

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  )
})

// Fetch — network-first for navigations, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET requests
  if (request.method !== 'GET') return

  // Ignore non-http(s) schemes (chrome-extension://, etc.)
  if (!request.url.startsWith('http')) return

  // Page navigations — try network first, fall back to cached home
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {})
          return res
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('/')))
    )
    return
  }

  // Same-origin static assets — cache first, fall back to network
  const url = new URL(request.url)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            // Cache only successful responses
            if (res && res.status === 200 && res.type === 'basic') {
              const copy = res.clone()
              caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {})
            }
            return res
          })
      )
    )
  }
})
