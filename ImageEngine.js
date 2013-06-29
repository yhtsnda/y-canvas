var ImageEngine = function() {
    var caches = [];
    return {
        get: function(url) {
            return caches[url];
        },
        load: function(url, callback) {
            var cache = caches[url];
            if (cache) {
                if (cache.loaded) {
                    forEachWithMe(callback, function(fn) {
                        fn.call(cache);
                    });
                } else {
                    forEachWithMe(callback, function(fn) {
                        cache.callback.push(fn);
                    });
                }
                return cache;
            } else {
                var img = new Image();
                img.src = url;
                img.callback = [];
                caches[url] = img;

                forEachWithMe(callback, function(fn) {
                    img.callback.push(fn);
                });
                img.onload = function() {
                    this.loaded = true;
                    forEach(this.callback, function(fn) {
                        fn && fn.call(img);
                    });
                    img.callback = [];
                };
                return img;
            }
        }
    };
}();