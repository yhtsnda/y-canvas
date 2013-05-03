function Scene() {
    Node.apply(this, arguments);
}

Scene.prototype = new BaseObject;
Scene.prototype.init = function () {
    this.exec('onInit', arguments);
    
    this.exec('_init', arguments);
    this.exec('afterInit', arguments);
};
Scene.prototype.clear = function () {
    this.exec('onClear', arguments);
    this.unSubscribe();
    this.layers().forEach(function (layer) {
        exec(layer, 'clear');
    });
    this.clearLayers();
    for (var prop in this) {
        delete this[prop];
    }
    this.exec('_clear', arguments);
    this.exec('afterClear', arguments);
};
Scene.prototype.update = function (context) {
    this.exec('onUpdate', arguments);
    /*var layers = this.layersWithoutEmpty();
    layers && layers.sort(function (a, b) {
        return a.index - b.index;
    }).forEach(function (layer) {
        layer.update(context || getContext());
    });*/
    var children = this.children();
    children.sort(function (a, b) {
    	return b.index - a.index;
    });
    var len = children.length;
    for (var i = len - 1; i >= 0; i--) {
    	if (children[i] === null || children[i].destoryed) {
    		len--;
    		children[i] = children[len];
    		continue;
    	}
    	children[i].update(context);
    }
    children.length = len;
    this.exec('_update', arguments);
    this.exec('afterUpdate', arguments);
};
Scene.prototype.pause = function () {
    this.exec('onPause', arguments);
    var children = this.children();
    children && children.forEach(function (child) {
        exec(child, 'pause');
    });
    this.exec('_pause', arguments);
    this.exec('afterPause', arguments);
};
Scene.prototype.stop = function () {
    this.pause();
};
Scene.prototype.resume = function () {
    forEach(this.children(), function (child, index, children) {
        exec(child, 'resume');
    });
};
Scene.prototype.handleEvent = function (event) {
    var children = this.children();
    children && children.some(function (child) {
        return child.handleEvent(event);
    });
};
