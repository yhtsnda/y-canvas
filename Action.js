function Action(duration, callback) {
    this.duration = duration;
    this.isDone = false;
    this.elapsed = 0;
    this.callback = callback;
    this.init(arguments);
}
Action.prototype = new BaseObject;
Action.prototype.step = function (dt) {
    this.elapsed = Math.min(this.duration, this.elapsed + dt);
    if (this.elapsed >= this.duration) {
        this.done();
    } else {
        this.update();
    }
};
Action.prototype.done = function () {
    this.isDone = true;
    if (this.callback) {
        this.callback();
        this.callback = null;
    }
};
Action.prototype.init = function () {
    this.exec('onInit', arguments);
    this.exec('_init', Array.prototype.slice.call(arguments, 2));
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
function MoveBy() {
    Action.apply(this, arguments);
}
MoveBy.prototype = new Action;
MoveBy.prototype._init = function () {
    MoveTo.apply(this, arguments);
};
MoveBy.prototype._startWithTarget = function () {
    this.startPosition = this.target.position();
    this.deltaPosition = this.toPosition;
};
MoveBy.prototype._update = function () {
    MoveTo.prototype._update.apply(this, arguments);
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
function Delay() {
    Action.apply(this,arguments);
}
Delay.prototype = new Action;

function Sequence() {}
function Repeat() {}
function Spawn() {}
function RepeatForever() {}