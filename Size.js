function SizeMake(width,heiht){
	return {w:width,h:height};
}
function SizeZero(){
	return SizeMake(0,0);
}
function SizeEqual(sizeA,sizeB){
	return sizeA.w === sizeB.w && sizeA.h === sizeB.h;
}