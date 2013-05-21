function ParticleSystem() {
    this.particles = prop([]);
    this.pool = new ParticlePool;
    
    this.createParticle = function (type) {
        var particle = this.pool.get(type);
        this.particles().push(particle);
        return particle;
    };
    this.update = function (ctx) {
    
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, getDom().width, getDom().height);
        var particles = this.particles(),
            len = particles.length;
        forEach(particles, function (particle) {
            particle.update(ctx);
        });
        while (len-- > 0) {
            if (particles[len].life <= 0) {
                this.pool.recycle(particles[len]);
                particles.splice(len, 1);
            }
        };
    }
}
