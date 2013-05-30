function AudioLoad(src, callback) {
    var audio = document.createElement("audio");
    audio.autoplay = false;
    audio.preload = "auto";
    audio.volumn = 0.00001;
    audio.src = src;
    addEventHandler(audio, "canplaythrough", function () {
        this.loaded = true;
        emitCallback.call(this);
    });
    setCallback.call(audio, callback);
    return audio;
}
