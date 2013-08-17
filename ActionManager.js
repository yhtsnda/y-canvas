function ActionManager() {
    this.init.apply(this, arguments);
}
ActionManager.prototype = new BaseObject;
ActionManager.prototype.init = function(target) {
    this.exec('onInit');
    this.target = target;
    this.addActionManagerSupport();
    this.exec('_init');
    this.exec('afterInit');
    return this;
};
ActionManager.prototype.clear = function() {
    this.exec('onClear');
    this.removeActionManagerSupport();
    this.exec('afterClear');
    return this;
};
ActionManager.prototype.removeActionManagerSupport = function() {
    forEach(this.actions(),function(action){
        exec(action, 'clear');
    });
    this.actions(null);
    for (var prop in this) {
        if(this.hasOwnProperty(prop)){
            delete this[prop];
        }
    }
};
ActionManager.prototype.addActionManagerSupport = function() {
    this.actions = prop([]);
    this.actionsWithoutEmpty = function() {
        return this.actions() && this.actions().removeNullVal();
    };
    this.addAction = function(action) {
        return (this.actions() || this.resetActions()).push(action),
        this.actions();
    };
    this.resetActions = function() {
        return this.actions([]);
    };
    this.runAction = function(action) {
        this.actions().push(action);
        action.startWithTarget(this.target);
    };
    this.actionIndex = prop(0);
};
ActionManager.prototype.update = function() {
    var hasNull = false;
    forEach(this.actions(), function(action, index, actions) {
        if (!action.done()) {
            action.step(1000 / 60);
            return true;
        } else {
            exec(action, 'emitCallback');
            exec(action, 'clear');
            actions[index] = null;
            hasNull = true;
        }
    });
    if (hasNull) {
        this.actions().removeNullVal();
    }
};