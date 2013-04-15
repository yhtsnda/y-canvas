function RectMakeBy2Points(pointA, pointB) {
	return RectMakeByPointAndSize(
		PointMake(Math.min(pointA.x, pointB.x), Math.min(pointA.y, pointB.y)),
		SizeMake(Math.abs(pointA.x - pointB.x), Math.abs(pointA.y - pointB.y)));
}
function RectMake(x, y, w, h) {
	return {
		x : x,
		y : y,
		w : w,
		h : h
	}
}
function RectMakeByPointAndSize(leftTopPoint, size) {
	return {
		x : leftTopPoint.x,
		y : leftTopPoint.y,
		w : size.w,
		h : size.h
	}
}
function RectZero() {
	return RectMake(0, 0, 0, 0);
}
function getRectMidPoint(rect) {
	return PointMake(rect.x + rect.w / 2, rect.y + rect.h / 2);
}
function RectEqual(rectA, rectB) {
	return rectA.x === rectB.x &&
	rectA.y === rectB.y &&
	rectA.w === rectB.w &&
	rectA.h === rectB.h;
}
