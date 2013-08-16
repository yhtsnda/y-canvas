function singleton(fn) {
    var returnVal;
    return returnVal !== undefined ? returnVal : function() {
        return returnVal = fn();
    };
}

function mixIn(a, b, modifyA) {
    if (modifyA) {
        for (var p in b) {
            a[p] = b[p];
        }
        return a;
    } else {
        var ret = {};
        for (var p in a) {
            ret[p] = a[p];
        }
        for (var p in b) {
            ret[p] = b[p];
        }
        return ret;
    }
}

function forEach(obj, fn, host) {
    if (obj === undefined || obj === null) {
        return;
    }
    //fn(v,k,obj)
    /* if (obj.some) {
        return obj.some.apply(obj, Array.prototype.slice.call(arguments, 1));
    } else */
    if (obj.length !== undefined) {
        for (var i = 0; i < obj.length; i++) {
            if (fn.call(host || window, obj[i], i, obj) === true) {
                return true;
            }
        }
    } else { // if(isObject(obj) || isArguments(obj) || isFunction(obj)) {
        for (var i in obj) {
            if (fn.call(host || window, obj[i], i, obj) === true) {
                return true;
            }
        }
    }
}

function forEachWithMe(obj, fn) {
    if (isArray(obj)) {
        forEach.apply(obj, arguments);
    } else {
        fn && fn(obj);
    }
}

function currying(fromFunc, toFunc, source, context) {
    (context || this)[toFunc] = function(obj, fun) {
        if (obj === null || obj === undefined) {
            return;
        }
        return arguments.length > 1 ? source[fromFunc].apply(obj, Array.prototype.slice.call(arguments, 1)) : source[fromFunc].call(obj);
    }
}
forEach(['push', 'pop', 'slice', 'splice', 'concat', 'shift', 'unshift', 'sort', 'reverse', 'join'], function(v, k) {
    currying(v, v, Array.prototype);
});
currying('toString', 'toStr', Object.prototype);
forEach(['apply', 'call'], function(v, k) {
    currying(v, v, Function.prototype);
});
forEach(['Array', 'Object', 'Function', 'Arguments', 'Number', 'Date', 'Boolean', 'String', 'RegExp'], function(v, k) {
    window['is' + v] = function(obj) {
        return toStr(obj) === '[object ' + v + ']';
    };
});
currying('exec', 'exec', BaseObject.prototype);

function setCallback(callback) {
    this.callback = this.callback || [];
    if (callback) {
        var me = this;
        forEachWithMe(callback, function(fn) {
            fn && me.callback.push(fn);
        });
    }
}

function emitCallback() {
    var me = this;
    forEach(me.callback, function(fn) {
        fn && fn.call(me);
    });
    me.callback.length = 0;
}

function prop(defaultValue) {
    return (function() {
        var _value = defaultValue;
        return function(value) {
            return value === undefined ? _value : _value = value;
        };
    })();
}

function propArray(defaultValue) {
    return (function() {
        var _value = defaultValue || [];
        return function(value) {
            if (value === undefined) {
                return _value;
            } else if (isArray(value)) {
                return _value = value;
            } else {
                _value = defaultValue || [];
                _value.push(value);
                return _value;
            }
        }
    })();
}

function proxy(fn, context) {
    return function() {
        fn.apply(context, arguments);
    };
}