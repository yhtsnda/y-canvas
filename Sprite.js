function Sprite(){
    this.init();
}
Sprite.prototype = new BaseObject;
Sprite.prototype.init = function(){
    this.onInit();
};
Sprite.prototype.update = function(){};
Sprite.prototype.render = function(){};