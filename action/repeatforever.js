define('action/repeatforever', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
    function RepeatForever() {
        Action.apply(this, arguments);
    }
    RepeatForever.prototype = mix(new Action, {
        init: function() {
            this.action = action;
        },
        check: function() {
            if (this.elapsed >= this.duration) {
                this.finish();
            }
            return false;
        },
        update: function() {
            if (!this.paused) {
                this.currentTime(dt);
                var action = this.action;
                if (action) {
                    if (!action.target) {
                        action.startWith(this.target);
                    }
                    action.update.apply(action, arguments);
                }
                this.check();
            }
            return this;
        }
    });
    return RepeatForever;
});