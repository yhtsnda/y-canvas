var audioBufferCache = [],
    audioContext;

function WebAudioLoad(url, callback) {
    var src = url + '.js';
    audioContext = audioContext || new(window.AudioContext || window.webkitAudioContext)();

    if (audioBufferCache[src]) {
        return (new WebAudio(src, callback)).setBuffer(audioBufferCache[src]);
    } else {
        var name = url.substring(url.lastIndexOf('/') + 1),
            script;
        if (script = document.getElementById(name)) {
            var source = new WebAudio();
            script.loadedCallback.push(function() {
                source.setBuffer(audioBufferCache[src]);
            });
            return source;
        } else {
            script = ScriptLoad(src, function() {
                source.setArrayBuffer(Base64Binary.decodeArrayBuffer(AudioEngine[name]), function(data) {
                    audioBufferCache[src] = data;
                    forEach(script.loadedCallback, function(fn) {
                        fn && fn.call(script);
                        script.loadedCallback = null;
                    });
                });
            }),
            script.id = name;
            var source = new WebAudio(function() {
                delete AudioEngine[name];
                script.parentNode.removeChild(script);
            });
            return source;
        }
    }
}

function WebAudio(callback) {
    this.source = audioContext.createBufferSource();
    this.source.connect(audioContext.destination);
    setCallback.call(this, callback);
}

WebAudio.prototype.setArrayBuffer = function(arrayBuffer, callback) {
    var me = this;
    audioContext.decodeAudioData(arrayBuffer, function(audioData) {
        me.setBuffer(audioData);
        callback && callback(audioData);
    });
};

WebAudio.prototype.setBuffer = function(buffer) {
    this.source.buffer = buffer;
    this.loaded = true;
    emitCallback.call(this);
    return this;
};
WebAudio.prototype.play = function() {
    this.source.noteOn(0);
    return this;
};

WebAudio.prototype.stop = function() {
    //this.analyser.disconnect();
    this.source.noteOff(0);
    return this;
};