define('easing', [], function() {
    return Easing = {
        easeInQuad: function(t, d) {
            return (t /= d) * t
        },
        easeOutQuad: function(t, d) {
            return -(t /= d) * (t - 2)
        },
        easeInOutQuad: function(t, d) {
            if ((t /= d / 2) < 1)
                return 0.5 * t * t;
            return -0.5 * ((--t) * (t - 2) - 1);
        },
        easeInCubic: function(t, d) {
            return (t /= d) * t * t;
        },
        easeOutCubic: function(t, d) {
            return (t = t / d - 1) * t * t + 1;
        },
        easeInOutCubic: function(t, d) {
            if ((t /= d / 2) < 1)
                return 0.5 * t * t * t;
            return 0.5 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function(t, d) {
            return (t /= d) * t * t * t;;
        },
        easeOutQuart: function(t, d) {
            return -((t = t / d - 1) * t * t * t - 1);
        },
        easeInOutQuart: function(t, d) {
            if ((t /= d / 2) < 1)
                return 0.5 * t * t * t * t;
            return -0.5 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function(t, d) {
            return (t /= d) * t * t * t * t;
        },
        easeOutQuint: function(t, d) {
            return (t = t / d - 1) * t * t * t * t + 1;
        },
        easeInOutQuint: function(t, d) {
            if ((t /= d / 2) < 1)
                return 0.5 * t * t * t * t * t;
            return 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function(t, d) {
            return 1 - Math.cos(t / d * (Math.PI / 2));
        },
        easeOutSine: function(t, d) {
            return Math.sin(t / d * (Math.PI / 2));
        },
        easeInOutSine: function(t, d) {
            return -0.5 * (Math.cos(Math.PI * t / d) - 1);
        },
        easeInExpo: function(t, d) {
            return (t == 0) ? 1 : Math.pow(2, 10 * (t / d - 1));
        },
        easeOutExpo: function(t, d) {
            return (t == d) ? 1 : (-Math.pow(2, -10 * t / d) + 1);
        },
        easeInOutExpo: function(t, d) {
            if (t == 0)
                return 0;
            if (t == d)
                return 1;
            if ((t /= d / 2) < 1)
                return 0.5 * Math.pow(2, 10 * (t - 1));
            return 0.5 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function(t, d) {
            return -(Math.sqrt(1 - (t /= d) * t) - 1);
        },
        easeOutCirc: function(t, d) {
            return Math.sqrt(1 - (t = t / d - 1) * t);
        },
        easeInOutCirc: function(t, d) {
            if ((t /= d / 2) < 1)
                return -0.5 * (Math.sqrt(1 - t * t) - 1);
            return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function(t, d) {
            if (t == 0)
                return 0;
            if ((t /= d) == 1)
                return 1;
            var p = d * .3,
                a = 1,
                s = p / 4;
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p));
        },
        easeOutElastic: function(t, d) {
            if (t == 0)
                return 0;
            if ((t /= d) == 1)
                return 1;
            var p = d * .3,
                a = 1,
                s = p / 4;
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + 1;
        },
        easeInOutElastic: function(t, d) {
            if (t == 0)
                return 0;
            if ((t /= d / 2) == 2)
                return 1;
            var p = d * (.3 * 1.5),
                a = 1,
                s = p / 4;
            if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + 1;
        },
        easeInBack: function(t, d) {
            return (t /= d) * t * ((1.70158 + 1) * t - 1.70158);
        },
        easeOutBack: function(t, d) {
            return (t = t / d - 1) * t * ((1.70158 + 1) * t + 1.70158) + 1;
        },
        easeInOutBack: function(t, d) {
            var s = 1.70158;
            if ((t /= d / 2) < 1)
                return 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s));
            return 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
        },
        easeInBounce: function(t, d) {
            return 1 - this.easeOutBounce(d - t, d);
        },
        easeOutBounce: function(t, d) {
            if ((t /= d) < (1 / 2.75)) {
                return (7.5625 * t * t);
            } else if (t < (2 / 2.75)) {
                return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
            } else if (t < (2.5 / 2.75)) {
                return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
            } else {
                return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
            }
        },
        easeInOutBounce: function(t, d) {
            if (t < d / 2)
                return this.easeInBounce(t * 2, d) * .5;
            return this.easeOutBounce(t * 2 - d, d) * .5 + .5;
        },
        withAction: function(action, name) {
            name && (action.getTime = function(time) {
                //var b = Easing[name](time, this.duration);
                //renderToCanvas(time / this.duration, b);
                //console.log(time)
                return Easing[name](time, this.duration);
            });
            return action;
        }
    };
    /*
function renderToCanvas(a, b) {
    var dom = document.getElementById('easing') || (function () {
            var dom = document.createElement('canvas');
            dom.width = 500;
            dom.height = 500;
            dom.id = 'easing';
            document.body.appendChild(dom);
            return dom;
        })();
    var ctx = dom.getContext('2d');
    ctx.beginPath();
    ctx.arc((dom.height - 200) * a + 100, (dom.height - 200) * (1 - b) + 100, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
} */
});
