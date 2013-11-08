define([], function() {
    module.exports = function forEach(obj, fn, host) {
        if (obj === undefined || obj === null) {
            return;
        }
        if (obj.hasOwnProperty('length')) {
            for (var i = 0; i < obj.length; i++) {
                if (fn.call(host || window, obj[i], i, obj) === true) {
                    return true;
                }
            }
        } else {
            for (var i in obj) {
                if (obj.hasOwnProperty(i) && fn.call(host || window, obj[i], i, obj) === true) {
                    return true;
                }
            }
        }
    }
});