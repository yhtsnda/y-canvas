define('pubsub', [], function() {
    var obj = {};
    var memory = {};
    var on = function(host, key, fn){
        console.log('listen to ' + key);
        obj[key] || (obj[key] = []);
        obj[key].push({
            host: host,
            fn: fn
        });
        if(memory[key] && host){
            for(var i = 0; i< memory[key].length; i++){
                var listen = memory[key][i];
                if(!host['_private' + key]){
                    console.log('emit memory ' + key);
                    console.log(listen.args);
                    fn.apply(host, listen.args);
                    host['_private' + key] = true;
                };
            }
            memory[key].length = 0;
        }
        return this;
    };

    var off = function(host, key, fn){
        console.log('off to ' + key);
        if(key && fn){
            if(!obj[key]){
                return;
            }
            for(var i = obj[key].length - 1; i >= 0; i--){
                var listen = obj[key][i];
                if(listen.fn === fn){
                    if(host === null || (listen.host === host)){
                        obj[key].splice(i, 1);
                    }
                }
            }
        }else if(key){
            if(!obj[key]){
                return;
            }
            for(var i = obj[key].length - 1; i >= 0; i--){
                var listen = obj[key][i];
                if(host === null || (listen.host === host)){
                    obj[key].splice(i, 1);
                }
            }
        }else{
            for(var prop in obj){
                if(obj.hasOwnProperty(prop)){
                    var arr = obj[prop];
                    for (var i = arr.length - 1; i >= 0; i--) {
                        var listen = arr[i];
                        if(listen.host === host){
                            arr.splice(i, 1);
                        }
                    };
                }
            }
        }
        return this;
    };

    var emit = function(key){
        console.log('pub ' + key + '\t' + arguments[1]);
        if(key.indexOf('memory:') === 0){
            key = key.slice('memory:'.length);
            memory[key] = memory[key] || [];
            memory[key].push({
                args: Array.prototype.slice.call(arguments, 1)
            });
        }
        if(!obj[key]){
            return;
        }
        for (var i = 0; i < obj[key].length; i++) {
            var listen = obj[key][i];
            listen.fn.apply(listen.host, Array.prototype.slice.call(arguments, 1));
        }
        return this;
    };
    var see = function(){
        return obj;
    };
    var seeMemory = function(){
        return memory;
    };
    return {
        on: on,
        sub: on,
        off: off,
        unsub: off,
        emit: emit,
        pub: emit,
        see: see,
        seeMemory: seeMemory
    };
});