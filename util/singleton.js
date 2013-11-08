define([], function() {
	module.exports = function singleton(fn) {
		var returnVal;
		return returnVal !== undefined ? returnVal : function() {
			return returnVal = fn();
		};
	}
});