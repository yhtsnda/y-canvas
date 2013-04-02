function Sprite(){
    this.init();
}
Sprite.prototype = new BaseObject;
Sprite.prototype.init = function(){
    Node.apply(this,arguments);
    this.exec('onInit');
};
Sprite.prototype.update = function(){
    this.exec('onUpdate');
    this.exec('afterUpdate');
};
Sprite.prototype.render = function(){
    this.exec('onRender');
    this.exec('afterRender');
};
Sprite.prototype.clear = function(){
    this.exec('onClear');
	this.exec('afterClear');
};