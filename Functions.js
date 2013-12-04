function singleton(fn) {
    var returnVal;
    return returnVal !== undefined ? returnVal : function() {
        return returnVal = fn();
    };
}
function mix() {
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

function forEach(obj, fn, host) {
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


function forEachWithMe(obj, fn) {
    if (isArray(obj)) {
        forEach.apply(obj, arguments);
    } else {
        fn && fn(obj);
    }
}

function currying(fname, source, newFuncName, context) {
    var fn = source[fname];
    return (context || this)[newFuncName || fname] = function() {
        var obj = Array.prototype.shift.call(arguments);
        if (obj === null || obj === undefined) {
            return;
        }
        for (var i = arguments.length - 1; i >= 0; i--) {
            if(arguments[i] !== undefined || arguments[i] !== null){
                break;
            }
            Array.prototype.pop.call(arguments);
        };
        return fn.apply(obj, arguments);
    }
}

(function(){
    var arr = ['push', 'pop', 'slice', 'splice', 'concat', 'shift', 'unshift', 'sort', 'reverse', 'join'];
    for (var i = 0; i < arr.length; i++) {
        currying(arr[i], Array.prototype);
    };
})();

currying('toString', 'toStr', 'toStr', Object.prototype);

forEach(['Array', 'Object', 'Function', 'Arguments', 'Number', 'Date', 'Boolean', 'String', 'RegExp'], function(v, k) {
    window['is' + v] = function(obj) {
        return toStr(obj) === '[object ' + v + ']';
    };
});

function forEachWithMe(obj, fn) {
    if (isArray(obj)) {
        forEach.apply(obj, arguments);
    } else {
        fn && fn(obj);
    }
}

function exec(){
    var host = shift(arguments),
        fn = shift(arguments);
    if(host && fn && host[fn]){
        return host[fn].apply(host, arguments);
    }
}

function prop(def) {
    var val = def;
    return function(value) {
        return value === undefined ? val : val = value;
    };
};

function propArray(def) {
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

function proxy(fn, context) {
    return function() {
        return fn.apply(context, arguments);
    };
}