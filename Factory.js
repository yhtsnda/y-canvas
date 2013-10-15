function Factory(create) {
    var factory = [];
    return {
        get: function() {
            return factory.length ? factory.pop() : (create && create());
        },
        collect: function(element) {
            factory.push(element);
        },
        see: function() {
            return factory;
        },
        clear: function() {
            factory = [];
        },
        destroy: function() {
            factory = undefined;
        }
    }
}