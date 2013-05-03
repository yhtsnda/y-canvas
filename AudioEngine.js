var AudioEngine = (function(){
    var engine;
    function create(){
        
    }
    return function(){
        return engine || create();
    };
})();
var AudioEngine = {},
isIE = /msie/i.test(navigator.userAgent),
isSafari = -1 < navigator.userAgent.indexOf("Safari") && 1 > navigator.userAgent.indexOf("Chrome"),
supportMp3 = isIE || isSafari;
AudioEngine.sharedEngine = function () {
    var c = window.audioEngine;
    if (c) {
        return c;
    }
    var d = function (c) {
        var d = document.createElement("audio");
        d || console.log("Your browser doesn't support audio tag!");
        d.autoplay = false;
        d.preload = "auto";
		d.volumn = 0.00001;
        var h = c.substr(c.length - 4).toLowerCase();
        supportMp3 && ".ogg" == h ? (c = c.substr(0, c.length - 4) + ".mp3") : !supportMp3 && ".mp3" == h && (c = c.substr(0, c.length - 4) + ".ogg");
        d.src = c;
        d.onLoaded = function () {
            d.loaded || this.callback && this.callback(this);
            d.loaded = true;
        };
        d.setCallback = function (c) {
            this.callback = c;
        };
        addEventHandler(d, "canplaythrough",
            function () {
            d.onLoaded();
        });
        return d;
    },
    c = {
        cacheAudio : [],
        stopEffect : function (f) {
            (f = c.contains(f)) && f.loaded && f.pause();
        },
        playEffect : function (f, d) {
            var h = c.contains(f);
            h ? h.loaded && h.play() : c.preLoadAudio(f,
                function (c) {
                d && ("loop" in c ? (c.loop = true) : addEventHandler(c, "ended",
                        function () {
                        setTimeout(function () {
                        c.currentTime = 0;
                    },
                    200);
                }));
                c.play();
            });
        },
        preLoadAudio : function (f, g) {
            if (f) {
                if (f instanceof Array) {
                    for (var h = 0; h < f.length; h++) {
                        c.preLoadAudio(f[h]);
                    }
                } else {
                    c.contains(f) || (h = new d(f, g), g && h.setCallback(g), c.cacheAudio[f] = h);
                }
            }
        },
        contains : function (c) {
            for (var d in this.cacheAudio) {
                if (d == c || this.cacheAudio[d].src == c) {
                    return this.cacheAudio[d];
                }
            }
            return null;
        },
        play : function (c) {
            c.play();
        },
        pause : function (c) {
            c.pause();
        }
    };
    window.audioEngine = c;
    return window.audioEngine;
};
