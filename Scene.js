function Scene() {
    Node.apply(this, arguments);
}
Scene.prototype = mixIn(Node.prototype, {});
Scene.prototype.init = function() {
    this.exec('onInit', arguments);
    this.exec('_init', arguments);
    this.exec('afterInit', arguments);
};
Scene.prototype.update = function(context) {
    //this.handleEvent(context);
    this.exec('onUpdate', arguments);
    this.updateChildren(context);
    this.exec('_update', arguments);
    this.exec('afterUpdate', arguments);
};
Scene.prototype.pause = function() {
    this.exec('onPause', arguments);
    var children = this.children();
    children && children.forEach(function(child) {
        exec(child, 'pause');
    });
    this.exec('_pause', arguments);
    this.exec('afterPause', arguments);
};
Scene.prototype.stop = function() {
    this.pause();
};
Scene.prototype.resume = function() {
    forEach(this.children(), function(child, index, children) {
        exec(child, 'resume');
    });
};