function singleton(fn){
	var returnVal;
	return returnVal != undefined?returnVal:function(){
		return returnVal = fn();
	};
}
function getResolution(){
	return SizeMake(document.documentElement.offsetWidth,document.documentElement.body);
}
function device(){
	return {
		resolution : getResolution()
	}
};
var Device = singleton(device);