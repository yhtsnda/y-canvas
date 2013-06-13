function Layer() {
    Node.apply(this, arguments);
}
Layer.prototype = new BaseObject;
Layer.prototype.init = function (width, height) {
    this.width(width || getDom().width);
    this.height(height || getDom().height);
    this.exec('onInit');
    this.exec('resume');
    this.exec('afterInit');
};
Layer.prototype.clear = function () {
    this.exec('onClear');
    this.unSubscribe();
    this.children().forEach(function (child) {
        exec(child, 'clear');
    });
    this.exec('afterClear');
};
Layer.prototype.handleEvent = function () {
    this.exec('onHandleEvent');
    EventSystem.handleEventWithTarget(this);
    this.exec('_handleEvent');
    this.exec('afterHandleEvent');
};
/*
Layer.prototype.removeChild = function (child) {
    this.children().some(function (_child, index, children) {
        if (_child === child) {
            children.splice(index, 1);
            return true;
        }
    });
}; */
/* Layer.prototype.removeChildByTag = function (tag) {
    this.children().some(function (child, index, children) {
        if (child.tag === tag) {
            children.splice(index, 1);
            return true;
        }
    });
}; */
Layer.prototype.update = function (context) {
    this.handleEvent(context);
    this.exec('onUpdate', context);
    this.exec('_update', context);
    this.updateChildren(context);
    this.render(context);
    this.exec('afterUpdate', context);
};

Layer.prototype.render = function (context) {
    this.exec('onRender', context);
    /* this.children() && this.children().forEach(function (child, index) {
        child.render(context || getContext());
    }); */
    this.exec('_render', context);
    this.exec('afterRender', context);
};
