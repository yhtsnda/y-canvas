define('base', ['pubsub', 'exec', 'foreach', 'prop'], function(pubsub, exec, forEach, prop) {
    return {
        pub: function() {
            return pubsub.pub.apply(pubsub, arguments);
        },
        on: function() {
            Array.prototype.unshift.call(arguments, this);
            return pubsub.on.apply(pubsub, arguments);
        },
        off: function() {
            Array.prototype.unshift.call(arguments, this);
            return pubsub.off.apply(this, arguments);
        },
        exec: function() {
            return exec.apply(this, arguments);
        }
    };
});