/*
1.sum和,difference差,product积 ,quotient商
2.surface area 表面积，volume体积，the length of the side边长,lateral area 侧面积,altitude高
3.rectangle长方形,square正方形,circular cylinder圆柱体,cone圆锥, triangle三角形,polygon多边形,rectangular solid长方体,cube立方体,circle圆
4.add，plus加 ,subtract减 ,multiply,times乘 ,divide除
 */
function PointMake(x, y) {
    return {
        x : x,
        y : y
    };
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
    return PointMake(a.x + b.x, a.y + b.y);
}
function PointDiff(a, b) {
    return PointMake(a.x - b.x, a.y - b.y);
};
function PointMulti(a, n) {
    return PointMake(a.x * n, a.y * n);
};
function PointDevide(a, n) {
    return PointMake(a.x / n, a.y / n);
};
