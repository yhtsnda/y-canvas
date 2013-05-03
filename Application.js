function getContext() {
    return Global().app.getContext();
}
function getDom() {
    return Global().app.dom;
}
function Application() {
    this.init.apply(this, arguments);
}
Application.prototype = new BaseObject;
Application.prototype.init = function (dom) {
    this.dom = dom;
    this.currentScene = null;
    this.nextScene = null;
    this.scenes = [];
    Global().app = this;
};
Application.prototype.getContext = function () {
    return this.dom.getContext(this.supportOpenGLES() ? 'opengles' : '2d');
};
Application.prototype.supportOpenGLES = function () {
    return false;
};
Application.prototype.run = function () {
    this.resume();
    EventSystem.init();
    this.update(this.getContext());
};
Application.prototype.pause = function (pause) {
    return pause != undefined ? (function (pause) {
        exec(this.currentScene, 'pause', pause);
        exec(this.nextScene, 'pause', pause);
        return this._paused = pause;
    }).call(this, pause) : this._paused;
};
Application.prototype.stop = function () {
    this.pause(true);
};
Application.prototype.resume = function () {
    this.pause(false);
};
Application.prototype.clear = function () {
    exec(this.currentScene, 'clear');
    exec(this.nextScene, 'clear');
    this.clear();
};
Application.prototype.update = function (context) {
    var me = this;
    me.handleEvents();
    me.getContext().clearRect(0, 0, this.dom.width, this.dom.height);
    exec(me.currentScene, 'update', context);
    exec(me.nextScene, 'update', context);
    me.resetEvents();
    me.showFPS(context);
    requestAnimFrame(function () {
        me.update(context);
    });
};
Application.prototype.showFPS = function (context) {
    this._currentFrameCount = this._currentFrameCount || 0;
    if (this._currentFrameCount % 10 === 0) {
        var now = (new Date).valueOf();
        this._fpsText = Math.round(100000 / (now - this._lastDate)) / 10;
        this._lastDate = now;
    }
    context.save();
    context.fillStyle = '#589B2A';
    context.font = "30px sans-serif bold";
    context.fillText(this._fpsText, this.dom.width / 2, 30);
    context.restore();
    this._currentFrameCount++;
};
Application.prototype.handleEvents = function () {
    var me = this;
    EventSystem.deallingEvents(true);
    forEach(EventSystem.events(), function (events) {
        forEach(events, function (event) {
            exec(me.currentScene, 'handleEvent', event);
            exec(me.nextScene, 'handleEvent', event);
        });
    });
    EventSystem.deallingEvents(false);
};
Application.prototype.resetEvents = function () {
    EventSystem.resetEvents();
};
Application.prototype.clear = function () {
    Debugger.error("Could add code to implement Application's clear function");
};