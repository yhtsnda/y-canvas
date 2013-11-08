define('actionManager', ['base', 'mix', 'prop'], function(BaseObject, mix, prop) {
    function ActionManager() {
        this.init.apply(this, arguments);
    }
    ActionManager.prototype = mix(BaseObject, {
        init: function(target){
            this.target = target;
            this.actions = [];
            this.actionIndex = 0;
            return this;
        },
        addAction: function(action) {
            this.actions.push(action);
            return this;
        },
        removeAction: function(action){
            var actions = this.actions;
            for (var i = 0; i < actions.length; i++) {
                var existed = actions[i];
                if(existed === action){
                    actions.splice(i, 1);
                    existed.target = null;
                    break;
                }
            };
        },
        resetActions: function(){
            this.actions.length = 0;
            return this;
        },
        runAction: function(action){
            this.addAction(action);
            action.startWith(this.target);
            return this;
        },
        update: function(time){
            for (var i = 0; i < this.actions.length; i++) {
                var action = this.actions[i];
                if(!action || action.done){
                    action && action.finish();
                    continue;
                }else{
                    action.step(time || 1000 / 60);
                }
            }
        }
    });
    return ActionManager;
});