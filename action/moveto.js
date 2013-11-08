define('action/moveto', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
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
    return MoveTo;
});