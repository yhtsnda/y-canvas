function Action(){
	this.duration = null;
	this.isDone = function(){};
	this.exec('init');
}
Action.prototype = new BaseObject;
Action.prototype.init = function(){
	this.exec('onInit');
};