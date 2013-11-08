define([], function() {
    var slice = Array.prototype.slice;
    module.exports = function currying(fromFunc, toFunc, source, context) {
        (context || this)[toFunc] = function(obj, fun) {
            if (obj === null || obj === undefined) {
                return;
            }
            return arguments.length > 1 ? source[fromFunc].apply(obj, slice.call(arguments, 1)) : source[fromFunc].call(obj);
        }
    }
});