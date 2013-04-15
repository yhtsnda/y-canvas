function Layer() {
	Node.apply(this, arguments);
}
Layer.prototype = new BaseObject;
Layer.prototype.init = function () {
	this.exec('onInit');
	this.exec('resume');
	this.exec('afterInit');
};
Layer.prototype.clear = function () {
	this.exec('onClear');
	this.unSubscribe();
	this.children().forEach(function (child) {
		exec.call(child,'clear');
	});
    this.exec('afterClear');
};
Layer.prototype.handleEvent = function () {
	this.exec('onHandleEvent');
	this.exec('afterHandleEvent');
};
Layer.prototype.removeChild = function (child) {
	this.children().some(function (_child, index, children) {
		if (_child === child) {
			children.splice(index, 1);
			return true;
		}
	});
};
Layer.prototype.removeChildByTag = function (tag) {
    this.children().some(function (child, index, children) {
		if (child.tag === tag) {
			children.splice(index, 1);
			return true;
		}
	});
};
Layer.prototype.update = function (context) {
	this.exec('onUpdate');
	this.children().removeNullVal().sort(function (a, b) {
		return a.index() > b.index();
	}).forEach(function (child) {
		child.update(context || getContext());
	});
	this.exec('afterUpdate');
};
Layer.prototype.render = function (context) {
	this.exec('onRender');
	this.children() && this.children().forEach(function (child, index) {
		child.render(context || getContext());
	});
	this.exec('afterRender');
};
