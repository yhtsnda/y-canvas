function Action() {
    this.reset();
    this.init.apply(this, arguments);
}
Action.prototype = mix(BaseObject, {
    init: function() {
        this.duration = shift(arguments) || 0;
        for (var i = 0; i < arguments.length; i++) {
            var callback = arguments[i];
            if (callback) {
                this.callback.push(callback);
            }
        };
        return this;
    },
    reset: function() {
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
    _reset: function() {},
    step: function(dt) {
        if (this.paused || this.finished || !this.target) {
            return;
        }
        this.update(dt);
        return this;
    },
    pause: function() {
        this.paused = true;
        return this;
    },
    stop: function(done) {
        this.paused = true;
        done && this.finish();
        return this;
    },
    resume: function() {
        this.paused = false;
        return this;
    },
    update: function(dt) {
        if (!this.paused) {
            var time = this.currentTime(dt);
            this._update.call(this, time);
            this.check();
        }
        return this;
    },
    _update: function() {
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
    getTime: function(time) {
        return time / this.duration;
    },
    finish: function() {
        this.finished = true;
        for (var i = 0; i < this.callback.length; i++) {
            var callback = this.callback[i];
            if (callback) {
                callback.call(this.target);
            }
        };
        this.callback.length = 0;
        this.remove();
        return this;
    },
    remove: function() {
        if (this.target && this.target.actionManager) {
            this.target.actionManager.removeAction(this);
        }
        return this;
    },
    startWith: function(target) {
        this.target = target;
        this._startWith(target);
    },
    _startWith: function() {
        return this;
    }
});
function MoveTo() {
    Action.apply(this, arguments);
}
MoveTo.prototype = mix(new Action, {
    init: function() {
        this.toPosition = shift(arguments);
        Action.prototype.init.apply(this, arguments);
        return this;
    },
    _startWith: function() {
        this.deltaPosition = Point.diff(this.toPosition, this.target.position).devideNum(this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.position.add(this.deltaPosition);
        return this;
    },
    _reset: function() {
        this.toPosition = null;
        this.deltaPosition = null;
        return this;
    }
});
function MoveBy() {
    Action.apply(this, arguments);
}
MoveBy.prototype = mix(new Action, {
    init: function() {
        this.toPosition = shift(arguments);
        Action.prototype.init.apply(this, arguments);
        return this;
    },
    _startWith: function() {
        this.deltaPosition = Point.devideNum(this.toPosition, this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.position.add(this.deltaPosition);
        return this;
    },
    _reset: function() {
        this.toPosition = null;
        this.deltaPosition = null;
        return this;
    }
});

function FadeBy() {
    Action.apply(this, arguments);
}
FadeBy.prototype = mix(new Action, {
    init: function() {
        this.fadeTo = shift(arguments);
        Action.prototype.init.apply(this, arguments);
    },
    _startWith: function() {
        this.deltaFade = this.fadeTo / (this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.alpha += this.deltaFade;
        return this;
    },
    _reset: function() {
        this.fadeTo = null;
        this.deltaFade = null;
        return this;
    }
});
function FadeTo() {
    Action.apply(this, arguments);
}
FadeTo.prototype = mix(new Action, {
    init: function() {
        this.fadeTo = shift(arguments);
        Action.prototype.init.apply(this, arguments);
    },
    _startWith: function() {
        this.deltaFade = (this.fadeTo - this.target.alpha) / (this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.alpha += this.deltaFade;
        return this;
    },
    _reset: function() {
        this.fadeTo = null;
        this.deltaFade = null;
        return this;
    }
});


function RotateBy() {
    Action.apply(this, arguments);
}
RotateBy.prototype = mix(new Action, {
    init: function() {
        this.rotateTo = shift(arguments);
        Action.prototype.init.apply(this, arguments);
    },
    _startWith: function() {
        this.deltaRotate = this.rotateTo / (this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.rotate += this.deltaRotate;
        return this;
    },
    _reset: function() {
        this.rotateTo = null;
        this.deltaRotate = null;
        return this;
    }
});
function RotateTo() {
    Action.apply(this, arguments);
}
RotateTo.prototype = mix(new Action, {
    init: function() {
        this.rotateTo = shift(arguments);
        Action.prototype.init.apply(this, arguments);
    },
    _startWith: function() {
        this.deltaRotate = (this.rotateTo - this.target.rotate) / (this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.rotate += this.deltaRotate;
        return this;
    },
    _reset: function() {
        this.rotateTo = null;
        this.deltaRotate = null;
        return this;
    }
});
function ScaleBy() {
    Action.apply(this, arguments);
}
ScaleBy.prototype = mix(new Action, {
    init: function(){
        this.scaleTo = shift(arguments);
        Action.prototype.init.apply(this, arguments);
    },
    _startWith: function() {
        this.deltaScale = Point.devideNum(this.scaleTo, this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.scale.add(this.deltaScale);
        return this;
    },
    _reset: function() {
        this.scaleTo = null;
        this.deltaScale = null;
        return this;
    }
});
function ScaleTo() {
    Action.apply(this, arguments);
}
ScaleTo.prototype = mix(new Action, {
    init: function() {
        this.scaleTo = shift(arguments);
        Action.prototype.init.apply(this, arguments);
    },
    _startWith: function() {
        this.deltaScale = Point.diff(this.scaleTo, this.target.scale).devideNum(this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.scale.add(this.deltaScale);
        return this;
    },
    _reset: function() {
        this.scaleTo = null;
        this.deltaScale = null;
        return this;
    }
});
function Sequence() {
    Action.apply(this, arguments);
}
Sequence.prototype = mix(new Action, {
    init: function() {
        this.children = shift(arguments) || [];
        for (var i = 0; i < arguments.length; i++) {
            var callback = arguments[i];
            if (callback) {
                this.callback.push(callback);
            }
        };
    },
    check: function() {
        var action = this.children[0];
        if (action.check()) {
            this.children.shift();
            this.elapsed = 0;
        }
        if (!this.children.length) {
            this.finish();
        }
        return this.children.length;
    },
    update: function(dt) {
        if(!this.paused){
            this.currentTime(dt);
            var action = this.children[0];
            if (action) {
                if (!action.target) {
                    action.startWith(this.target);
                }
                action.update.apply(action, arguments);
            }
            this.check();
        }
        return this;
    }
});

function SkewBy() {
    Action.apply(this, arguments);
}
SkewBy.prototype = mix(new Action, {
    init: function() {
        this.skewTo = shift(arguments);
        Action.prototype.init.apply(this, arguments);
    },
    _startWith: function() {
        this.deltaSkew = Point.devideNum(this.skewTo, this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.skew.add(this.deltaSkew);
        return this;
    },
    _reset: function() {
        this.skewTo = null;
        this.deltaSkew = null;
        return this;
    }
});

function SkewTo() {
    Action.apply(this, arguments);
}
SkewTo.prototype = mix(new Action, {
    init: function() {
        this.skewTo = shift(arguments);
        Action.prototype.init.apply(this, arguments);
    },
    _startWith: function() {
        this.deltaSkew = Point.diff(this.skewTo, this.target.skew).devideNum(this.duration / 16.67);
        return this;
    },
    _update: function(time) {
        this.target.skew.add(this.deltaSkew);
        return this;
    },
    _reset: function() {
        this.skewTo = null;
        this.deltaSkew = null;
        return this;
    }
});
function Spawn() {
    Action.apply(this, arguments);
}
Spawn.prototype = mix(new Action, {
    init: function() {
        this.children = shift(arguments) || [];
        for (var i = 0; i < arguments.length; i++) {
            var callback = arguments[i];
            if (callback) {
                this.callback.push(callback);
            }
        };
    },
    check: function() {
        var actions = this.children;
        for (var i = actions.length - 1; i >= 0; i--) {
            var action = actions[i];
            if(action.check()){
                actions.splice(i, 1);
            }
        };
        if(!actions.length){
            this.finish();
        }
        return this.children.length;
    },
    update: function(dt){
        if(!this.paused){
            this.currentTime(dt);
            var actions = this.children;
            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];
                if (!action.target) {
                    action.startWith(this.target);
                }
                action.update.apply(action, arguments);
            }
            this.check();
        }
        return this;
    }
});

function Delay() {
    Action.apply(this, arguments);
}
Delay.prototype = new Action;

function RepeatForever() {
    Action.apply(this, arguments);
}
RepeatForever.prototype = mix(new Action, {
    init: function() {
        this.action = action;
    },
    check: function() {
        if (this.elapsed >= this.duration) {
            this.finish();
        }
        return false;
    },
    update: function() {
        if (!this.paused) {
            this.currentTime(dt);
            var action = this.action;
            if (action) {
                if (!action.target) {
                    action.startWith(this.target);
                }
                action.update.apply(action, arguments);
            }
            this.check();
        }
        return this;
    }
});


