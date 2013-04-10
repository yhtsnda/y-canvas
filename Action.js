function Action(){
	this.duration = 0;
	this.isDone = false;
    this.elapsed = 0;
    this.callback = null;
	this.exec('init',arguments);
}
Action.prototype = new BaseObject;
Action.prototype.step = function(dt){
    this.elapsed = Math.min(this.duration,this.elapsed+dt);
    if(this.elapsed >= this.duration){
        this.done();
    }else{
        this.update();
    }
};
Action.prototype.done = function(){
    this.isDone = true;
    if(this.callback){
        this.callback();
        this.callback = null;
    }
};
Action.prototype.update = function(){
    this.exec('onUpdate',arguments);
    
    this.exec('afterUpdate',arguments);
};
Action.prototype.startWithTarget = function(target){
    this.target = target;
};
Action.prototype.init = function(){
	this.exec('onInit',arguments);
    this.exec('initWith',arguments);
    this.exce('afterInit',arguments);
};
function MoveTo(){
    MoveTo.prototype.init.apply(this,arguments);
}
MoveTo.prototype = new Action();
MoveTo.prototype.initWith = function(toPosition,duration,callback){
    Action.apply(this,arguments);
    this.toPosition = toPosition || PointZero();
    this.duration = duration || 0;
    this.callback = callback;
};
MoveTo.prototype.startWithTarget = function(){
    Action.prototype.startWithTarget.apply(this,arguments);
    this.deltaPosition = PointDiff(this.toPosition,this.target.position());
};
MoveTo.prototype.onUpdate = function(){
    this.target.position(PointSum(this.target.position(),this.deltaPosition * this.elasped));
};
function MoveBy(){
    Action.apply(this,arguments);
}
function ScaleTo(){
    Action.apply(this,arguments);
}
function ScaleBy(){
    Action.apply(this,arguments);
}
function RotateTo(){
    Action.apply(this,arguments);
}
function RotateBy(){
    Action.apply(this,arguments);
}
function TintTo(){
    Action.apply(this,arguments);
}
function TintBy(){
    Action.apply(this,arguments);
}
function FadeTo(){
    Action.apply(this,arguments);
}
function FadeBy(){
    Action.apply(this,arguments);
}
function FadeIn(){
    Action.apply(this,arguments);
}
function FadeOut(){
    Action.apply(this,arguments);
}
function Sequence(){}
function Repeat(){}
function Spawn(){}
function RepeatForever(){}
function Delay(){}
