function ParticlePool() {
    var _particles = [];
    this.get = function (type) {
        var found;
        forEach(_particles, function (particle, index) {
            if (particle.type === type) {
                found = particle;
                _particles.splice(index, 1);
                return true;
            }
        });
        return found || new Particle(type);
    };
    this.recycle = function (particle) {
        _particles.push(particle);
    };
    this.getParticles = function () {
        return _particles;
    };
};
