function ScriptLoad(src, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onreadystatechange = function () {
        if (this.readyState == 'complete') {
            onLoad();
        }
    };
    
    script.callback = [];
    if (isArray(callback)) {
        forEach(callback, function (fn) {
            script.callback.push(fn);
        });
    } else {
        callback && script.callback.push(callback);
    }
    script.onload = onLoad;
    function onLoad() {
        forEach(script.callback, function (fn) {
            fn && fn.call(script);
        });
    }
    (document.head || document.body).appendChild(script);
    
    script.loadedCallback = [];
    return script;
}
