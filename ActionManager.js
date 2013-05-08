function ActionManager() {
	this.init.apply(this, arguments);
}
ActionManager.prototype = new BaseObject;
ActionManager.prototype.init = function (target) {
	this.exec('onInit');
	this.target = target;
    this.addActionManagerSupport();
	this.exec('_init');
	this.exec('afterInit');
};
ActionManager.prototype.clear = function () {
	this.exec('onClear');
	this.exec('removeActionManagerSupport');
	this.exec('afterClear');
};
ActionManager.prototype.removeActionManagerSupport = function () {
	this.actions(null);
    for(var prop in this){
        this[prop]=null;
    }
};
ActionManager.prototype.addActionManagerSupport = function () {
	this.actions = function () {
		var _actions = [];
		return function (actions) {
			return actions === undefined ? _actions : _actions = actions;
		};
	}();
	this.actionsWithoutEmpty = function () {
		return this.actions() && this.actions().removeNullVal();
	};
	this.addAction = function (action) {
		return (this.actions() || this.resetActions()).push(action),
		this.actions();
	};
	this.resetActions = function () {
		return this.actions([]);
	};
	this.currentAction = null;
	this.getNextAction = function () {
        var action = null;
		forEach(this.actions(), function (action, index) {
			if (!action.isDone()) {
                return true;
            }
		});
        return action;
	};
    this.runAction = function(action){
        
    };
	this.actionIndex = function () {
		var _actionIndex = 0;
		return function (actionIndex) {
			return actionIndex === undefined ? _actionIndex : _actionIndex = actionIndex;
		}
	}();
};
ActionManager.prototype.update = function () {
	var hasNull = false;
	forEach(this.actions(), function (action, index, actions) {
		if (!action.hasDone()) {
			action.update();
			return true;
		} else {
			actions[index] = null;
			hasNull = true;
		}
	});
	if (hasNull) {
		this.actions().removeNullVal();
	}
};
