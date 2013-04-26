function Scene() {
    Node.apply(this, arguments);
}

Scene.prototype = new BaseObject;
Scene.prototype.init = function () {
    this.exec('onInit', arguments);
    this.layers = (function () {
        var _layers = [];
        return function (layers) {
            return layers === undefined ? _layers : _layers = layers;
        }
    })();
    this.layersWithoutEmpty = function () {
        return this.layers() && this.layers().removeNullVal();
    };
    this.resetLayers = function () {
        return this.layers([]);
    };
    this.clearLayers = function () {
        return this.layers(null);
    };
    this.getLayerByTag = function () {
        var layers = this.layers();
        for (var i = 0; i < layers.length; i++) {
            if (layers[i] && layers[i].tag == tag) {
                return layers[i];
            }
        }
    };
    this.addLayer = function (layer) {
        var layers = this.layers() || this.resetLayers();
        return layers.push(layer) && layers;
    };
    this.removeLastLayer = function () {
        if (this.layers()) {
            this.layers().pop();
        }
        return this.layers();
    };
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
    var layers = this.layersWithoutEmpty();
    layers && layers.sort(function (a, b) {
        return a.index - b.index;
    }).forEach(function (layer) {
        layer.update(context || getContext());
    });
    this.exec('_update', arguments);
    this.exec('afterUpdate', arguments);
};
Scene.prototype.pause = function () {
    this.exec('onPause', arguments);
    var layers = this.layers();
    layers && layers.forEach(function (layer) {
        exec(layer, 'pause');
    });
    this.exec('_pause', arguments);
    this.exec('afterPause', arguments);
};
Scene.prototype.stop = function () {
    this.pause();
};
Scene.prototype.resume = function () {
    var layers = this.layers();
    layers && layers.forEach(function (layer) {
        exec(layer, 'resume');
    });
};
Scene.prototype.handleEvent = function (event) {
    var layers = this.layers();
    layers && layers.some(function (layer) {
        return layer.handleEvent(event);
    });
};
