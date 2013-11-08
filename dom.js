define('addEventHandler', [], function(){
    return function addEventHandler(dom, type, fn) {
        if (!dom || !type || !fn)
            return;
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            dom.attachEvent("on" + type, eval(fn));
        } else {
            dom["on" + type] = fn;
        }
    };
});

define('removeEventHandler', [], function(){
    return function removeEventHandler(dom, type, fn) {
        if (!dom || !type || !fn)
            return;
        if (dom.removeEventListener) {
            dom.removeEventListener(type, fn, false);
        } else if (dom.detachEvent) { //IE
            dom.detachEvent("on" + type, fn);
        } else {
            dom["on" + type] = null;
        }
    };
});

define('domReady', [], function(){
    return function domReady(fn) {
        document.addEventHandler("readystatechange", function() {
            ("complete" === this.readyState || "loaded" === this.readyState) && fn && fn.apply(this, arguments);
        });
    };
});

define('visibilityChange', [], function(){
    return function visibilityChange(callback) {
        if ('hidden' in document) {
            document.addEventListener('visibilitychange', function() {
                callback(document.hidden);
            }, false);
        } else if ('webkitHidden' in document) {
            document.addEventListener('webkitvisibilitychange', function() {
                callback(document.webkitHidden);
            }, false);
        } else if ('mozHidden' in document) {
            document.addEventListener('mozvisibilitychange', function() {
                callback(document.mozHidden);
            }, false);
        } else if ('msHidden' in document) {
            document.addEventListener('msvisibilitychange', function() {
                callback(document.msHidden);
            }, false);
        } else {
            return false;
        }
        return true;
    };
});

define('requestAnimFrame', [], function () {
    return (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (c) {
                window.setTimeout(c, 16.67);
            };
    })();
});

define('cancelAnimFrame', [], function () {
    return (function() {
        return window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFram;
    })();
});

define('setTimeRequest', ['requestAnimFrame'], function (requestAnimFrame) {
    return function setTimeRequest(callback, time) {
        if (time == 0) {
            callback && callback();
            return;
        }
        var tick = 0;
        return t = {
            timeRequest: requestAnimFrame(function() {
                tick++;
                if (tick == time) {
                    callback && callback();
                } else {
                    t.timeRequest = requestAnimFrame(arguments.callee);
                }
            })
        };
    };
});