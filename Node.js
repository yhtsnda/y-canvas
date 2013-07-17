function Node() {
    this.width = prop(0);
    this.height = prop(0);
    this.position = prop(PointMake(0, 0));
    this.rect = prop(PointMake(0, 0));
    //this.visible = prop(true);
    this.display = (function(){
        var _display = true;
        return function(display){
            display !== undefined && (_display = display);
            return _display && ((this.parent() && this.parent().display) ? this.parent().display() : true);
        };
    });
    this.images = propArray();
    this.imageSizes = propArray();
    this.imageIndex = prop(0);
    this.zIndex = prop(0);
    this.alpha = (function(){
        var _alpha = 1;
        return function(alpha){
            alpha !== undefined && (_alpha = alpha);
            return _alpha * ((this.parent() && this.parent().alpha) ? this.parent().alpha() : 1);
        };
    })();
    this.anchor = prop(PointMake(0.5, 0.5));
    this.rotate = prop(0);
    this.scale = prop(PointMake(1, 1));
    this.skew = prop(PointMake(0, 0));
    this.transform = prop();
    this.pause = prop();

    this.parent = prop(null);
    this.children = propArray();
    this.actionManager = new ActionManager(this);
    forEach(["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseenter", "mouseleave", "keydown", "keypress", "keyup", "touchstart", "touchmove", "touchend", "touchcancel"], function(e) {
        this['on' + e] = [];
    }, this);
    arguments.length ? exec(this, 'init', arguments) : exec(this, 'init');
}
Node.prototype = new BaseObject;

Node.prototype.stop = function() {
    this.pause(true);
};
Node.prototype.resume = function() {
    this.pause(false);
};
Node.prototype.runAction = function() {
    exec(this.actionManager, 'runAction', arguments);
};
Node.prototype.clear = function() {
    this.unSubscribe();
    exec(this.actionManager, 'clear');
    this.remove();
    this.clearChildren();
    for (var prop in this) {
        delete this[prop];
    }
    return this;
};

Node.prototype.getImage = function() {
    return this.images()[this.imageIndex()];
};
Node.prototype.actualPosition = function() {
    return (this.parent() && this.parent().actualPosition) ? PointSum(this.position(), this.parent().actualPosition()) : this.position();
};