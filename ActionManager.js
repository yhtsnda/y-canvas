function ActionManger() {
    this.init(arguments);
}
ActionManager.prototype = new BaseObject;
ActionManger.prototype.init = function () {
    this.exec('onInit');
    this.addActionManagerSupport();
    
    this.exec('afterInit');
};
ActionManger.prototype.clear = function () {
    this.exec('onClear');
    this.exec('removeActionManagerSupport');
    this.exec('afterClear');
};
ActionManager.prototype.removeActionManagerSupport = function () {
    delete this.actionsWithoutEmpty;
    delete this.addAction;
    delete this.resetActions;
    this.actions(null);
    delete this.actions;
};
ActionManager.prototype.addActionManagerSupport = function () {
    this.actions = function () {
        var _actions = [];
        return function (actions) {
            return actions === undefined ? _actions : _actions = actions;
        };
    };
    this.actionsWithoutEmpty = function () {
        return this.actions() && this.actions().removeNullVal();
    };
    this.addAction = function (action) {
        return (this.actions() || this.resetActions()).push(action) && this.actions();
    };
    this.resetActions = function () {
        return this.actions([]);
    };
    this.currentAction = function () {
        return null;
    };
    this.getNextAction = function () {};
};
