function PointMake(x,y){
	return {x:x,y:y};
}
function PointZero(){
	return PointMake(0,0);
}
function PointEqual(pointA,pointB){
	return pointA.x === pointB.x && pointA.y === pointB.y;
}
function PointInRect(point,rect){
	return point.x > rect.x && point.x < (rect.x + rect.w) && point.y > rect.y && point.y < (rect.y + rect.h)
}