function Action(){
	this.duration = 0;
	this.isDone = false;
	this.exec('init');
}
Action.prototype = new BaseObject;

Action.prototype.startWithTarget = function(target){
    this.target = target;
};
Action.prototype.init = function(){
	this.exec('onInit');
};
function MoveTo(){
    Action.apply(this,arguments);
    
}
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
