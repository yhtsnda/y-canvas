define('action/moveby', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
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
    return MoveBy;
});