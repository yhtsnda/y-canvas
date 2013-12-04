function Action() {
    this.done = prop(false);
    this.callback = prop([]);
    this.pause = prop(false);
    this.elapsed = 0;
    this._preInit.apply(this, arguments);
    this.init.apply(this, arguments);
}
Action.prototype = new BaseObject;
(function() {
    function defaultFunc() {};
    ['onInit', '_init', '_preInit', 'afterInit', 'onUpdate', '_update', 'afterUpdate', 'onReset', '_reset', 'afterReset', 'onClear', '_clear', 'afterClear', '_startWithTarget'].some(function(prop) {
        Action.prototype[prop] = defaultFunc;
    });
})();
Action.prototype.step = function(dt) {
    if (this.pause() || this.done() || !this.target) {
        return;
    }
    this.update(dt);
    return this;
};
Action.prototype.emitCallback = function() {
    forEach(this.callback(), function(callback, index) {
        callback && callback();
    });
    this.callback(null);
};
Action.prototype.stop = function() {
    this.pause(true);
};
Action.prototype.resume = function() {
    this.pause(false);
};
Action.prototype.currentAction = function() {
    return this;
};
Action.prototype.reset = function() {
    this.done(false);
    this.elapsed = 0;
    this.onReset.apply(this, arguments);
    this._reset.apply(this, arguments);
    this.afterReset.apply(this, arguments);
};
Action.prototype.clear = function() {
    this.onClear.apply(this, arguments);
    this._clear.apply(this, arguments);
    delete this.target;
    this.afterClear.apply(this, arguments);
};
Action.prototype._preInit = function() {
    if (arguments.length >= 2) {
        this.duration = arguments[1];
    }
    if (arguments.length > 2) {
        var callbacks = this.callback();
        forEach(slice(arguments, 2), function(callback, index) {
            callbacks.push(callback);
        });
    }
};
Action.prototype.init = function() {
    this.onInit.apply(this, arguments);
    this._init.apply(this, arguments);
    this.afterInit.apply(this, arguments);
};
Action.prototype.update = function(dt) {
    var time = this.currentTime(dt);
    this.onUpdate.call(this, time);
    this._update.call(this, time);
    this.afterUpdate.call(this, time);
    this.checkDone();
    return this;
};
Action.prototype.checkDone = function() {
    if (this.elapsed >= this.duration) {
        this.done(true);
        this.emitCallback();
    }
    return this;
};
Action.prototype.startWithTarget = function(target) {
    this.target = target;
    this._startWithTarget.apply(this, arguments);
    this.step(1000 / 60);
    return this;
};
Action.prototype.currentTime = function(dt) {
    return Math.min(this.elapsed += dt, this.duration); // / this.duration;
};
Action.prototype.getTime = function(time) {
    return time / this.duration;
};

function MoveTo() {
    Action.apply(this, arguments);
}
MoveTo.prototype = new Action;
MoveTo.prototype._init = function(toPosition) {
    this.toPosition = toPosition;
    return this;
};
MoveTo.prototype._startWithTarget = function() {
    this.startPosition = this.target.position();
    this.deltaPosition = PointDiff(this.toPosition, this.startPosition);
    return this;
};
MoveTo.prototype._update = function(time) {
    this.target.position(PointSum(this.startPosition, PointMulti(this.deltaPosition, this.getTime(time))));
    return this;
};
MoveTo.prototype._reset = function() {
    return this;
};
MoveTo.prototype._clear = function() {
    delete this.toPosition;
    delete this.startPosition;
    delete this.deltaPosition;
    return this;
};

function MoveBy() {
    Action.apply(this, arguments);
}
MoveBy.prototype = new Action;
MoveBy.prototype._init = function() {
    return MoveTo.prototype._init.apply(this, arguments);
};
MoveBy.prototype._startWithTarget = function() {
    this.startPosition = this.target.position();
    this.deltaPosition = this.toPosition;
    return this;
};
MoveBy.prototype._update = function() {
    return MoveTo.prototype._update.apply(this, arguments);
};
MoveBy.prototype._reset = function() {
    //TODO
    return this;
};
MoveBy.prototype._clear = function() {
    return MoveTo.prototype._clear.apply(this, arguments);
};

function ScaleTo() {
    Action.apply(this, arguments);
}
ScaleTo.prototype = new Action;
ScaleTo.prototype._init = function(scaleTo) {
    this.scaleTo = scaleTo;
    return this;
};
ScaleTo.prototype._startWithTarget = function() {
    this.startScale = this.target.scale();
    this.deltaScale = this.scaleTo.diff(this.startScale);
    return this;
};
ScaleTo.prototype._update = function(time) {
    this.target.scale(this.startScale.sum(this.deltaScale.multi(this.getTime(time))));
    return this;
};
ScaleTo.prototype._reset = function() {
    //TODO
    return this;
};
ScaleTo.prototype._clear = function() {
    delete this.scaleTo;
    delete this.startScale;
    delete this.deltaScale;
    return this;
};

function ScaleBy() {
    Action.apply(this, arguments);
}
ScaleBy.prototype = new Action;
ScaleBy.prototype._init = function() {
    return ScaleTo.prototype._init.apply(this, arguments);
};
ScaleBy.prototype._startWithTarget = function() {
    this.startScale = this.target.scale();
    this.deltaScale = this.scaleTo;
    return this;
};
ScaleBy.prototype._update = function() {
    return ScaleTo.prototype._update.apply(this, arguments);
};
ScaleBy.prototype._reset = function() {
    return ScaleTo.prototype._reset.apply(this, arguments);
};
ScaleBy.prototype._clear = function() {
    return ScaleTo.prototype._clear.apply(this, arguments);
};

function SkewTo() {
    Action.apply(this, arguments);
}
SkewTo.prototype = new Action;
SkewTo.prototype._init = function(skewTo) {
    this.skewTo = skewTo;
    return this;
};
SkewTo.prototype._startWithTarget = function() {
    this.startSkew = this.target.skew();
    this.deltaSkew = this.skewTo.diff(this.startSkew);
    return this;
};
SkewTo.prototype._update = function(time) {
    this.target.skew(this.startSkew.add(this.deltaSkew.multi(this.getTime(time))));
    return this;
};
SkewTo.prototype._clear = function() {
    delete this.startSkew;
    delete this.deltaSkew;
    delete this.skewTo;
    return this;
};

function SkewBy() {
    Action.apply(this, arguments);
}
SkewBy.prototype = new Action;
SkewBy.prototype._init = function(skewBy) {
    this.deltaSkew = skewBy;
    return this;
};
SkewBy.prototype._startWithTarget = function() {
    this.startSkew = this.target.skew();
    return this;
};
SkewBy.prototype._update = function() {
    return SkewTo.prototype._update.apply(this, arguments);
};

function RotateTo() {
    Action.apply(this, arguments);
}
RotateTo.prototype = new Action;
RotateTo.prototype._init = function(rotateTo) {
    this.rotateTo = rotateTo;
    return this;
};
RotateTo.prototype._startWithTarget = function() {
    this.startRotate = this.target.rotate();
    this.deltaRotate = this.rotateTo - this.startRotate;
    return this;
};
RotateTo.prototype._update = function(time) {
    this.target.rotate(this.startRotate + this.deltaRotate * this.getTime(time));
    //this.target.rotate(PointSum(this.startRotate, PointMulti(this.deltaRotate, this.elapsed / this.duration)));
};
RotateTo.prototype._reset = function() {
    /*this.rotateTo = null;
    this.startRotate = null;
    this.deltaRotate = null;*/
};
RotateTo.prototype._clear = function() {
    delete this.rotateTo;
    delete this.startRotate;
    delete this.deltaRotate;
};

function RotateBy() {
    Action.apply(this, arguments);
}
RotateBy.prototype = new Action;
RotateBy.prototype._init = function() {
    RotateTo.prototype._init.apply(this, arguments);
};
RotateBy.prototype._startWithTarget = function() {
    this.startRotate = this.target.rotate();
    this.deltaRotate = this.rotateTo;
};
RotateBy.prototype._update = function() {
    RotateTo.prototype._update.apply(this, arguments);
};
RotateBy.prototype._reset = function() {
    RotateTo.prototype._reset.apply(this, arguments);
};
RotateBy.prototype._clear = function() {
    RotateTo.prototype._clear.apply(this, arguments);
};

function TintTo() {
    Action.apply(this, arguments);
}
TintTo.prototype = new Action;
TintTo.prototype._init = function(tintTo) {
    this.tintTo = tintTo;
};
TintTo.prototype._startWithTarget = function() {
    //TODO add tint support to Sprite
    //this.startTint = this.target.tint();
    //this.deltaTint =

    var _render = this.target._render;
    var t = 0;
    var fill = 'hsla(' + t + ', 100%, 50%, 1)';
    this.target._render = function(ctx) {
        var composite = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = 'destination-out';
        _render.apply(this, arguments);
        ctx.fillStyle = fill = 'hsla(' + ++t + ', 100%, 50%, 1)';
        ctx.globalCompositeOperation = 'destination-over';
        var pos = this.actualPosition(),
            w = this.width() * this.scale().x,
            h = this.height() * this.scale().y;
        ctx.fillRect(pos.x, pos.y, w, h);
        ctx.globalAlpha = 0.5;
        ctx.globalCompositeOperation = composite;
        _render.apply(this, arguments);
    };
};
TintTo.prototype._update = function() {
    //TODO support update here
    //getContext()

};
/*
function TintBy() {
Action.apply(this, arguments);
}
TintBy.prototype = new Action;
TintBy.prototype._init = function () {
TintTo.prototype._init.apply(this, arguments);
};
TintBy.prototype._startWithTarget = function () {
//TODO add tint support to Sprite
//this.startTint = this.target.tint();
//this.deltaTint =
};
TintBy.prototype._update = function () {
TintTo.prototype._update.apply(this, arguments);
};
 */

function FadeTo() {
    Action.apply(this, arguments);
}
FadeTo.prototype = new Action;
FadeTo.prototype._init = function(fadeTo) {
    this.fadeTo = fadeTo;
};
FadeTo.prototype._startWithTarget = function() {
    this.startFade = this.target.alpha();
    this.deltaFade = this.fadeTo - this.startFade;
};
FadeTo.prototype._update = function(time) {
    this.target.alpha(this.startFade + this.deltaFade * this.getTime(time));
};
FadeTo.prototype._reset = function() {
    /*this.fadeTo = null;
    this.startFade = null;
    this.deltaFade = null;*/
};
FadeTo.prototype._clear = function() {
    delete this.fadeTo;
    delete this.startFade;
    delete this.deltaFade;
};

function FadeBy() {
    Action.apply(this, arguments);
}
FadeBy.prototype = new Action;
FadeBy.prototype._init = function() {
    FadeTo.prototype._init.apply(this, arguments);
};
FadeBy.prototype._startWithTarget = function() {
    this.startFade = this.target.alpha();
    this.deltaFade = this.fadeTo;
};
FadeBy.prototype._update = function(time) {
    this.target.alpha(this.startFade + this.deltaFade * this.getTime(time));
};
FadeBy.prototype._reset = function() {
    FadeTo.prototype._reset.apply(this, arguments);
};

function FadeIn() {
    Action.apply(this, arguments);
}
FadeIn.prototype = new Action;
FadeIn.prototype._init = function(duration) {
    this.fadeTo = 1;
    this.duration = duration;
    var callbacks = this.callback();
    forEach(slice(arguments, 1), function(callback, index) {
        callbacks.push(callback);
    });
};
FadeIn.prototype._startWithTarget = function() {
    FadeTo.prototype._startWithTarget.apply(this, arguments);
};
FadeIn.prototype._update = function() {
    FadeTo.prototype._update.apply(this, arguments);
};
FadeIn.prototype._reset = function() {
    FadeTo.prototype._reset.apply(this, arguments);
};
FadeIn.prototype._clear = function() {
    FadeTo.prototype._clear.apply(this, arguments);
};

function FadeOut() {
    Action.apply(this, arguments);
}
FadeOut.prototype = new Action;
FadeOut.prototype._preInit = function() {};
FadeOut.prototype._init = function(duration) {
    this.fadeTo = 0;
    this.duration = duration;
    var callbacks = this.callback();
    forEach(slice(arguments, 1), function(callback, index) {
        callbacks.push(callback);
    });
};
FadeOut.prototype._startWithTarget = function() {
    FadeTo.prototype._startWithTarget.apply(this, arguments);
};
FadeOut.prototype._update = function() {
    FadeTo.prototype._update.apply(this, arguments);
};
FadeOut.prototype._reset = function() {
    FadeTo.prototype._reset.apply(this, arguments);
};
FadeOut.prototype._clear = function() {
    FadeTo.prototype._clear.apply(this, arguments);
};

function Delay() {
    Action.apply(this, arguments);
}
Delay.prototype = new Action;
Delay.prototype._preInit = function() {};
Delay.prototype._init = function(duration) {
    this.duration = duration;
    var callbacks = this.callback();
    forEach(slice(arguments, 1), function(callback, index) {
        callbacks.push(callback);
    });
};

function Sequence() {
    Action.apply(this, arguments);
}
Sequence.prototype = new Action;
Sequence.prototype._preInit = function() {};
Sequence.prototype._init = function() {
    this.actions = function() {
        var _actions = [];
        return function(actions) {
            return actions === undefined ? _actions : _actions = actions;
        }
    }();
    var actions = this.actions();
    forEach(arguments, function(action) {
        actions.push(action);
    });
};
Sequence.prototype._update = function(time) {
    exec(this.currentAction(), 'update', time);
};
Sequence.prototype.currentTime = function(dt) {
    return dt;
};
Sequence.prototype.checkDone = function() {
    var hasDone = true;
    forEach(this.actions(), function(action) {
        if (!action.done()) {
            hasDone = false;
            return true;
        }
    });
    if (hasDone) {
        this.emitCallback();
    }
    return hasDone;
};
Sequence.prototype.currentAction = function() {
    var actions = this.actions();
    for (var i = actions.length - 1; i >= 0; i--) {
        if (actions[i].done()) {
            actions.splice(i, 1);
        }
    }
    if (actions.length) {
        if (!actions[0].target) {
            actions[0].startWithTarget(this.target);
        } else {
            return actions[0];
        }
    }
};

function Repeat() {
    Action.apply(this, arguments);
}
Repeat.prototype = new Action;
Repeat.prototype._preInit = function() {};
Repeat.prototype._init = function(action, repeatTotal) {
    this.action = action;
    this.repeatTotal = repeatTotal;
    this.hasRepeated = 0;
};
Repeat.prototype.checkDone = function() {
    if (this.hasRepeated >= this.repeatTotal) {
        return true;
    }
};
Repeat.prototype._update = function(time) {
    exec(this.currentAction(), 'update', time);
    if (this.action.done()) {
        this.hasRepeated++;
        //console.log(this.hasRepeated);
        this.done(this.hasRepeated >= this.repeatTotal);
    }
};
Repeat.prototype.currentTime = function(dt) {
    return dt;
};
Repeat.prototype.currentAction = function() {
    if (this.hasRepeated < this.repeatTotal && this.action.done()) {
        this.action.reset();
        //this.hasRepeated++;
    }
    if (this.action.target) {
        return this.action;
    }
    this.action.startWithTarget(this.target);
};
Repeat.prototype._reset = function() {};
Repeat.prototype._clear = function() {
    this.actions(null);
};

function Spawn() {
    Action.apply(this, arguments);
}
Spawn.prototype = new Action;
Spawn.prototype._init = function() {
    this.actions = function() {
        var _actions = [];
        return function(actions) {
            return actions === undefined ? _actions : _actions = actions;
        };
    }();
    var actions = this.actions();
    forEach(arguments, function(action) {
        actions.push(action);
    });
};
Spawn.prototype._preInit = function() {};
Spawn.prototype._update = function(time) {
    var me = this;
    forEach(me.actions(), function(action) {
        if (!action.target) {
            action.startWithTarget(me.target);
        } else {
            action.update(time);
        }
    });
};
Spawn.prototype.currentTime = function(dt) {
    return dt;
};
Spawn.prototype.checkDone = function() {
    var done = true,
        me = this,
        hasNull = false;
    forEach(me.actions(), function(action, index) {
        if (!action.done()) {
            done = false;
            return true;
        } else {
            hasNull = true;
            me.actions()[index] = null;
        }
    });
    if (done) {
        this.done(true);
    }
    if (hasNull) {
        this.actions().removeNullVal();
    }
    return done;
};

function RepeatForever() {
    Action.apply(this, arguments);
}
RepeatForever.prototype = new Action;
RepeatForever.prototype._init = function(action) {
    this.action = action;
};
RepeatForever.prototype._preInit = function() {};
RepeatForever.prototype._update = function() {
    this.action._update.apply(this.action, arguments);
};
RepeatForever.prototype._reset = function() {};
RepeatForever.prototype._clear = function() {
    this.action = null;
};
RepeatForever.prototype.currentAction = function() {
    return this.action;
};
RepeatForever.prototype.done = function() {
    return this.action.done.apply(this.action, arguments);
};
RepeatForever.prototype.checkDone = function() {
    return false;
};
RepeatForever.prototype._update = function(time) {
    //console.log(time);
    exec(this.currentAction(), 'update', time);
    if (this.action.done()) {}
};
RepeatForever.prototype.currentTime = function(dt) {
    return dt;
};
RepeatForever.prototype.currentAction = function() {
    if (this.action.done()) {
        this.action.reset();
    }
    if (this.action.target) {
        return this.action;
    }
    this.action.startWithTarget(this.target);
};

function CustomerAction() {
    Action.apply(this, arguments);
}
//new CustomerAction({position:PointMake(100,100),rotate:Math.PI/4,scale:PointMake(0.1,0.1)},1000)
CustomerAction.prototype = new Action;
CustomerAction.prototype._init = function(to) {
    this.to = to;
};
CustomerAction.prototype._startWithTarget = function() {
    forEach(this.to, function(value, prop) {
        this['start' + prop] = this.target[prop]();
        this['delta' + prop] = isNumber(value) ? (value - this.target[prop]()) : value.diff(this.target[prop]());
    }, this);
};
CustomerAction.prototype._update = function(time) {
    forEach(this.to, function(value, prop) {
        var t = this.getTime(time);
        if (isNumber(value)) {
            this.target[prop](this['start' + prop] + this['delta' + prop] * t);
        } else {
            this.target[prop](this['start' + prop].sum(this['delta' + prop].multi(t)));
            //console.log(this['start' + prop].sum(this['delta' + prop].multi(t)));
        }
    }, this);
};
CustomerAction.prototype._reset = function() {

};
