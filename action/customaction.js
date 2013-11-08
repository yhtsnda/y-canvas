define('action/customaction', ['action', 'point', 'shift', 'mix'], function(Action, Point, shift, mix) {

    function CustomAction() {
        Action.apply(this, arguments);
    }
    //new CustomerAction({position:PointMake(100,100),rotate:Math.PI/4,scale:PointMake(0.1,0.1)},1000)
    CustomAction.prototype = mix(new Action, {

    });
    /*
    CustomerAction.prototype._init = function(to) {
        this.to = to;
    };
    CustomerAction.prototype._startWithTarget = function() {
        forEach(this.to, function(value, prop) {
            this['start' + prop] = this.target[prop]();
            this['delta' + prop] = isNumber(value) ? (value - this.target[prop]()) : value.diff(this.target[prop]());
        }, this);
    };
    CustomerAction.prototype._update = function(time) {
        forEach(this.to, function(value, prop) {
            var t = this.getTime(time);
            if (isNumber(value)) {
                this.target[prop](this['start' + prop] + this['delta' + prop] * t);
            } else {
                this.target[prop](this['start' + prop].sum(this['delta' + prop].multi(t)));
                //console.log(this['start' + prop].sum(this['delta' + prop].multi(t)));
            }
        }, this);
    };
    CustomerAction.prototype._reset = function() {

    };*/
    return CustomAction;
});