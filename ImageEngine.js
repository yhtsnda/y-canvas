var ImageEngine = function (){
    var caches = [],
        imageEngine = {};
    imageEngine.loadImage = function(url,callback){
        var cache = caches[url];
        if(cache){
            if(cache.loaded){
                if(isArray(callback)){
                    forEach(callback,function(fn){
                        fn && fn.call(cache);
                    });
                }else{
                    callback && callback.call(cache);
                }
            }else{
                if(isArray(callback)){
                    forEach(callback,function(fn){
                        cache.callback.push(fn);
                    });
                }else{
                    callback && cache.callback.push(callback);
                }
            }
            return cache;
        }else{
            var img = new Image();
            img.src = url;
            img.callback = [];
            if(isArray(callback)){
                forEach(callback,function(fn){
                    img.callback.push(fn);
                });
            }else{
                callback && img.callback.push(callback);
            }
            img.onload = function(){
                this.loaded = true;
                forEach(this.callback,function(fn){
                    fn && fn.call(img);
                });
                img.callback = [];
            };
            return img;
        }
    };
    return imageEngine;
}();
