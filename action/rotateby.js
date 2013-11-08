define('action/rotateby', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
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
    return RotateBy;
});