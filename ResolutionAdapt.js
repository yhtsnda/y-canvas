var ResolutionAdapt = {
	setExpectResolution : function(w, h){
		this.expectedRatio = w / h;
	},
	onDeviceResolutionChanged: function(w, h){
		//640 480
		//650 480
	},
	expectedRatio: 1
};
addEventListener(window, 'resize', function(){
	clearTimeout(window.resizeTimeout);
	window.resizeTimeout = setTimeout(function(){
		ResolutionAdapt.onDeviceResolutionChanged(window.width, window.height);
	});
});