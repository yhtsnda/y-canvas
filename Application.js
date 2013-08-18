function getContext() {
    return window.app.getContext();
}

function getDom() {
    return window.app.dom;
}

function Application() {
    this.init.apply(this, arguments);
}
Application.prototype = new BaseObject;
Application.prototype.init = function(dom) {
    this.dom = dom;
    this.children = prop([]);
    //this.nextScene = null;
    //this.scenes = [];
    window.app = this;
};
Application.prototype.getContext = function() {
    return this.dom.getContext(this.supportWebGL() ? 'webgl' : '2d');
};
Application.prototype.supportWebGL = function() {
    return false;
};
Application.prototype.run = function() {
    this.resume();
    EventSystem.init();
    this.update(this.getContext());
};
Application.prototype.pause = function(pause) {
    return pause != undefined ? (function(pause) {
        forEach(this.children(), function(scene, index) {
            exec(scene, 'pause', pause);
        });
        //exec(this.nextScene, 'pause', pause);
        return this._paused = pause;
    }).call(this, pause) : this._paused;
};
Application.prototype.stop = function() {
    this.pause(true);
};
Application.prototype.resume = function() {
    this.pause(false);
};
Application.prototype.clear = function() {
    forEach(this.children(), function(scene, index) {
        exec(scene, 'clear');
    });
    //exec(this.nextScene, 'clear');
    this.clear();
};
Application.prototype.update = function(context) {
    var me = this;
    this.clearCanvas(context);
    EventSystem.deallingEvents(true);
    forEach(this.children(), function(scene, index) {
        exec(scene, 'update', context);
    });
    //exec(me.nextScene, 'update', context);
    //me.handleEvents();
    me.showFPS(context);
    EventSystem.deallingEvents(false);
    EventSystem.resetEvents();
    requestAnimFrame(function() {
        me.update(context);
    });
};
Application.prototype.clearCanvas = function(context) {
    this.supportWebGL() ? context.clear(context.COLOR_BUFFER_BIT) : context.clearRect(0, 0, this.dom.width, this.dom.height);
};
Application.prototype.showFPS = function(context) {
    this._currentFrameCount = this._currentFrameCount || 0;
    if (this._currentFrameCount % 10 === 0) {
        var now = (new Date).valueOf();
        if (this._lastDate) {
            this._fpsText = Math.round(100000 / (now - this._lastDate)) / 10;
        }
        this._lastDate = now;
    }
    if (this._fpsText) {
        context.fillStyle = '#589B2A';
        context.font = "30px sans-serif bold";
        context.fillText(this._fpsText, this.dom.width / 2, 30);
    }
    this._currentFrameCount++;
};
Application.prototype.clear = function() {
    Debugger.error("Could add code to implement Application's clear function");
};