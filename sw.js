self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('restaurant-reviews-cache-v1').then(function(cache){
			console.log('cache open');
			return cache.addAll([
				'/',
				'css/styles.css',
				'js/dbhelper.js',
				'js/main.js',
				'js/restaurant_info.js',
				'data/restaurants.json',
				'img/'
			]);
		}).catch(function(err) {
//			console.log(err);
		})
	);
})

self.addEventListener('fetch', function(event) {
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response){
			if (response) return response;
			return fetch(event.request);
		}).catch(function(error) {
			console.log(error);
		})
	);
});