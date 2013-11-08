define('action/sequence', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
    function Sequence() {
        Action.apply(this, arguments);
    }
    Sequence.prototype = mix(new Action, {
        init: function() {
            this.children = shift(arguments) || [];
            for (var i = 0; i < arguments.length; i++) {
                var callback = arguments[i];
                if (callback) {
                    this.callback.push(callback);
                }
            };
        },
        check: function() {
            var action = this.children[0];
            if (action.check()) {
                this.children.shift();
                this.elapsed = 0;
            }
            if (!this.children.length) {
                this.finish();
            }
            return this.children.length;
        },
        update: function(dt) {
            if(!this.paused){
                this.currentTime(dt);
                var action = this.children[0];
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
    return Sequence;
});