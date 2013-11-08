define(['./foreach', './isarray'], function(forEach, isArray) {
	module.exports = function forEachWithMe(obj, fn) {
		if (isArray(obj)) {
			forEach.apply(obj, arguments);
		} else {
			fn && fn(obj);
		}
	}
});