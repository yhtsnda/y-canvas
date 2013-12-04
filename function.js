define(function() {
    define('singleton', [],function(){
        return function singleton(fn) {
            var returnVal;
            return returnVal !== undefined ? returnVal : function() {
                return returnVal = fn();
            };
        }
    });

    define('mix', [], function(){
        return function mixIn() {
            var obj = {};
            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                for(var prop in arg){
                    //if(arg.hasOwnProperty(prop)){
                        obj[prop] = arg[prop];
                    //}
                }
            };
            return obj;
        }
    });

    define('foreach', [], function(){
        return function forEach(obj, fn, host) {
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

    define('currying', [], function(){
        var pop = Array.prototype.pop,
            shift = Array.prototype.shift;
        return function currying(fname, source, newFuncName, context) {
            var fn = source[fname];
            return (context || this)[newFuncName || fname] = function() {
                var obj = shift.call(arguments);
                if (obj === null || obj === undefined) {
                    return;
                }
                for (var i = arguments.length - 1; i >= 0; i--) {
                    if(arguments[i] !== undefined || arguments[i] !== null){
                        break;
                    }
                    pop.call(arguments);
                };
                return fn.apply(obj, arguments);
            }
        }
    });

    (function(){
        var proto = Array.prototype;
        var arr = ['push', 'pop', 'slice', 'splice', 'concat', 'shift', 'unshift', 'sort', 'reverse', 'join'];
        for (var i = 0; i < arr.length; i++) {
            (function(key){
                define(key, ['currying'], function(currying){
                    return currying(key, proto);
                });
            })(arr[i]);
        };
    })();

    (function () {
        var proto = Object.prototype;
        define('toString', ['currying'], function (currying) {
            return currying('toString', proto);
        });
    })();

    require(['foreach'], function (forEach) {
        var proto = Function.prototype;
        forEach(['apply', 'call'], function(v, k) {
            define(v, ['currying'], function (currying) {
                return currying(v, proto);
            });
        });


        forEach(['Array', 'Object', 'Function', 'Arguments', 'Number', 'Date', 'Boolean', 'String', 'RegExp'], function(v, k) {
            define('is' + v, ['toString'], function(toString){
                return function(obj) {
                    return toString(obj) === '[object ' + v + ']';
                };
            });
        });
    });

    define('foreachwithself', ['isArray', 'foreach'], function(isArray, forEach){
        return function forEachWithMe(obj, fn) {
            if (isArray(obj)) {
                forEach.apply(obj, arguments);
            } else {
                fn && fn(obj);
            }
        }
    });

    define('prop', [], function(){
        return function prop(def) {
            var val = def;
            return function(value) {
                return value === undefined ? val : val = value;
            };
        };
    });

    define('propArray', ['isArray'], function(isArray){
        return function propArray(def) {
            var arr = def || [];
            return function(value) {
                if (value === undefined) {
                    return arr;
                } else if (isArray(value)) {
                    return arr = value;
                } else {
                    arr = def || [];
                    arr.push(value);
                    return arr;
                }
            }
        };
    });

    define('proxy', [], function () {
        return function proxy(fn, context) {
            return function() {
                fn.apply(context, arguments);
            };
        };
    });

    define('exec', ['shift'], function(shift){
        return function exec(){
            var host = shift(arguments),
                fn = shift(arguments);
            if(host && fn && host[fn]){
                return host[fn].apply(host, arguments);
            }
        }
    });
});