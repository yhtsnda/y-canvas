var ParticlePool = (function () {
    var _particles = [];
    return {
        get : function () {
            return _particles.length ? _particles.pop() : new Particle;
        },
        collect : function (particle) {
            _particles.push(particle);
        },
        see : function () {
            return _particles;
        }
    }
})();
