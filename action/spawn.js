define('action/spawn', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {
    function Spawn() {
        Action.apply(this, arguments);
    }
    Spawn.prototype = mix(new Action, {
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
            var actions = this.children;
            for (var i = actions.length - 1; i >= 0; i--) {
                var action = actions[i];
                if(action.check()){
                    actions.splice(i, 1);
                }
            };
            if(!actions.length){
                this.finish();
            }
            return this.children.length;
        },
        update: function(dt){
            if(!this.paused){
                this.currentTime(dt);
                var actions = this.children;
                for (var i = 0; i < actions.length; i++) {
                    var action = actions[i];
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
    return Spawn;
});