define('application', ['base', 'tree', 'eventsystem', 'mix', 'prop', 'foreach', 'exec', 'requestAnimFrame', 'proxy'], function(BaseObject, TreeObject, EventSystem, mix, prop, forEach, exec, requestAnimFrame, proxy) {
    /*
    var supportWebGL = (function() {
        (function() {
            try {
                return !!window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');
            } catch (e) {
                return false;
            }
        })();
    })();*/
    function Application() {
        TreeObject.init.apply(this, arguments);
        this.init.apply(this, arguments);
    }
    Application.prototype = mix(BaseObject, TreeObject, {
        init: function(dom) {
            this.dom = dom;
            this.context = this.dom.getContext('2d');
            this.update = proxy(this.update, this);
            return this;
        },
        run: function(){
            this.resume();
            EventSystem.init(this.dom);
            this.update(this.context);
            return this;
        },
        pause: function(pause) {
            if(pause !== undefined){
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].pause();
                };
                this._paused = pause;
            }else{
                return this._paused;
            }
        },
        stop: function() {
            this.pause(true);
        },
        resume: function() {
            this.pause(false);
        },
        clear: function() {
            forEach(this.children, function(scene, index) {
                exec(scene, 'clear');
            });
            this.clear();
        },
        update: function() {
            var context = this.context;
            this.clearCanvas(context);
            EventSystem.isBusy = true;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].update(context);
            };
            this.showFPS(context);
            EventSystem.reset();
            requestAnimFrame(this.update);
        },
        clearCanvas: function(context) {
            context.clearRect(0, 0, this.dom.width, this.dom.height);
        },
        showFPS: function(context) {
            //this.supportWebGL && (context = getDom().getContext('2d'));
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
        },
        clear: function() {
            console.error("Could add code to implement Application's clear function");
        }
    });
    return Application;
});
