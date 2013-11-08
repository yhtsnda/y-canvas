define('action/fadeto', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
    function FadeTo() {
        Action.apply(this, arguments);
    }
    FadeTo.prototype = mix(new Action, {
        init: function() {
            this.fadeTo = shift(arguments);
            Action.prototype.init.apply(this, arguments);
        },
        _startWith: function() {
            this.deltaFade = (this.fadeTo - this.target.alpha) / (this.duration / 16.67);
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
    return FadeTo;
});