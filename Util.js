var global = window;
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
function forEach(obj, fn) {
    //fn(v,k,obj)
    if (obj.some) {
        return obj.some.apply(obj, Array.prototype.slice.call(arguments, 1));
    } else if (obj.length !== undefined) {
        for (var i = 0; i < obj.length; i++) {
            if (fn.call(global, obj[i], i, obj) === true) {
                return true;
            }
        }
    } else { // if(isObject(obj) || isArguments(obj) || isFunction(obj)) {
        for (var i in obj) {
            if (fn.call(global, obj[i], i, obj) === true) {
                return true;
            }
        }
    }
}
function currying(func, source, context) {
    (context || this)[func] = function (obj) {
        return source[func].apply(obj, Array.prototype.slice.call(arguments, 1));
    }
}
forEach(['push', 'pop', 'slice', 'splice', 'concat', 'shift', 'unshift', 'sort', 'reverse', 'join'], function (v, k) {
    currying(v, Array.prototype);
});
/*
    window.toString !== toString
forEach(['toString'], function (v, k) {
    currying(v, Object.prototype);
});
 */
forEach(['apply', 'call'], function (v, k) {
    currying(v, Function.prototype);
});
forEach(['Array', 'Object', 'Function', 'Arguments', 'Number', 'Date', 'Boolean', 'String', 'RegExp'], function (v, k) {
    global['is' + v] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + v + ']';
    };
});
currying('exec', BaseObject.prototype);
