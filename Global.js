function Global() {
	return window;
}
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
function singleton(fn) {
	var returnVal;
	return returnVal !== undefined ? returnVal : function () {
		return returnVal = fn();
	};
}
function domReady(c) {
	if (!("onreadystatechange" in document) || !("readystatechange" in document)) {
		var d = setTimeout(function () {
				clearTimeout(d);
				if ("complete" === document.readyState || "loaded" === document.readyState) {
					c && c();
				} else {
					d = setTimeout(arguments.callee, 50);
				}
			}, 50);
	} else {
		addEventHandler(document, "readystatechange", function () {
			("complete" === this.readyState || "loaded" === this.readyState) && c && c();
		});
	}
}
var requestAnimFrame = (function () {
	return Global().requestAnimationFrame || Global().webkitRequestAnimationFrame || Global().mozRequestAnimationFrame || Global().oRequestAnimationFrame || Global().msRequestAnimationFrame ||
	function (callback) {
		Global().setTimeout(callback, Math.round(1000 / 60));
	};
})();
var cancelAnimationFrame = (function () {
	return Global().cancelAnimationFrame || Global().webkitCancelRequestAnimationFrame || Global().mozCancelRequestAnimationFrame || Global().oCancelRequestAnimationFrame || Global().msCancelRequestAnimationFram || clearTimeout;
})();
var setTimeRequest = function (callback, time) {
	if (time == 0) {
		callback && callback();
		return;
	}
	var tick = 0;
	var timeRequest = Global().requestAnimFrame(function () {
        tick++;
        Global().cancelAnimationFrame(timeRequest);
        if (tick == time) {
            callback && callback();
        } else {
            timeRequest = Global().requestAnimFrame(arguments.callee);
        }
    });
};
