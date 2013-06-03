function SizeMake(width, height) {
    return new Size(width, height);
}
function SizeZero() {
    return SizeMake(0, 0);
}
function SizeEqual(sizeA, sizeB) {
    return sizeA === sizeB || (sizeA.w === sizeB.w && sizeA.h === sizeB.h);
}
function Size(w, h) {
    this.w = w;
    this.h = h;
}
Size.prototype.reset = function (w, h) {
    this.w = w;
    this.h = h;
    return this;
};
