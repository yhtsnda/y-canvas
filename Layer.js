function Layer(){
	this.init();
}
Layer.prototype = new BaseObject;
Layer.prototype.init = function(){
        Node.apply(this,arguments);
	this.exec('onInit');
	this.exec('resume');
	this.exec('afterInit');
};
Layer.prototype.clear = function(){
    this.exec('onClear');
    this.unSubscribe();
    this.children().forEach(function(child){
        child.clear();
    });
};
Layer.prototype.handleEvent = function(){
        this.exec('onHandleEvent');
	this.exec('afterHandleEvent');
};
Layer.prototype.removeChild = function(child){
    this.children().some(function(_child,index,children){
        if(_child === child){
            children.splice(index,1);
            return true;
        }
    });
};
Layer.prototype.removeChildByTag = function(tag){
    for(var i=0;i<this.children().length;i++){
        if(this.children()[i].tag === tag){
            //this.removeChild(this.children()[i]);
            this.children().splice(i,1);
            break;
        }
    }
};
Layer.prototype.update = function(context){
    this.exec('onUpdate');
    Debugger.assert(this.children() != null);
    this.children().removeNullVal().sort(function(a,b){
        return a.index() > b.index();
    }).forEach(function(child){
        child.update(context || getContext());
    });
    this.exec('afterUpdate');
};
Layer.prototype.render = function(context){
    this.exec('onRender');
    var context = context || getContext();
    this.children() && this.children().forEach(function(child,index){
	child.render(context);
    });
    this.exec('afterRender');
};
