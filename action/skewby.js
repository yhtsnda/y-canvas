define('action/skewby', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
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
    return SkewBy;
});