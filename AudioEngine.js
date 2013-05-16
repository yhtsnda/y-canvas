var AudioEngine = function () {
    var audioEngine = {},
    isIPad = navigator.userAgent.indexOf('iPad') != -1,
    isIE = navigator.userAgent.indexOf('MSIE') != -1,
    isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1,
    caches = [];
    audioEngine.canPlayMP3 = (function () {
        return false;//isIE || isSafari && !isIPad;
    })();
    audioEngine.canPlayOGG = (function () {
        return false;//!(isIE || isSafari || isIPad);
    })();
    /* audioEngine.pauseAudio = function (url) {
        if (isString(url)) {
            caches[url] && caches[url].pause();
        } else {
            forEach(url, function (src) {
                caches[src] && caches[src].pause();
            });
        }
    }; */
    audioEngine.loadAudio = function (url, callback) {
        if (this.canPlayMP3) {
            return getAudio(url, 'mp3', callback);
        } else if (this.canPlayOGG) {
            return getAudio(url, 'ogg', callback);
        } else {
            return getAudio(url, 'js', callback);
        }
    };
    function getAudio(url, type, callback) {
        var cache = caches[url + '.' + type];
        if (cache) {
            if (isArray(callback)) {
                if (cache.loaded) {
                    forEach(callback, function (fn) {
                        fn && fn.call(cache);
                    });
                } else {
                    forEach(callback, function (fn) {
                        cache.callback.push(fn);
                    });
                }
            } else {
                if (cache.loaded) {
                    callback && callback.call(cache);
                } else {
                    callback && cache.callback.push(fn);
                }
            }
            if (type === 'mp3' || type === 'ogg') {
                return cache.cloneNode(true);
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
            /* var name = url.substring(url.lastIndexOf('/') + 1),
                script = ScriptLoad(src,function () {
                    source.setArrayBuffer(Base64Binary.decodeArrayBuffer(AudioEngine[name]));
                }),
                source = new WebAudio(function(){
                    delete AudioEngine[name];
                    script.parentNode.removeChild(script);
                });
            return caches[src] = source; */
        }
    };
    return audioEngine;
}();
