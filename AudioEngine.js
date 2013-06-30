var AudioEngine = function() {
    var isIPad = navigator.userAgent.indexOf('iPad') != -1,
        isIE = navigator.userAgent.indexOf('MSIE') != -1,
        isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1,
        caches = [];

    function getAudio(url, type, callback) {
        var cache = caches[url + '.' + type];
        if (cache) {
            if (isArray(callback)) {
                if (cache.loaded) {
                    forEach(callback, function(fn) {
                        fn && fn.call(cache);
                    });
                } else {
                    forEach(callback, function(fn) {
                        cache.callback.push(fn);
                    });
                }
            } else {
                if (cache.loaded) {
                    callback && callback.call(cache);
                } else {
                    callback && cache.callback.push(callback);
                }
            }
            return cache;
        } else {
            return load(url, type, callback);
        }
    };

    function load(url, type, callback) {
        var src = url + '.' + type;
        if (type === 'mp3' || type === 'ogg') {
            return caches[src] = AudioLoad(src, callback);
        } else {
            return WebAudioLoad(url, callback);
        }
    };
    return {
        canPlayMP3: (function() {
            return isIE || isSafari && !isIPad;
        })(),
        canPlayOGG: (function() {
            return !(isIE || isSafari || isIPad);
        })(),
        load: function(url, callback) {
            if (this.canPlayMP3) {
                return getAudio(url, 'mp3', callback);
            } else if (this.canPlayOGG) {
                return getAudio(url, 'ogg', callback);
            } else {
                return getAudio(url, 'js', callback);
            }
        },
        play: function(url) {
            this.load(url, function() {
                this.play();
            });
        },
        pause: function(url) {
            this.load(url, function() {
                this.pause();
            });
        }
    };
}();