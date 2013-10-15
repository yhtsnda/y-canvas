/*
1.sum和,difference差,product积 ,quotient商
2.surface area 表面积，volume体积，the length of the side边长,lateral area 侧面积,altitude高
3.rectangle长方形,square正方形,circular cylinder圆柱体,cone圆锥, triangle三角形,polygon多边形,rectangular solid长方体,cube立方体,circle圆
4.add plus加 ,subtract减 ,multiply times乘 ,divide除
 */
function PointMake(x, y) {
    return new Point(x, y === undefined ? x : y);
}
function PointZero() {
    return PointMake(0, 0);
}
function PointEqual(pointA, pointB) {
    return pointA === pointB || (pointA.x === pointB.x && pointA.y === pointB.y);
}
function PointInRect(point, rect) {
    return point && rect && point.x > rect.x && point.x < (rect.x + rect.w) && point.y > rect.y && point.y < (rect.y + rect.h)
}
function PointSum(a, b) {
    return a.sum(b); //PointMake(a.x + b.x, a.y + b.y);
}
function PointDiff(a, b) {
    return a.diff(b); //PointMake(a.x - b.x, a.y - b.y);
};
function PointMulti(a, n) {
    return a.multi(n); //PointMake(a.x * n, a.y * n);
};
function PointDevide(a, n) {
    return a.devide(n); //PointMake(a.x / n, a.y / n);
};

function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.distanceTo = function (point) {
    return Math.sqrt((this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y));
};
Point.prototype.sum = function (to) {
    return PointMake(this.x + to.x, this.y + to.y);
};
Point.prototype.multi = function (n) {
    return PointMake(this.x * n, this.y * n);
};
Point.prototype.multiply = function (b) {
    return PointMake(this.x * b.x, this.y * b.y);
};
Point.prototype.devide = function (n) {
    return PointMake(this.x / n, this.y / n);
};
Point.prototype.diff = function (to) {
    return PointMake(this.x - to.x, this.y - to.y);
};

Point.prototype.add = function (to) {
    this.x += to.x;
    this.y += to.y;
    return this;
};
Point.prototype.multi2 = function (n) {
    this.x *= n;
    this.y *= n;
    return this;
};
Point.prototype.devide2 = function (n) {
    this.x /= n;
    this.y /= n;
    return this;
    return PointMake(this.x / n, this.y / n);
};
Point.prototype.diff2 = function (to) {
    this.x -= to.x;
    this.y -= to.y;
    return this;
};
Point.prototype.reset = function(x, y){
    this.x = x || 0;
    this.y = y || 0;
    return this;
};
Point.prototype.sub = function(a, b){
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
};
Point.prototype.rotate = function(angle){
    //var angle = 360*Math.random();
    var sina = Math.sin(angle);
    var cosa = Math.cos(angle);
    var tempx = this.x;
    var tempy = this.y;
    this.x = tempx * cosa - tempy * sina;
    this.y = tempx * sina + tempy * cosa;
    return this;
};
Point.prototype.addself = function(a, b){
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
};