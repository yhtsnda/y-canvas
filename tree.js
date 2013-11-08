define('tree', [], function() {
    return {
        init: function() {
            this.children = [];
            this.parent = null;
        },
        addChild: function(child) {
            try {
                child.parent = this;
                this.children.push(child);
            } catch (e) {
                console.log(e);
            }
            return this;
        },
        addChildAt: function(child, index) {
            try {
                child.parent = this;
                var children = this.children;
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
        },
        getChildAt: function(index) {
            return this.children[index];
        },
        replaceChildAt: function(child, index) {
            var children = this.children,
                old = children[index];
            try {
                child.parent = this;
                children[index] = child;
            } catch (e) {
                console.log(e.stack);
            }
            return old;
        },
        removeFromParent: function() {
            try {
                this.parent.removeChild(this);
            } catch (e) {
                console.log(e.stack);
            }
            return this;
        },
        removeChild: function(toRemove) {
            var children = this.children;
            if (typeof(toRemove) === "number") {
                toRemove = children[toRemove];
                if (!toRemove) {
                    return;
                }
            }
            forEach(children, function(child, index, children) {
                if (child === toRemove) {
                    children.splice(index, 1);
                    return true;
                }
            });
            return toRemove;
        },
        removeChildren: function() {
            return this.children.splice(0);
        },
        getChildByTag: function(tag) {
            var children = this.children;
            for (var i = 0; i < children.length; i++) {
                if (children[i] && children[i].tag == tag) {
                    return children[i];
                }
            }
        },
        updateChildren: function(context) {
            var children = this.children;
            if (!children) {
                return;
            }
            children.sort(function(a, b) {
                return -a.zIndex() + b.zIndex();
            });
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child && child.update) {
                    child.update(context);
                } else {
                    children.splice(i, 1);
                }
            }
            return this;
        }
    }
});