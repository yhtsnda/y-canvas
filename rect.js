require(['point'], function(Point) {
    function Rect() {
        this.reset.apply(this, arguments);
    };
    Rect.prototype = {
        reset: function(x, y, w, h) {
            this.x = x || 0;
            this.y = y || 0;
            this.w = w || 0;
            this.h = h || 0;
            return this;
        },
        mid: function() {
            return new Point(this.x + this.w / 2, this.y + this.h / 2);
        },
        right: function() {
            return this.x + this.w;
        },
        left: function() {
            return this.x;
        },
        top: function() {
            return this.y;
        },
        bottom: function() {
            return this.y + this.h;
        },
        equal: function(to) {
            return this === to ||
                (
                this.x === to.x &&
                this.y === to.y &&
                this.w === to.w &&
                this.h === to.h
            );
        }
    };
    Rect.byPoints = function(from, to) {
        var x = Math.min(from.x, to.x),
            y = Math.min(from.y, to.y),
            w = Math.abs(from.x - to.x),
            h = Math.abs(from.y - to.y);
        return new Rect(x, y, w, h);
    };
    Rect.byPointSize = function(point, size) {
        var x = point.x,
            y = point.y,
            w = size.w,
            h = size.h;
        return new Rect(x, y, w, h);
    };
    return Rect;
});
