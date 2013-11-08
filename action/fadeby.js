define('action/fadeby', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
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
    return FadeBy;
});