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
    this.exec('_render', context);
    this.exec('afterRender', context);
};
