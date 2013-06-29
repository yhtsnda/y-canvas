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
            if (fn.call(host || Global(), obj[i], i, obj) === true) {
                return true;
            }
        }
    } else { // if(isObject(obj) || isArguments(obj) || isFunction(obj)) {
        for (var i in obj) {
            if (fn.call(host || Global(), obj[i], i, obj) === true) {
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
    Global()['is' + v] = function(obj) {
        return toStr(obj) === '[object ' + v + ']';
    };
});
currying('exec', 'exec', BaseObject.prototype);

function setCallback(callback) {
    this.callback = this.callback || [];
    if (callback) {
        if (isArray(callback)) {
            var me = this;
            forEach(callback, function(fn) {
                fn && me.callback.push(fn);
            });
        } else {
            this.callback.push(callback);
        }
    }
}

function emitCallback() {
    var me = this;
    forEach(me.callback, function(fn) {
        fn && fn.call(me);
    });
    me.callback = [];
}

function prop(defaultValue) {
    return (function() {
        var _value = defaultValue;
        return function(value) {
            return value === undefined ? _value : _value = value;
        };
    })();
}