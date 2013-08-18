function BaseObject() {}
BaseObject.prototype.publish = function() {
    MessageCenter.onPublish.apply(MessageCenter, arguments);
};
BaseObject.prototype.subscribe = function(topic, handler) {
    MessageCenter.onSubscribe(topic, handler, this);
};
BaseObject.prototype.unSubscribe = function(topic, handler) {
    MessageCenter.onUnSubscribe(this, topic, handler);
};
BaseObject.prototype.exec = function(func) {
    exec.apply(null, this, func, Array.prototype.slice(1));
};
BaseObject.prototype.addChild = function(child) {
    try {
        child.parent(this);
        this.children().push(child);
    } catch (e) {
        console.log(e);
    }
    return this;
};
BaseObject.prototype.addChildAt = function(child, index) {
    try {
        child.parent(this);
        var children = this.children();
        if (children[index]) {
            for (var i = children.length - 1; i >= index; i--) {
                children[i + 1] = children[i];
            };
        }
        children[index] = child;
    } catch (e) {
        console.log(e.stack);
    }
    return this;
};
BaseObject.prototype.getChildAt = function(index) {
    return this.children()[index];
};
BaseObject.prototype.replaceChildAt = function(child, index) {
    try {
        child.parent(this);
        this.children()[index] = child;
    } catch (e) {
        console.log(e.stack);
    }
    return this;
};
BaseObject.prototype.remove = function() {
    try {
        this.parent().removeChild(this);
    } catch (e) {
        console.log(e.stack);
    }
    return this;
};
BaseObject.prototype.removeChild = function(toRemove, clear) {
    forEach(this.children(), function(child, index, children) {
        if (child === toRemove) {
            exec(child, 'parent', null);
            children[index] = null;
            clear && exec(toRemove, 'clear');
            return true;
        }
    });
    return this;
};
BaseObject.prototype.removeChildAt = function(index, clear) {
    this.removeChild(this.children()[index], clear);
    return this;
};
BaseObject.prototype.resetChildren = function() {
    forEach(this.children(), function(child) {
        exec(child, 'parent', null);
    });
    return this.children([]);
};
BaseObject.prototype.clearChildren = function() {
    forEach(this.children(), function(child) {
        exec(child, 'clear');
    });
    return this.children(null);
};
BaseObject.prototype.getChildByTag = function() {
    var children = this.children();
    for (var i = 0; i < children.length; i++) {
        if (children[i] && children[i].tag == tag) {
            return children[i];
        }
    }
};
BaseObject.prototype.updateChildren = function(context) {
    var children = this.children();
    if (!children) {
        return;
    }
    children.sort(function(a, b) {
        return a.zIndex() - b.zIndex();
    });
    for (var i = 0; i < children.length; i++) {
        try {
            children[i].update(context);
        } catch (e) {
            console.log(e.stack);
        }
    }
    children.removeNullVal();
    return this;
};