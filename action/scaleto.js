define('action/scaleto', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
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
    return ScaleTo;
});