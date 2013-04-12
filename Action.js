function Action() {
    this.duration = argument.length >= 2 ? arguments[arguments.length - 2] : 0;
    this.callback = argument.length >= 2 ? arguments[arguments.length - 1] : null;
    this.isDone = false;
    this.elapsed = 0;
    this.exec('init', arguments);
}
Action.prototype = new BaseObject;
Action.prototype.step = function (dt) {
    if (this.hasDone(dt)) {
        this.done();
    } else {
        this.update();
    }
};
Action.prototype.hasDone = function (dt) {
    if (this.isDone) {
        return true;
    }
    this.elapsed = Math.min(this.duration, this.elapsed + dt);
    if (this.elapsed >= this.duration) {
        return true;
    }
};
Action.prototype.done = function () {
    this.isDone = true;
    if (this.callback) {
        this.callback();
        this.callback = null;
    }
};
Action.prototype.reset = function () {
    /*this.duration = 0;
    this.callback = null;
    this.isDone = false;
    this.elapsed = 0;*/
    this.exec('onReset', arguments);
    this.exec('_reset', arguments);
    this.exec('afterReset', arguments);
};
Action.prototype.clear = function () {
    /*delete this.duration;
    delete this.callback;
    delete this.isDone;
    delete this.elapsed;*/
    this.exec('onClear', arguments);
    this.exec('_clear', arguments);
    delete this.target;
    this.exec('afterClear', arguments);
};
Action.prototype.init = function () {
    this.exec('onInit', arguments);
    this.exec('_init', arguments);
    this.exec('afterInit', arguments);
};
Action.prototype.update = function () {
    this.exec('onUpdate', arguments);
    this.exec('_update', arguments);
    this.exec('afterUpdate', arguments);
};
Action.prototype.startWithTarget = function (target) {
    this.target = target;
    this.exec('_startWithTarget', arguments);
};

function MoveTo() {
    Action.apply(this, arguments);
}
MoveTo.prototype = new Action;
MoveTo.prototype._init = function (toPosition) {
    this.toPosition = toPosition;
};
MoveTo.prototype._startWithTarget = function () {
    this.startPosition = this.target.position();
    this.deltaPosition = PointDiff(this.toPosition, this.startPosition);
};
MoveTo.prototype._update = function () {
    this.target.position(PointSum(this.startPosition, this.deltaPosition * this.elapsed));
};
MoveTo.prototype._reset = function () {
    /*this.toPosition = null;
    this.startPosition = null;
    this.deltaPosition = null;*/
};
MoveTo.prototype._clear = function () {
    delete this.toPosition;
    delete this.startPosition;
    delete this.deltaPosition;
};
function MoveBy() {
    Action.apply(this, arguments);
}
MoveBy.prototype = new Action;
MoveBy.prototype._init = function () {
    MoveTo.prototype._init.apply(this, arguments);
};
MoveBy.prototype._startWithTarget = function () {
    this.startPosition = this.target.position();
    this.deltaPosition = this.toPosition;
};
MoveBy.prototype._update = function () {
    MoveTo.prototype._update.apply(this, arguments);
};
MoveBy.prototype._reset = function () {
    MoveTo.prototype._reset.apply(this, arguments);
};
MoveBy.prototype._clear = function () {
    MoveTo.prototype._clear.apply(this, arguments);
};

function ScaleTo() {
    Action.apply(this, arguments);
}
ScaleTo.prototype = new Action;
ScaleTo.prototype._init = function (scaleTo) {
    this.scaleTo = scaleTo;
};
ScaleTo.prototype._startWithTarget = function () {
    this.startScale = this.target.scale();
    this.deltaScale = PointDiff(this.scaleTo, this.startScale);
};
ScaleTo.prototype._update = function () {
    this.target.scale(PointSum(this.startScale, this.deltaScale * this.elapsed));
};
ScaleTo.prototype._reset = function () {
    /*this.scaleTo = null;
    this.startScale = null;
    this.deltaScale = null;*/
};
ScaleTo.prototype._clear = function () {
    delete this.scaleTo;
    delete this.startScale;
    delete this.deltaScale;
};
function ScaleBy() {
    Action.apply(this, arguments);
}
ScaleBy.prototype = new Action;
ScaleBy.prototype._init = function () {
    ScaleTo.prototype._init.apply(this, arguments);
};
ScaleBy.prototype._startWithTarget = function () {
    this.startScale = this.target.scale();
    this.deltaScale = this.scaleTo;
};
ScaleBy.prototype._update = function () {
    ScaleTo.prototype._update.apply(this, arguments);
};
ScaleBy.prototype._reset = function () {
    ScaleTo.prototype._reset.apply(this, arguments);
};
ScaleBy.prototype._clear = function () {
    ScaleTo.prototype._clear.apply(this, arguments);
};

function RotateTo() {
    Action.apply(this, arguments);
}
RotateTo.prototype = new Action;
RotateTo.prototype._init = function (rotateTo) {
    this.rotateTo = rotateTo;
};
RotateTo.prototype._startWithTarget = function () {
    this.startRotate = this.target.rotate();
    this.deltaRotate = PointDiff(this.rotateTo, this.startRotate);
};
RotateTo.prototype._update = function () {
    this.target.rotate(PointSum(this.startRotate, this.deltaRotate * this.elapsed));
};
RotateTo.prototype._reset = function () {
    /*this.rotateTo = null;
    this.startRotate = null;
    this.deltaRotate = null;*/
};
RotateTo.prototype._clear = function () {
    delete this.rotateTo;
    delete this.startRotate;
    delete this.deltaRotate;
};
function RotateBy() {
    Action.apply(this, arguments);
}
RotateBy.prototype = new Action;
RotateBy.prototype._init = function () {
    RotateTo.prototype._init.apply(this, arguments);
};
RotateBy.prototype._startWithTarget = function () {
    this.startRotate = this.target.rotate();
    this.deltaRotate = this.rotateTo;
};
RotateBy.prototype._update = function () {
    RotateTo.prototype._update.apply(this, arguments);
};
RotateBy.prototype._reset = function () {
    RotateTo.prototype._reset.apply(this, arguments);
};
RotateBy.prototype._clear = function () {
    RotateTo.prototype._clear.apply(this, arguments);
};
/*
TODO implement Tint
function TintTo() {
Action.apply(this, arguments);
}
TintTo.prototype = new Action;
TintTo.prototype._init = function (tintTo) {
this.tintTo = tintTo;
};
TintTo.prototype._startWithTarget = function () {
//TODO add tint support to Sprite
//this.startTint = this.target.tint();
//this.deltaTint =
};
TintTo.prototype._update = function () {
//TODO support update here
};
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
FadeTo.prototype._init = function (fadeTo) {
    this.fadeTo = fadeTo;
};
FadeTo.prototype._startWithTarget = function () {
    this.startFade = this.target.alpha();
    this.deltaFade = this.fadeTo - this.startFade;
};
FadeTo.prototype._update = function () {
    this.target.alpha(this.startFade + this.deltaFade * this.elapsed);
};
FadeTo.prototype._reset = function () {
    /*this.fadeTo = null;
    this.startFade = null;
    this.deltaFade = null;*/
};
FadeTo.prototype._clear = function () {
    delete this.fadeTo;
    delete this.startFade;
    delete this.deltaFade;
};
function FadeBy() {
    Action.apply(this, arguments);
}
FadeBy.prototype = new Action;
FadeBy.prototype._init = function () {
    FadeTo.prototype._init.apply(this, arguments);
};
FadeBy.prototype._startWithTarget = function () {
    this.startFade = this.target.alpha();
    this.deltaFade = this.fadeTo;
};
FadeBy.prototype._update = function () {
    this.target.alpha(this.startFade + this.deltaFade * this.elapsed);
};
FadeBy.prototype._reset = function () {
    FadeTo.prototype._reset.apply(this, arguments);
};

function FadeIn() {
    Action.apply(this, arguments);
}
FadeIn.prototype = new Action;
FadeIn.prototype._init = function () {
    this.fadeTo = 1;
};
FadeIn.prototype._startWithTarget = function () {
    FadeTo.prototype._startWithTarget.apply(this, arguments);
};
FadeIn.prototype._update = function () {
    FadeTo.prototype._update.apply(this, arguments);
};
FadeIn.prototype._reset = function () {
    FadeTo.prototype._reset.apply(this, arguments);
};
FadeIn.prototype._clear = function () {
    FadeTo.prototype._clear.apply(this, arguments);
};
function FadeOut() {
    Action.apply(this, arguments);
}
FadeOut.prototype._init = function () {
    this.fadeTo = 0;
};
FadeOut.prototype._startWithTarget = function () {
    FadeIn.prototype._startWithTarget.apply(this, arguments);
};
FadeOut.prototype._update = function () {
    FadeIn.prototype._update.apply(this, arguments);
};
FadeOut.prototype._reset = function () {
    FadeTo.prototype._reset.apply(this, arguments);
};
FadeOut.prototype._clear = function () {
    FadeTo.prototype._clear.apply(this, arguments);
};

function Delay() {
    Action.apply(this, arguments);
}
Delay.prototype = new Action;

function Sequence() {
    Action.apply(this, arguments);
}
Sequence.prototype = new Action;
Sequence.prototype._init = function () {
    this.actions = function () {
        var _actions = [];
        return function (actions) {
            return actions === undefined ? _actions : _actions = actions;
        }
    }();
    forEach(arguments, function (action) {
        this.actions().push(action);
    });
};
Sequence.prototype.getRunningAction = function () {
    var actions = this.actions();
    for (var i = actions.length - 1; i >= 0; i--) {
        if (actions[i].hasDone()) {
            actions.splice(i, 1);
        }
    }
    return actions.length && actions[0];
};
Sequence.prototype.hasDone = function () {
    return this.actions().length;
};
function Repeat() {
    Action.apply(this, arguments);
}
Repeat.prototype = new Action;
Repeat.prototype._init = function (action, repeatTotal) {
    this.action = action;
    this.repeatTotal = repeattotal;
    this.hasRepeat = 0;
};
Repeat.prototype._update = function () {
    this.action._update.apply(this, arguments);
};
/*
Repeat.prototype.getRunningAction = function () {
return this.action;
};*/
Repeat.prototype.hasDone = function () {
    return this.action.hasDone();
};
Repeat.prototype._reset = function () {};
Repeat.prototype._clear = function () {
    this.actions(null);
};

function Spawn() {}
Spawn.prototype = new Action;
Spawn.prototype._init = function () {
    this.actions = function () {
        var _actions = [];
        return function (actions) {
            return actions === undefined ? _actions : _actions = actions;
        };
    }();
    forEach(arguments, function (action) {
        this.actions().push(action);
    })
};
Spawn.prototype._update = function () {
    var arg = arguments;
    forEach(this.actions(), function (action) {
        action.update.apply(action, arg);
    });
};
function RepeatForever() {}
