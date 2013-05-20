function Particle(pos, life, img) {
    this.position = (function(){
        var _position = pos;
        return function(position){
            return position === undefined ? _position : _position = position;
        };
    })();
    this.velocity = (function(){
        var _velocity;
        return function(velocity){
            return velocity === undefined ? _velocity : _velocity = velocity;
        };
    })();
    this.damp = (function(){
        var _velocity = {0.1,0.1};
        return function(velocity){
            return velocity === undefined ? _velocity : _velocity = velocity;
        };
    })();
    this.life = -1;
    
}
Particle.prototype.render = function(ctx){
    this.update(ctx);
    this.onRender(ctx);
    if(this.img){
        this._render(ctx);
    }else{
        this.draw(ctx);
    }
    this.afterRender(ctx);
};
Particle.prototype.update = function(ctx){
    this.onUpdate(ctx);
    this._update(ctx);
    this.afterUpdate(ctx);
};
Particle.prototype._render = function(){
    this.drawImage(this.position());
};
Particle.prototype.draw = function(){};
Particle.prototype.afterRender = function(){};
Particle.prototype.onRender = function(){};
Particle.prototype.onUpdate = function(){};
Particle.prototype._update = function(){};
Particle.prototype.afterUpdate = function(){};