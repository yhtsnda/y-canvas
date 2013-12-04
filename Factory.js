function Factory(create) {
    var factory = [];
    return {
        get: function() {
            return factory.length ? factory.pop() : (create && create());
        },
        collect: function(element) {
            factory.push(element);
            return factory;
        },
        see: function() {
            return factory;
        },
        clear: function() {
            factory.length = 0;
            return factory;
        }
    }
}