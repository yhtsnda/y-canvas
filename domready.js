var addEventHandler = function (c, d, f) {
	c.addEventListener ? c.addEventListener(d, f, false) : c.attachEvent ? c.attachEvent("on" + d, eval(f)) : (c["on" + d] = f);
},
domReady = function (c) {
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
};
