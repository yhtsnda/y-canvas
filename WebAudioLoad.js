var audioBufferCache = [],
    audioContext;
function WebAudioLoad(src, callback) {
    audioContext = audioContext || new(window.AudioContext || window.webkitAudioContext)();

    if (audioBufferCache[src]) {
        var audio = new WebAudio(callback);
        audio.setBuffer(audioBufferCache[src]);
        return audio;
    } else {
        var name = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
        ScriptLoad(src, function() {
            var script = this;
            var audio = new WebAudio(callback);
            audio.setArrayBuffer(Base64Binary.decodeArrayBuffer(AudioEngine[name]), function(data) {
                audioBufferCache[src] = data;
                delete AudioEngine[name];
                script.parentNode.removeChild(script);
            });
        });
    }
}

function WebAudio(callback) {
    this.source = audioContext.createBufferSource();
    this.source.connect(audioContext.destination);
    setCallback.call(this, callback);
}
WebAudio.prototype.setBuffer = function (audioData) {
    this.source.buffer = audioData;
    this.loaded = true;
    emitCallback.call(this);
}
WebAudio.prototype.setArrayBuffer = function(arrayBuffer, callback) {
    var me = this;
    audioContext.decodeAudioData(arrayBuffer, function(audioData) {
        me.setBuffer(audioData);
        callback && callback(audioData);
    });
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