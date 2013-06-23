function ParticleSystem() {
    //var particles = [];
    var pool = ParticlePool;
    this.parent = prop(null);
    this.zIndex = prop(1);
    this.children = prop([]);
    this.addChild = function (particle) {
        particle.parent(this);
        this.children().push(particle);
        return this;
    };
    this.removeChilden = function(){
        forEach(this.children(), function (child, index, particles) {
            exec(child, 'parent', null);
            pool.collect(child);
        });
        this.children(null);
        pool = null;
    };
    this.removeChild = function (particle) {
        forEach(this.children(), function (child, index, particles) {
            if (child === particle) {
                exec(pool.collect(particles.splice(index, 1)[0]), 'parent', null);
                return true;
            }
        });
        return this;
    };
    this.getParticle = function () {
        return pool.get();
    };
    this.update = function (ctx) {
        var particles = this.children();
        var len = particles.length;
        while (len-- > 0) {
            if (!particles[len] || particles[len].life <= 0) {
                pool.collect(particles[len]);
                particles.splice(len, 1);
            }
        };
        forEach(particles,function(particle){
            particle.update(ctx);
        })
    };
    this.clear = function(){
        this.parent().removeChild(this);
        this.parent(null);
        this.removeChilden();
    };
}
