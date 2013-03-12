function Scene() {
	this.init();
}

Scene.prototype = new BaseNode;
Scene.prototype.init = function(){
	var _layers = [];
	this.getLayers = function(){
		return _layers;
	};
	this.resetLayers = function(){
		return _layers = [];
	};
	this.clearLayers = function(){
		_layers = null;
	};
	this.getLayerByTag = function(){
		for (var i = 0; i < _layers.length; i++) {
			if (_layers[i] && _layers[i].tag == tag) {
				return _layers[i];
			}
		}
	};
	this.addLayer = function (layer) {
		_layers.push(layer);
	};
	
	this.removeLastLayer = function () {
		_layers.pop();
	};	
};
Scene.prototype.clear = function(){
	this.unSubscribe();
	this.getLayers().forEach(function(layer){
		layer && layer.clear && layer.clear();
	});
	this.clearLayers();
	for (var prop in this) {
		this[prop] = null;
		delete this[prop];
	}
};
Scene.prototype.update = function(context){
	this.getLayers() && this.getLayers().removeNullVal().sort(function (a, b) {
		return a.index > b.index;
	}).forEach(function (layer) {
		layer.update(context || getContext());
	});
};
Scene.prototype.pause = function(){
	this.getLayers() && this.getLayers().forEach(function (layer) {
		layer.pause();
	});
};
Scene.prototype.stop = function(){
	this.pause();
};
Scene.prototype.resume = function(){
	this.getLayers() && this.getLayers().forEach(function (layer) {
		layer.resume();
	});
};
Scene.prototype.handleEvent = function (event) {
	this.getLayers() && this.getLayers().some(function(layer){
		return layer.handleEvent(event);
	});
};


