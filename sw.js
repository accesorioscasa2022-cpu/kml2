const CACHE_NAME = 'inspeccion-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon.png'
];

// Instalación: Descarga y guarda los archivos en el celular
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercepción: Si no hay internet, saca los archivos de la memoria
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devuelve el archivo guardado, o intenta descargarlo si hay internet
                return response || fetch(event.request);
            })
    );
});
