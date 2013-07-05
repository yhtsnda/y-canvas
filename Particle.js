function Particle(pos, life, img) {
    this.position = prop(pos || PointMake(0, 0));
    this.parent = prop(null);
    this.velocity = prop(PointMake(0, 0)); //速度
    this.damp = prop(PointMake(0.1, 0.1)); //阻尼
    this.resultant = prop(PointMake(0, 0)); //合力
    this.life = prop(life === undefined ? Infinity : life);
    this.forcesMap = prop([]);  //强制力
    this.image = prop(img);
    this.boundary = prop();     //边界
    this.bounceIntensity = 2;   //反弹强度
    this.boundaryType = this.offscreen; //画面以外
    this.scale = 1;
    this.rotation = 0;
    this.alpha = 1;
}
Particle.prototype.render = function(ctx) {
    this.onRender(ctx);
    if (this.image()) {
        this._render(ctx);
    } else {
        this.draw(ctx);
    }
    this.afterRender(ctx);
};
Particle.prototype.update = function(ctx) {
    if (this.life() <= 0) {
        return;
    }
    this.onUpdate(ctx);
    this._update(ctx);
    this.afterUpdate(ctx);

    this.resultant().reset();
    forEach(this.forcesMap(), function(force, index, forces) {
        if (force && force.isActive()) {
            this.resultant().add(force.value());
        } else {
            forces[index] = null;
        }
    }, this);
    //this.forcesMap().removeNullVal();

    this.velocity().add(this.resultant());
    this.velocity().x *= (1 - this.damp().x);
    this.velocity().y *= (1 - this.damp().y);
    this.position().add(this.velocity());
    if (this.boundary() != null) {
        this.boundaryType();
    }
    this.render(ctx);
    this.life(this.life() - 1);
};
Particle.prototype._render = function(ctx) {
    //ctx.save();
    //ctx.globalAlpha = this.alpha;
    ctx.translate(this.position().x, this.position().y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
    var size = this.image().size;
    if (size) {
        ctx.drawImage(this.image().img, size[0], size[1], size[2], size[3], 0, 0, size[2], size[3]);
    } else {
        ctx.drawImage(this.image().img, 0, 0);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    //ctx.globalAlpha = 1;
    //ctx.restore();
};
Particle.prototype.remove = function(){
    try{
        this.parent().removeChild(this);
    }catch(e){
        console.log(e);
    }
};
Particle.prototype.draw =
Particle.prototype.afterRender =
Particle.prototype.onRender =
Particle.prototype.onUpdate =
Particle.prototype._update =
Particle.prototype.afterUpdate = function() {};
Particle.prototype.reset = function() {
    this.position().reset();
    this.velocity().reset(); //速度
    this.damp().reset(0.1, 0.1); //阻尼
    this.resultant().reset();//合力
    this.life(Infinity);
    this.forcesMap().length = 0;
    this.bounceIntensity = 2;
    this.boundaryType = this.offscreen;
    this.scale = 1;
    this.rotation = 0;
    this.alpha = 1;
    return this;
};
Particle.prototype.bounce = function() { //反弹（跳跃）
    var pos = this.position(),
        boundary = this.boundary();
    if (pos.x < boundary.left()) {
        pos.x = boundary.left();
        this.velocity().x *= -this.bounceIntensity;
    } else if (pos.x > boundary.right()) {
        pos.x = boundary.right();
        this.velocity().x *= -this.bounceIntensity;
    }

    if (pos.y < boundary.top()) {
        pos.y = boundary.top();
        this.velocity().y *= -this.bounceIntensity;
    } else if (pos.y > boundary.bottom()) {
        pos.y = boundary.bottom();
        this.velocity().y *= -this.bounceIntensity;
    }
};
Particle.prototype.offscreen = function() { //控制不出边界
    var pos = this.position(),
        boundary = this.boundary();
    if (pos.x < boundary.left()) {
        pos.x = boundary.right();
    }

    if (pos.x > boundary.right()) {
        pos.x = boundary.left();
    }

    if (pos.y < boundary.top()) {
        pos.y = boundary.bottom();
    }

    if (pos.y > boundary.bottom()) {
        pos.y = boundary.top();
    }
};