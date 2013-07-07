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

function domReady(c) {
    if (!("onreadystatechange" in document) || !("readystatechange" in document)) {
        var d = setTimeout(function() {
            clearTimeout(d);
            if ("complete" === document.readyState || "loaded" === document.readyState) {
                c && c();
            } else {
                d = setTimeout(arguments.callee, 50);
            }
        }, 50);
    } else {
        addEventHandler(document, "readystatechange", function() {
            ("complete" === this.readyState || "loaded" === this.readyState) && c && c();
        });
    }
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
            timeRequest : window.requestAnimFrame(function() {
                tick++;
                if (tick == time) {
                    callback && callback();
                } else {
                    t.timeRequest = window.requestAnimFrame(arguments.callee);
                }
            })
        };
    };