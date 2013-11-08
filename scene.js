define('scene', ['node', 'mix'], function(Node, mix) {
    function Scene() {
        Node.apply(this, arguments);
    }
    Scene.prototype = mix(Node.prototype, {
        update: function() {
            this.updateChildren.apply(this, arguments);
        },
        pause: function() {
            var children = this.children();
            children && children.forEach(function(child) {
                child && child.pause();
            });
        },
        resume: function() {
            forEach(this.children(), function(child, index, children) {
                child && child.resume();
            });
        }
    });
    return Scene;
});
