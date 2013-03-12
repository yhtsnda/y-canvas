function Layer(){
	this.init();
}
Layer.prototype = new BaseNode;
Layer.prototype.init = function(){
	Node.apply(this,arguments);
	this.children([]);
	this.resume();
	this.onInit();
};
Layer.prototype.clear = function(){
	this.onClear();
	this.unSubscribe();
	this.children().forEach(function(child){
		child.clear();
	});
};
Layer.prototype.onInit = function(){};
Layer.prototype.onClear = function(){};
Layer.prototype.children = function(children){
	return children == null ? this._children: this._children = children;
};
Layer.prototype.removeChild = function(child){
	this.children().some(function(_child,index,children){
		if(_child === child){
			children[index] = null;
			return true;
		}
	});
	//this.children().removeNullVal();
};
Layer.prototype.removeChildByTag = function(tag){
	for(var i=0;i<this.children().length;i++){
		if(this.children()[i].tag === tag){
			this.removeChild(this.children()[i]);
			break;
		}
	}
};
Layer.prototype.pause = function(paused){
	return paused == null ? this._paused : this._paused = paused;
};
Layer.prototype.stop = function(paused){
	this.pause(paused);
};
Layer.prototype.resume = function(){
	this.pause(false);
};
Layer.prototype.update = function(context){
	Debugger.assert(this.children() != null);
	this.children().removeNullVal().sort(function(a,b){
		return a.index() > b.index();
	}).forEach(function(child){
		child.update(context || getContext());
	});
};
Layer.prototype.render = function(context){
	context = context ||
};