function Node() {
    this.position = prop(PointMake(0, 0));
    this.actualPosition = function(){
        return this.position();
    };
    this.rect = prop(PointMake(0, 0));
    this.visible = prop(false);
    this.display = prop(true);
    this.images = prop([]);;
    this.imageSizes = prop([])
    /* this.getImageSize = function(){
        //context.drawImage(img,x,y);
        //context.drawImage(img,x,y,width,height);
        //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        var imageSize = this.imageSizes[this.imageIndex()];
    }; */
    this.imageIndex = prop(0);
    this.getImage = function(){
        return this.images()[this.imageIndex()];
    };
    this.zIndex = prop(0);
    this.alpha = prop(1);
    this.anchor = prop(PointMake(0.5, 0.5));
    this.rotate = prop(0);
    this.scale = prop(PointMake(1, 1));
    this.skew = prop(PointMake(0, 0));
    this.transform = prop();
    this.pause = prop();
    this.stop = function () {
        this.pause(true);
    };
    this.resume = function () {
        this.pause(false);
    };
    this.children = prop([]);
    this.childrenWithoutEmpty = function () {
        return this.children() && this.children().removeNullVal();
    };
    this.resetChildren = function () {
        return this.children([]);
    };
    this.clearChildren = function () {
        return this.children(null);
    };
    this.getChildByTag = function () {
        var children = this.children();
        for (var i = 0; i < children.length; i++) {
            if (children[i] && children[i].tag == tag) {
                return children[i];
            }
        }
    };
    this.addChild = function (child) {
        return this.children().push(child), this;
    };
    this.removeLastChild = function () {
        return this.children().pop(), this;
    };
    this.updateChildren = function (context) {
        var children = this.children();
        children.sort(function (a, b) {
            return b.index - a.index;
        });
        var len = children.length;
        for (var i = len - 1; i >= 0; i--) {
            if (children[i] === null || children[i].destoryed) {
                len--;
                children[i] = children[len];
                continue;
            }
            children[i].update(context);
        }
        children.length = len;
        return this;
    };
    this.width = prop(0);
    this.height = prop(0);;
    this.actionManager = new ActionManager(this);
    var me = this;
    forEach(["mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave","keydown", "keypress", "keyup","touchstart", "touchmove", "touchend", "touchcancel"],function(e){
        me['on' + e] = [];
    });
    this.handleEvents = function () {
    };
    this.runAction = function(){
        exec(this.actionManager,'runAction',arguments);
    };
    arguments.length ? exec(this, 'init', arguments) : exec(this, 'init');
}