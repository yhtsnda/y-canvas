function addEventHandler(dom, type, fn) {
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

function removeEventHandler(dom, type, fn) {
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

function domReady(callback) {
    if (!("onreadystatechange" in document) || !("readystatechange" in document)) {
        var d = setTimeout(function() {
            clearTimeout(d);
            if ("complete" === document.readyState || "loaded" === document.readyState) {
                callback && callback();
            } else {
                d = setTimeout(arguments.callee, 50);
            }
        }, 50);
    } else {
        addEventHandler(document, "readystatechange", function() {
            ("complete" === this.readyState || "loaded" === this.readyState) && callback && callback();
        });
    }
}

function visibilityChange(callback) {
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
}

var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
})(),
    cancelAnimFrame = (function() {
        return window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFram;
    })(),
    setTimeRequest = function(callback, time) {
        if (time == 0) {
            callback && callback();
            return;
        }
        var tick = 0;
        return t = {
            timeRequest: window.requestAnimFrame(function() {
                tick++;
                if (tick == time) {
                    callback && callback();
                } else {
                    t.timeRequest = window.requestAnimFrame(arguments.callee);
                }
            })
        };
    };