function AudioLoad(src, callback) {
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