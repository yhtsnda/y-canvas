var ImageEngine = function() {
    var caches = [];
    return {
        get: function(url) {
            return caches[url];
        },
        load: function(url, callback) {
            var cache = caches[url];
            if (cache) {
                forEachWithMe(callback, function(fn) {
                    cache.loaded ? fn.call(cache) : cache.callback.push(fn);
                });
                return cache;
            } else {
                var img = new Image;
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