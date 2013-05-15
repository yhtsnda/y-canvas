var AudioEngine = function(){
    var audioEngine = {},
        isIPad = navigator.userAgent.indexOf('iPad') != -1,
        isIE = navigator.userAgent.indexOf('MSIE') != -1,
        isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1,
        caches = [];
    audioEngine.canPlayMP3 = (function(){
        return false;//isIE || isSafari;
    })();
    audioEngine.canPlayOGG = (function(){
        return false;
    })();
    audioEngine.audioContext = (function(){
        if ('AudioContext' in window) {
            return new AudioContext();
        } else if ('webkitAudioContext' in window) {
            return new webkitAudioContext();
        }
    })();
    audioEngine.loadAudio = function(url,callback){
        if(this.canPlayMP3){
            return audioEngine.getAudio(url, 'mp3', callback);
        }else if(this.canPlayOGG){
            return audioEngine.getAudio(url, 'ogg', callback);
        }else if(this.audioContext){
            return audioEngine.getAudio(url, 'js', callback);
        }
    };
    audioEngine.getAudio = function(url, type, callback){
        var cache = caches[url + '.' + type];
        if(cache){
            if(isArray(callback)){
                if(cache.loaded){
                    forEach(callback,function(fn){
                        fn && fn.call(cache);
                    });
                }else{
                    forEach(callback,function(fn){
                        cache.callback.push(fn);
                    });
                }
            }else{
                if(cache.loaded){
                    callback && callback.call(cache);
                }else{ 
                    callback && cache.callback.push(fn);
                }
            }
            return cache;
        }else{
            return this.load(url, type, callback);
        }
    };
    audioEngine.load = function(url, type, callback){
        var src = url + '.' + type;
        if(type === 'mp3' || type === 'ogg'){
            var audio = document.createElement("audio");
            caches[src] = audio;
            audio.src = src;
            audio.autoplay = false;
            audio.preload = "auto";
            audio.callback = [];
            if(isArray(callback)){
                forEach(callback,function(fn){
                    fn && audio.callback.push(fn);
                });
            }else{
                callback && audio.callback.push(callback);
            }
            addEventHandler(audio, "canplaythrough", function () {
                this.loaded = true;
                forEach(audio.callback,function(fn){
                    fn && fn.call(audio);
                });
                audio.callback = [];
            });
            return audio;
        }else{
            var name = url.substring(url.lastIndexOf('/') + 1),
                script = document.createElement('script'),
                source = audioEngine.audioContext.createBufferSource();
            script.type = 'text/javascript';
            script.src = src;
            source.callback = [];
            caches[src] = source;
            source.play = function(){
                //console.log(this.noteOn || this.start)
                this.noteOn ? this.noteOn(0) : this.start(0);
                //(this.noteOn || this.start)(0);
            };
            source.pause = function(){
                this.noteOff ? this.noteOff(0) : this.stop();
            };
            if(isArray(callback)){
                forEach(callback,function(fn){
                    fn && source.callback.push(fn);
                });
            }else{
                callback && source.callback.push(callback);
            }
            function onLoad(){
                source.loaded = true;
                forEach(source.callback,function(fn){
                    fn && fn.call(this);
                });
                var arrayBuffer = Base64Binary.decodeArrayBuffer(window[name]);
                audioEngine.audioContext.decodeAudioData(arrayBuffer, function(audioData) {
                    source.buffer = audioData;
                });
                source.connect(audioEngine.audioContext.destination);
            }
            script.onreadystatechange = function () {
                if (this.readyState == 'complete'){
                    onLoad();
                }
            }
            script.onload = onLoad;
            (document.head || document.body).appendChild(script);
            return source;
        }
    };
    return audioEngine;
}();