define('action', ['base', 'prop', 'mix', 'shift'], function(BaseObject, prop, mix, shift) {
    function Action() {
        this.reset();
        this.init.apply(this, arguments);
    }
    Action.prototype = mix(BaseObject, {
        init: function(){
            this.duration = shift(arguments) || 0;
            for (var i = 0; i < arguments.length; i++) {
                var callback = arguments[i];
                if(callback){
                    this.callback.push(callback);
                }
            };
            return this;
        },
        reset: function(){
            this.finished = false;
            this.paused = false;
            this.callback = this.callback || [];
            this.callback.length = 0;
            this.elapsed = 0;
            this.duration = 0;
            this._reset();
            this.remove();
            this.target = null;
            return this;
        },
        _reset: function(){},
        step: function(dt){
            if(this.paused || this.finished || !this.target){
                return;
            }
            this.update(dt);
            return this;
        },
        pause: function(){
            this.paused = true;
            return this;
        },
        stop: function(done){
            this.paused = true;
            done && this.finish();
            return this;
        },
        resume: function(){
            this.paused = false;
            return this;
        },
        update: function(dt){
            if(!this.paused){
                var time = this.currentTime(dt);
                this._update.call(this, time);
                this.check();
            }
            return this;
        },
        _update: function(){
            return this;
        },
        check: function() {
            if (this.elapsed >= this.duration) {
                this.finish();
            }
            return this.elapsed >= this.duration;
        },
        currentTime: function(dt) {
            return Math.min(this.elapsed += dt, this.duration); // / this.duration;
        },
        getTime: function(time){
            return time / this.duration;
        },
        finish: function(){
            this.finished = true;
            for (var i = 0; i < this.callback.length; i++) {
                var callback = this.callback[i];
                if(callback){
                    callback.call(this.target);
                }
            };
            this.callback.length = 0;
            this.remove();
            return this;
        },
        remove: function(){
            if(this.target && this.target.actionManager){
                this.target.actionManager.removeAction(this);
            }
            return this;
        },
        startWith: function (target) {
            this.target = target;
            this._startWith(target);
        },
        _startWith: function(){
            return this;
        }
    });
    return Action;
});
