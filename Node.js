var tag=0;
function Node() {
    this.tag=tag+++0;
    this.width = prop(0);
    this.height = prop(0);
    this.position = prop(PointMake(0, 0));
    this.actualPosition = function() {
        return this.parent() ? PointSum(this.position(), this.parent().actualPosition()) : this.position();
    };
    this.rect = prop(PointMake(0, 0));
    this.visible = prop(false);
    this.display = prop(true);
    this.images = prop([]);
    this.imageSizes = prop([]);
    this.imageIndex = prop(0);
    this.getImage = function() {
        return this.images()[this.imageIndex()];
    };
    this.zIndex = prop(0);
    this.alpha = prop(1);
    this.anchor = prop(PointMake(0.5, 0.5));
    this.rotate = prop(0);
    this.scale = prop(PointMake(1, 1));
    this.skew = prop(PointMake(0, 0));
    this.transform = prop();
    this.pause = prop();
    this.stop = function() {
        this.pause(true);
    };
    this.resume = function() {
        this.pause(false);
    };
    this.parent = prop(null);
    this.children = prop([]);
    this.childrenWithoutEmpty = function() {
        return this.children() && this.children().removeNullVal();
    };
    this.resetChildren = function() {
        forEach(this.children, function(child) {
            exec(child, 'parent', null);
        });
        return this.children([]);
    };
    this.clearChildren = function() {
        forEach(this.children, function(child) {
            exec(child, 'parent', null);
        });
        return this.children(null);
    };
    this.getChildByTag = function() {
        var children = this.children();
        for (var i = 0; i < children.length; i++) {
            if (children[i] && children[i].tag == tag) {
                return children[i];
            }
        }
    };
    this.removeChild = function(toRemove){
        forEach(this.children(), function(child, index, children){
            if(child === toRemove){
                exec(children.splice(index, 1)[0], parent, null);
                return true;
            }
        });
        return this;
    };
    this.addChild = function(child) {
        exec(child, 'parent', this);
        this.children().push(child);
        return this;
    };
    this.removeLastChild = function() {
        exec(this.children().pop(), 'parent', null);
        return this;
    };
    this.updateChildren = function(context) {
        var children = this.children();
        /*children.sort(function(a, b) {
            return a && b && b.zIndex && a.zIndex && a.zIndex() - b.zIndex();
        });*/
        for (var i = children.length - 1; i >= 0; i--) {
            if (children[i] === null || children[i].destoryed) {
                children.splice(i, 1);
            }
        }
        for (var i = 0; i < children.length; i++) {
            children[i].update(context);
        }
        return this;
    };
    this.actionManager = new ActionManager(this);
    var me = this;
    forEach(["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseenter", "mouseleave", "keydown", "keypress", "keyup", "touchstart", "touchmove", "touchend", "touchcancel"], function(e) {
        me['on' + e] = [];
    });
    this.runAction = function() {
        exec(this.actionManager, 'runAction', arguments);
    };
    arguments.length ? exec(this, 'init', arguments) : exec(this, 'init');
}