define('action/scaleby', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
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
    return ScaleBy;
});