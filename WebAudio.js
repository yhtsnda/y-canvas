//var audioContext;
function WebAudio(src, callback) {
    //audioContext = audioContext || new(window.AudioContext || window.webkitAudioContext)();
    var source = audioContext.createBufferSource();
    setCallback.call(this, callback);
}

WebAudio.prototype.setArrayBuffer = function (arrayBuffer, callback) {
    var me = this;
    audioContext.decodeAudioData(arrayBuffer, function (audioData) {
        me.setBuffer(audioData);
        callback && callback(audioData);
    });
};

WebAudio.prototype.setBuffer = function (buffer) {
    this.source && (this.source.buffer = buffer);
    //this.buffer = buffer;
    this.loaded = true;
    emitCallback.call(this);
    return this;
};
WebAudio.prototype.play = function () {
    //this.source.connect(this.analyser);
    //this.analyser.connect(audioContext.destination);
    var source = audioContext.createBufferSource();
    if(this.buffer){
        source.buffer = this.buffer;
    }
    source.connect(audioContext.destination);
    source.noteOn(0);
    this.source = source;
    return this;
};

WebAudio.prototype.stop = function () {
    //this.analyser.disconnect();
    this.source.noteOff(0);
    return this;
};
