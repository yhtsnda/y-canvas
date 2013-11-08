define('mix', [], function() {
    module.exports = function mix() {
        var obj = {};
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            for(var prop in arg){
                if(arg.hasOwnProperty(prop)){
                    obj[prop] = arg[prop];
                }
            }
        };
        return obj;
    }
});