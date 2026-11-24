const CACHE='suvichar-image-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>e.respondWith((async()=>{try{return await fetch(e.request,{cache:'no-store'})}catch(err){const c=await caches.open(CACHE);return (await c.match(e.request))||Response.error()}})()));
