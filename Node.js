var globaluuid = 0;
function Node() {
    this.id = ++globaluuid;
    this.width = 0;
    this.height = 0;
    this.position = new Point(0, 0);
    this.display = (function() {
        var _display = true;
        return function(display) {
            display !== undefined && (_display = display);
            return _display && ((this.parent && this.parent.display) ? this.parent.display() : true);
        };
    });
    this.images = [];
    this.imageIndex = 0;
    this.zIndex = 0;
    this.alpha = 1;
    this.alp = function(){
        var alpha = this.alpha * ((this.parent && this.parent.alp) ? this.parent.alp() : 1)
        return Math.max(0, Math.min(1, alpha));
    };
    /*this.alpha = (function() {
        var _alpha = 1;
        return function(alpha) {
            alpha !== undefined && (_alpha = alpha);
            return _alpha * ((this.parent && this.parent.alpha) ? this.parent.alpha() : 1);
        };
    })();*/
    this.anchor = new Point(0.5, 0.5);
    this.rotate = 0;
    this.scale = new Point(1, 1);
    this.skew = new Point(0, 0);
    this.transform = null;
    this._paused = false;
    this.pause = function(paused){
        this._paused = paused;
    };
    this.parent = null;
    this.actionManager = new ActionManager(this);
    forEach(["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseenter", "mouseleave", "keydown", "keypress", "keyup", "touchstart", "touchmove", "touchend", "touchcancel"], function(e) {
        this['on' + e] = [];
    }, this);

    this.init.apply(this, arguments);
    for(var prop in arguments[0]){
        if(this.hasOwnProperty(prop)){
            this[prop] = arguments[0][prop];
        }
    }
}
Node.prototype = mix(BaseObject, TreeObject, {
    stop: function(){
        this.pause(true);
    },
    resume: function(){
        this.pause(false);
    },
    runAction: function(){
        this.actionManager.runAction.apply(this.actionManager, arguments);
    },
    clear: function(){
        this.off();
        exec(this.actionManager, 'clear');
        this.removeChildren();
        this.removeFromParent();
        for (var prop in this) {
            if(this.hasOwnProperty(prop)){
                delete this[prop];
            }
        }
        return this;
    },
    clearChildren: function(){

    },
    getImage: function(index){
        return this.images[index || this.imageIndex];
    },
    pos: function(){
        this._pos = this._pos || new Point;
        var position = this.position,
            parentPos = exec(this.parent, 'pos');
        this._pos.x = position.x + (parentPos? parentPos.x: 0);
        this._pos.y = position.y + (parentPos? parentPos.y: 0);
        return this._pos;
    }
});