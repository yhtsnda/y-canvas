window.requestAnimFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, Math.round(1000 / 60));
	};
})();
window.cancelAnimationFrame = (function () {
	return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFram || clearTimeout;
})();
window.setTimeRequest = function (callback, time) {
	if (time == 0) {
		callback && callback();
		return;
	}
	var tick = 0;
	var timeRequest = window.requestAnimFrame(function () {
			tick++;
			window.cancelAnimationFrame(timeRequest);
			if (tick == time) {
				callback && callback();
			} else {
				timeRequest = window.requestAnimFrame(arguments.callee);
			}
		});
};
