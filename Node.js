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
Node.prototype.removeFromParent = function() {
    try {
        this.parent().removeChild(this);
    } catch (e) {
        console.log(e);
    }
};
Node.prototype.childrenWithoutEmpty = function() {
    return this.children() && this.children().removeNullVal();
};
Node.prototype.resetChildren = function() {
    forEach(this.children, function(child) {
        exec(child, 'parent', null);
    });
    return this.children([]);
};
Node.prototype.clearChildren = function() {
    forEach(this.children(), function(child) {
        exec(child, 'clear');
    });
    return this.children(null);
};
Node.prototype.getChildByTag = function() {
    var children = this.children();
    for (var i = 0; i < children.length; i++) {
        if (children[i] && children[i].tag == tag) {
            return children[i];
        }
    }
};
Node.prototype.removeChild = function(toRemove) {
    forEach(this.children(), function(child, index, children) {
        if (child === toRemove) {
            exec(children.splice(index, 1)[0], parent, null);
            return true;
        }
    });
    return this;
};
Node.prototype.remove = function() {
    try {
        this.parent().removeChild(this);
    } catch (e) {}
};
Node.prototype.addChild = function(child) {
    exec(child, 'parent', this);
    this.children().push(child);
    return this;
};
Node.prototype.removeLastChild = function() {
    exec(this.children().pop(), 'parent', null);
    return this;
};
Node.prototype.updateChildren = function(context) {
    var children = this.children();
    if (!children) {
        return;
    }
    children.sort(function(a, b) {
        return a.zIndex() - b.zIndex();
    });
    for (var i = 0; i < children.length; i++) {
        children[i].update(context);
    }
    return this;
};
Node.prototype.runAction = function() {
    exec(this.actionManager, 'runAction', arguments);
};
Node.prototype.clear = function() {
    exec(this, 'unSubscribe');
    exec(this.actionManager, 'clear');
    this.clearChildren();
    this.removeFromParent();
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
    return this.parent() ? PointSum(this.position(), this.parent().actualPosition()) : this.position();
};