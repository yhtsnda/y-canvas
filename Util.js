function MixIn(a,b,modifyA){
    if(modifyA){
        for(var p in b){
            a[p] = b[p];
        }
        return a;
    }else{
        var ret = {};
        for(var p in a){
            ret[p] = a[p];
        }
        for(var p in b){
            ret[p] = b[p];
        }
        return ret;
    }
}