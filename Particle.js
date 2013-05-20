function Particle(pos, life, img) {
    this.position = prop(pos);
    this.velocity = prop();
    this.damp = prop(PointMake(0.1, 0.1));
    this.life = -1;
    
}
Particle.prototype.render = function (ctx) {
    this.update(ctx);
    this.onRender(ctx);
    if (this.img) {
        this._render(ctx);
    } else {
        this.draw(ctx);
    }
    this.afterRender(ctx);
};
Particle.prototype.update = function (ctx) {
    this.onUpdate(ctx);
    this._update(ctx);
    this.afterUpdate(ctx);
};
Particle.prototype._render = function () {
    this.drawImage(this.position());
};
Particle.prototype.draw = function () {};
Particle.prototype.afterRender = function () {};
Particle.prototype.onRender = function () {};
Particle.prototype.onUpdate = function () {};
Particle.prototype._update = function () {};
Particle.prototype.afterUpdate = function () {};
