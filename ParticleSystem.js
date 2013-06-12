function ParticleSystem() {
    var particles = [];
    var pool = ParticlePool;
    this.addChild = function (particle) {
        particle.parent(this);
        particles.push(particle);
        return this;
    };
    this.removeChild = function (particle) {
        forEach(particles, function (child, index, particles) {
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
        var len = particles.length;
        while (len-- > 0) {
            if (!particles[len] || particles[len].life <= 0) {
                pool.collect(particles[len]);
                particles.splice(len, 1);
            }else{
                particles[len].update(ctx);
            }
        };
    }
}
