define('action/delay', ['action'], function(Action){
    function Delay() {
        Action.apply(this, arguments);
    }
    Delay.prototype = new Action;
    return Delay;
});