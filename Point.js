/*
1.sum和,difference差,product积 ,quotient商
2.surface area 表面积，volume体积，the length of the side边长,lateral area 侧面积,altitude高
3.rectangle长方形,square正方形,circular cylinder圆柱体,cone圆锥, triangle三角形,polygon多边形,rectangular solid长方体,cube立方体,circle圆
4.add plus加 ,subtract减 ,multiply times乘 ,divide除
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype = {
    distanceTo: function(to) {
        var disx = (this.x - to.x),
            disy = (this.y - to.y);
        return Math.sqrt(disx * disx + disy * disy);
    },
    addNum: function(n) {
        this.x += n;
        this.y += n;
        return this;
    },
    add: function(to) {
        this.x += to.x;
        this.y += to.y;
        return this;
    },
    diffNum: function(n) {
        this.x -= n;
        this.y -= n;
        return this;
    },
    diff: function(to) {
        this.x -= to.x;
        this.y -= to.y;
        return this;
    },
    multiNum: function(n) {
        this.x *= n;
        this.y *= n;
        return this;
    },
    multiply: function(to) {
        this.x *= to.x;
        this.y *= to.y;
        return this;
    },
    devideNum: function(num) {
        if (num !== 0) {
            this.x /= num;
            this.y /= num;
        }
        return this;
    },
    devide: function(to) {
        if (to.x !== 0 && to.y !== 0) {
            this.x /= to.x;
            this.y /= to.y;
        }
        return this;
    },
    rotate: function(angle) {
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            x = this.x;
        y = this.y;
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    },
    reset: function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        return this;
    },
    equal: function(to) {
        return Point.equal(this, to);
    },
    inRect: function(rect) {
        return Point.inRect(this, rect);
    }
};

Point.multiNum = function(point, n) {
    return new Point(point.x * n, point.y * n);
};

Point.multiply = function(a, b) {
    return new Point(a.x * b.x, a.x * b.y);
};

Point.addNum = function(point, n) {
    return new Point(point.x + n, point.y + n);
};

Point.add = function(point, to) {
    return new Point(point.x + to.x, point.y + to.y);
};

Point.diffNum = function(point, n) {
    return new Point(point.x - n, point.y - n);
};

Point.diff = function(point, to) {
    return new Point(point.x - to.x, point.y - to.y);
};

Point.devideNum = function(point, n) {
    if (n !== 0) {
        return new Point(point.x / n, point.y / n);
    }
};

Point.devide = function(point, to) {
    if (to.x !== 0 && to.y !== 0) {
        return new Point(point.x / to.x, point.y / to.y);
    }
};

Point.distanceTo = function(from, to) {
    var disx = from.x - to.x,
        disy = from.y - to.y;
    return Math.sqrt(disx * disx + disy * disy);
};

Point.equal = function(from, to) {
    return from === to || (from.x === to.x && from.y === to.y);
};

Point.inRect = function(point, rect) {
    return point && rect &&
        point.x > rect.x && point.x < (rect.x + rect.w) &&
        point.y > rect.y && point.y < (rect.y + rect.h)
};