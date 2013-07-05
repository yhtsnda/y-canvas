//var tag=0;
//var isChrome = navigator.userAgent.indexOf('Chrome') > -1;

function Node() {
    //this.tag=tag+++0;
    this.width = prop(0);
    this.height = prop(0);
    this.position = prop(PointMake(0, 0));
    this.rect = prop(PointMake(0, 0));
    this.visible = prop(false);
    this.display = prop(true);
    this.images = propArray();
    this.imageSizes = propArray();
    this.imageIndex = prop(0);
    this.zIndex = prop(0);
    this.alpha = prop(1);
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
    exec(this, 'unSubscribe');
    exec(this.actionManager, 'clear');
    this.remove();
    this.clearChildren();
    var me = this;
    requestAnimFrame(function() {
        for (var prop in me) {
            delete me[prop];
        }
    });
    return this;
};

Node.prototype.getImage = function() {
    return this.images()[this.imageIndex()];
};
Node.prototype.actualPosition = function() {
    return (this.parent() && this.parent().actualPosition) ? PointSum(this.position(), this.parent().actualPosition()) : this.position();
};