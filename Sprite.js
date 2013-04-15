function Sprite(){
    Node.apply(this,arguments);
}
Sprite.prototype = new BaseObject;
Sprite.prototype.init = function(){
    this.exec('onInit',arguments);
    this.exec('_init',arguments);
    this.exec('afterInit',arguments);
};
Sprite.prototype.update = function(){
    this.exec('onUpdate',arguments);
    this.exec('_update',arguments);
    this.exec('afterUpdate',arguments);
};
Sprite.prototype.render = function(){
    this.exec('onRender',arguments);
    this.exec('_render',arguments);
    this.exec('afterRender',arguments);
};
Sprite.prototype.clear = function(){
    this.exec('onClear',arguments);
    this.exec('_clear',arguments);
    this.exec('afterClear',arguments);
};