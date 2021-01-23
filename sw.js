self.addEventListener("install",e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./","style.css","./media/logo192.png"]);
        })
    );
});
self.addEventListener("fetch",e => {
    console.log(`Intercepting fetch request for: ${e.request.url}`);
});