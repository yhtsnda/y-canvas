function Global(){
	return window;
}
var Debugger = Global().console || {
	debug:function(){},
	info:function(){},
	warn:function(){},
	assert:function(){},
	error:function(msg){
		throw new Error(msg);
	}
};

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
