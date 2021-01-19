/* self.addEventListener('install', evt=>{
    console.log(evt);
})
self.addEventListener('activate', evt=>{
    console.log(evt);
})

self.addEventListener('fetch', evt=>){
    if (!navigator.onLine){
        evt.respondWith( new Response('pas de connexion internet'))
    }
    console.log(evt.request.url);
}
*/


self.addEventListener('install', evt=>{
    caches.open('lpdwca-PWA').then(
                cache=>{
                    cache.addAll([
                        'index.html',
                        'sw.js',
                        ]);
             })

});

self.addEventListener('activate', evt => {
    console.log(evt);
});
self.addEventListener('fetch', evt=>{
    if (!(evt.request.url.indexOf('http') === 0)) return; 
    evt.respondWith(
        caches.match(evt.request).then(rep=>{
            if(rep){
                //si la page existe on la retourne
                return rep;
            }
            /*si la page n'existe pas, on utilise la méthode network    fallback pour ouvrir l'instance de cache et enregistrer la page dans le cache pour les futurs requêtes
            */
            return fetch(evt.request).then(
                newResponse=>{
                    caches.open('lpdwca-PWA').then(
                        cache=>cache.put(evt.request, newResponse
                        ));
                        /*puisque une réponse ne peut être utilisé 2 fois, si on a besoin de l'utiliser une seconde fois, on doit le cloner
                        */
                        return newResponse.clone();
                })
        })
    )

})
