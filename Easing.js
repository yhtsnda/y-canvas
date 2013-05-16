var Easing = {
    easeInQuad : function (t, d) {
        return (t /= d) * t
    },
    easeOutQuad : function (t, d) {
        return - (t /= d) * (t - 2)
    },
    easeInOutQuad : function (t, d) {
        if ((t /= d / 2) < 1)
            return 0.5 * t * t;
        return -0.5 * ((--t) * (t - 2) - 1);
    },
    easeInCubic : function (t, d) {
        return (t /= d) * t * t;
    },
    easeOutCubic : function (t, d) {
        return (t = t / d - 1) * t * t + 1;
    },
    easeInOutCubic : function (t, d) {
        if ((t /= d / 2) < 1)
            return 0.5 * t * t * t;
        return 0.5 * ((t -= 2) * t * t + 2);
    },
    easeInQuart : function (t, d) {
        return (t /= d) * t * t * t; ;
    },
    easeOutQuart : function (t, d) {
        return  - ((t = t / d - 1) * t * t * t - 1);
    },
    easeInOutQuart : function (t, d) {
        if ((t /= d / 2) < 1)
            return 0.5 * t * t * t * t;
        return -0.5 * ((t -= 2) * t * t * t - 2);
    },
    easeInQuint : function (t, d) {
        return (t /= d) * t * t * t * t;
    },
    easeOutQuint : function (t, d) {
        return (t = t / d - 1) * t * t * t * t + 1;
    },
    easeInOutQuint : function (t, d) {
        if ((t /= d / 2) < 1)
            return 0.5 * t * t * t * t * t;
        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    },
    easeInSine : function (t, d) {
        return -Math.cos(t / d * (Math.PI / 2));
    },
    easeOutSine : function (t, d) {
        return Math.sin(t / d * (Math.PI / 2));
    },
    easeInOutSine : function (t, d) {
        return -0.5 * (Math.cos(Math.PI * t / d) - 1);
    },
    easeInExpo : function (t, d) {
        return (t == 0) ? 1 : Math.pow(2, 10 * (t / d - 1));
    },
    easeOutExpo : function (t, d) {
        return (t == d) ? 1 : (-Math.pow(2, -10 * t / d) + 1);
    },
    easeInOutExpo : function (t, d) {
        if (t == 0)
            return 0;
        if (t == d)
            return 1;
        if ((t /= d / 2) < 1)
            return 0.5 * Math.pow(2, 10 * (t - 1));
        return 0.5 * (-Math.pow(2, -10 * --t) + 2);
    },
    easeInCirc : function (t, d) {
        return  - (Math.sqrt(1 - (t /= d) * t) - 1);
    },
    easeOutCirc : function (t, d) {
        return Math.sqrt(1 - (t = t / d - 1) * t);
    },
    easeInOutCirc : function (t, d) {
        if ((t /= d / 2) < 1)
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    easeInElastic : function (t, d) {},
    easeOutElastic : function (t, d) {},
    easeInOutElastic : function (t, d) {},
    easeInBack : function (t, d) {},
    easeOutBack : function (t, d) {},
    easeInOutBack : function (t, d) {},
    easeInBounce : function (t, d) {},
    easeOutBounce : function (t, d) {},
    easeInOutBounce : function (t, d) {},
    withAction : function(action, name){
         action.getTime = function(time){
            return Easing[name](time,this.duration);
         };
         return action;
    }
};
