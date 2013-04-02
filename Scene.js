function Scene() {
	this.init();
}

Scene.prototype = new BaseObject;
Scene.prototype.init = function(){
    Node.apply(this,arguments);
	this.layers = (function(){
		var _layers = [];
		return function(layers){
			return layers === undefined ? _layers : _layers = layers;
		}
	})();
	this.layersWithoutEmpty = function(){
		return this.layers() && this.layers().removeNullVal();
	};
	this.resetLayers = function(){
		return this.layers([]);
	};
	this.clearLayers = function(){
		return this.layers(null);
	};
	this.getLayerByTag = function(){
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
		var layers = this.layers();
		return layers && layers.pop() && layers;
	};	
};
Scene.prototype.clear = function(){
	this.unSubscribe();
	this.layers().forEach(function(layer){
		BaseObject.prototype.exec.call(layer,'clear');
		//layer && layer.clear && layer.clear();
	});
	this.clearLayers();
	for (var prop in this) {
		this[prop] = null;
		delete this[prop];
	}
};
Scene.prototype.update = function(context){
	var layers = this.layersWithoutEmpty();
	layers && layers.sort(function (a, b) {
		return a.index > b.index;
	}).forEach(function (layer) {
		layer.update(context || getContext());
	});
};
Scene.prototype.pause = function(){
	var layers = this.layers();
	layers && layers.forEach(function (layer) {
		layer.pause();
	});
};
Scene.prototype.stop = function(){
	this.pause();
};
Scene.prototype.resume = function(){
	var layers = this.layers();
	layers && layers.forEach(function (layer) {
		layer.resume();
	});
};
Scene.prototype.handleEvent = function (event) {
	var layers = this.layers();
	layers && layers.some(function(layer){
		return layer.handleEvent(event);
	});
};


