define('audiopool', [], function() {
    var factory = {};
    var isFirefox = navigator.userAgent.indexOf('Firefox') != -1;

    var obj = {
        get: function(audio) {
            return (factory[audio.src] && factory[audio.src].length) ? factory[audio.src].pop() : (function() {
                audio = isFirefox ? audio : audio.cloneNode(true);
                removeEventHandler(audio, 'ended', collect);
                addEventHandler(audio, 'ended', collect);
                audio.volume = 0.5;
                return audio;
            })(audio);
        },
        collect: function(audio) {
            factory[audio.src] = factory[audio.src] || [];
            factory[audio.src].push(audio);
            audio.volume = 0.5;
        },
        see: function() {
            return factory;
        },
        clear: function() {
            factory = [];
        },
        destroy: function() {
            factory = null;
        }
    };

    function collect() {
        obj.collect(this);
    };
    return obj;
});
define('audioload', [], function() {
    return function AudioLoad(src, callback) {
        var audio = document.createElement("audio");
        audio.autoplay = false;
        audio.preload = "auto";
        audio.src = src;
        audio.addEventHandler("canplaythrough", function() {
            this.loaded = true;
            //emitCallback.call(this);
        });
        //setCallback.call(audio, callback);
        return audio;
    }
});
define('audio', ['audiopool', 'foreachwithself'], function(audioPool, forEachWithMe) {
    var isIOS = navigator.userAgent.indexOf('iPad') != -1 || navigator.userAgent.indexOf('iPhone') != -1,
        isIE = navigator.userAgent.indexOf('MSIE') != -1,
        isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1,
        isFirefox = navigator.userAgent.indexOf('Firefox') != -1,
        caches = [];

    function getAudio(url, type, callback) {
        var cache = caches[url + '.' + type];
        if (cache) {
            forEachWithMe(callback, function(fn) {
                if (!fn) {
                    return;
                }
                cache.loaded ? fn.call(audioPool.get(cache)) : cache.callback.push(fn);
            });
        } else {
            load(url, type, callback);
        }
    };

    function load(url, type, callback) {
        var src = url + '.' + type;
        if (type === 'mp3' || type === 'ogg') {
            caches[src] = AudioLoad(src, callback);
        } else {
            WebAudioLoad(src, function() {
                //caches[src] = this;
                callback && callback.call(this);
            });
        }
    };

    return {
        canPlayMP3: (function() {
            return isIE || isSafari && !isIOS;
        })(),
        canPlayOGG: (function() {
            return !(isIE || isSafari || isIOS);
        })(),
        load: function(url, callback) {
            if (this.canPlayMP3) {
                getAudio(url, 'mp3', callback);
            } else if (this.canPlayOGG) {
                getAudio(url, 'ogg', callback);
            } else {
                getAudio(url, 'js', callback);
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
});