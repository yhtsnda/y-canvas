Global().requestAnimFrame = (function () {
	return Global().requestAnimationFrame || Global().webkitRequestAnimationFrame || Global().mozRequestAnimationFrame || Global().oRequestAnimationFrame || Global().msRequestAnimationFrame ||
	function (callback) {
		Global().setTimeout(callback, Math.round(1000 / 60));
	};
})();
Global().cancelAnimationFrame = (function () {
	return Global().cancelAnimationFrame || Global().webkitCancelRequestAnimationFrame || Global().mozCancelRequestAnimationFrame || Global().oCancelRequestAnimationFrame || Global().msCancelRequestAnimationFram || clearTimeout;
})();
Global().setTimeRequest = function (callback, time) {
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
