function getContext(){
	return Global().app.getContext();
}
function getDom(){
	return Global().app.dom;
}
function Application(){
	this.initial(arguments[0]);
}
Application.prototype.getContext = function(){
	return this.dom.getContext(this.supportOpenGLES()?'opengles':'2d');
};
Application.prototype.supportOpenGLES = function(){
	return false;
};
Application.prototype.run = function(){
	this.pause(false);
	EventSystem.initial();
	this._update();
};
Application.prototype.pause = function(pause){
	return pause != undefined ? (function(pause){
		this.currentScene() && this.currentScene().pause(pause);
		this.nextScene() && this.nextScene().pause(pause);
		return this._paused = pause;
	}).call(this,pause) : this._paused;
};
Application.prototype.stop = function(){
	this.pause(true);
};
Application.prototype.resume = function(){
	this.pause(false);
};
Application.prototype.clear = function(){
	this.currentScene() && this.currentScene().clear();
	this.nextScene() && this.nextScene().clear();
	this.clear();
};
Application.prototype.update = function(){
	this.handleEvents();
	this.currentScene() && this.currentScene().update();
	this.nextScene() && this.nextScene().update();
	this.resetEvents();
};
Application.prototype.showFPS = function(){
	this._currentFrameCount = (this._currentFrameCount++ || this._currentFrameCount = 0) % 10;
	
	if(!this._currentFrameCount){
		var now = (new Date).valueOf();
		this._fpsText = Math.round(100000 / (now -  this._lastDate)) / 10;
		this._lastDate = now;
	}
	if(!this.supportOpenGLES()){
		var context = arguments[0] || getContext();
		this._fpsFillStyle = this._fpsFillStyle || '#589B2A';
		this._fpsFont = this._fpsFont || "30px sans-serif bold";
		this._fpsPos = this._fpsPos || PointMake(300,30);
		context.save();
		context.fillStyle = this._fpsFillStyle;
		context.font = this._fpsFont;
		context.fillText(this._fpsText, this._fpsPos.x, this._fpsPos.y);
		context.restore();
	}
};
Application.prototype.handleEvents = function(){
	EventSystem.deallingEvents(true);
	EventSystem.events().forEach(function(event){
		this.currentScene() && this.currentScene().handleEvent(event);
		this.nextScene() && this.nextScene().handleEvent(event);
	});
};
Application.prototype.resetEvents = function(){
	EventSystem.resetEvents();
};
Application.prototype.currentScene = function(scene){
	return scene ? this._currentScene : (function(){
		var toClear = this._currentScene;
		this._currentScene = scene;
		toClear && toClear.clear && toClear.clear();
	}).call(this);
};
Application.prototype.nextScene = function(scene){
	return scene? this._nextScene : (function(){
		var toClear = this._nextScene;
		this._nextScene = scene;
		toClear && toClear.clear && toClear.clear();
	}).call(this);
};
Application.prototype.clear = function(){
	Debugger.error("Could add code to implement Application's clear function");
};
Application.prototype.initial = function(config){
	MixIn(config,this);
	Global().app = this;
};