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
    exec(me.currentScene, 'update', context);
    exec(me.nextScene, 'update', context);
    me.resetEvents();
    requestAnimFrame(function () {
        me.update(context);
    });
};
Application.prototype.showFPS = function () {
    this._currentFrameCount = (this._currentFrameCount++ || this._currentFrameCount = 0) % 10;
    
    if (!this._currentFrameCount) {
        var now = (new Date).valueOf();
        this._fpsText = Math.round(100000 / (now - this._lastDate)) / 10;
        this._lastDate = now;
    }
    if (!this.supportOpenGLES()) {
        var context = arguments[0] || getContext();
        this._fpsFillStyle = this._fpsFillStyle || '#589B2A';
        this._fpsFont = this._fpsFont || "30px sans-serif bold";
        this._fpsPos = this._fpsPos || PointMake(300, 30);
        context.save();
        context.fillStyle = this._fpsFillStyle;
        context.font = this._fpsFont;
        context.fillText(this._fpsText, this._fpsPos.x, this._fpsPos.y);
        context.restore();
    }
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