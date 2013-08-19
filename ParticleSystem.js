var ParticleSystem = function() {
    var particlePool = Factory(function() {
        return new Particle;
    });

    function ParticleSystem() {
        this.parent = prop(null);
        this.zIndex = prop(1);
        this.children = prop([]);
        this.zIndex = prop(0);
    }
    ParticleSystem.prototype.remove = function() {
        try {
            this.parent().removeChild(this);
        } catch (e) {}
    };
    ParticleSystem.prototype.addChild = function(particle) {
        particle.parent(this);
        this.children().push(particle);
        return this;
    };
    ParticleSystem.prototype.removeChilden = function() {
        forEach(this.children(), function(child, index, particles) {
            exec(child, 'parent', null);
            particlePool.collect(child);
        });
        this.children(null);
    };
    ParticleSystem.prototype.removeChild = function(particle) {
        forEach(this.children(), function(child, index, particles) {
            if (child === particle) {
                exec(particlePool.collect(particles.splice(index, 1)[0]), 'parent', null);
                return true;
            }
        });
        return this;
    };
    ParticleSystem.prototype.getParticle = function() {
        return particlePool.get();
    };
    ParticleSystem.prototype.update = function(ctx) {
        //ctx.save();
        var particles = this.children();
        var len = particles.length;
        while (len-- > 0) {
            if (!particles[len] || particles[len].life <= 0) {
                particlePool.collect(particles[len]);
                particles.splice(len, 1);
            }
        };
        forEach(particles, function(particle) {
            particle.update(ctx);
        });
        //ctx.restore();
    };
    ParticleSystem.prototype.clear = function() {
        this.parent().removeChild(this);
        this.parent(null);
        this.removeChilden();
    };
    return ParticleSystem;
}();