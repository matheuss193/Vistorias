/* Service worker de DESLIGAMENTO: substitui o antigo (mesmo nome de arquivo), apaga os caches do app antigo e se desregistra.
   NÃO recarrega páginas abertas (a pessoa pode estar salvando as vistorias); o aviso aparece na próxima abertura.
   Os dados da pessoa (vistorias e fotos) NÃO são apagados aqui: só a página de desligamento apaga, depois de salvar. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    try { const ks = await caches.keys(); await Promise.all(ks.map(function (k) { return caches.delete(k); })); } catch (x) {}
    try { await self.registration.unregister(); } catch (x) {}
  })());
});
self.addEventListener('fetch', function (e) { e.respondWith(fetch(e.request)); });
