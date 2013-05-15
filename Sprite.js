function Sprite() {
    Node.apply(this, arguments);
}
Sprite.prototype = new BaseObject;
Sprite.prototype.init = function () {
    this.exec('onInit', arguments);
    this.exec('_init', arguments);
    this.exec('afterInit', arguments);
};
Sprite.prototype.update = function (ctx) {
    ctx.save();
    this.handleEvent(ctx);
    this.exec('onUpdate', ctx);
    this.performAction(ctx);
    this.performTransform(ctx);
    this.exec('_update', ctx);
    this.updateChildren(ctx);
    this.render(ctx);
    this.exec('afterUpdate', ctx);
    ctx.restore();
};
Sprite.prototype.render = function (ctx) {
    this.exec('onRender', ctx);
    this.exec('_render', ctx);
    this.exec('afterRender', ctx);
};
Sprite.prototype.clear = function () {
    this.exec('onClear', arguments);
    this.exec('_clear', arguments);
    this.exec('afterClear', arguments);
};
Sprite.prototype._render = function (ctx) {
    if (this.getImage()) {
        this.drawWithImage(ctx, this.getImage());
    } else {
        return this.draw(ctx);
    }
};
Sprite.prototype.performTransform = function (ctx) {
    /*
    a = ScaleX    b = SkewX    c = SkewY
    d = ScaleY    e = TranslateX    f = TranslateY
     */
    //TODO need to be rewrited
    if (!!this.rotate()) {
        ctx.translate(this.actualPosition().x + this.width() * this.anchor().x, this.actualPosition().y + this.height() * this.anchor().y);
        ctx.rotate(this.rotate());
        ctx.translate(-this.actualPosition().x - this.width() * this.anchor().x, -this.actualPosition().y - this.height() * this.anchor().y);
    }
    if (this.scale().x !== 1 || this.scale().y !== 1) {
        ctx.scale(this.scale().x, this.scale().y);
    }
    if (this.skew().x !== 1 || this.skew().y !== 1) {
        ctx.scale(this.skew().x, this.skew().y);
    }
    if (this.transform() && this.transform().length >= 6) {
        ctx.transform(this.transform()[0], this.transform()[1], this.transform()[2], this.transform()[3], this.transform()[4], this.transform()[5]);
    }
};
Sprite.prototype.performAction = function (ctx) {
    exec(this.actionManager, 'update');
};
Sprite.prototype.drawWithImage = function (ctx, image) {
    var imageSize = this.imageSizes()[this.imageIndex()],
        pos = this.actualPosition(),
        scale = this.scale();
    if (imageSize) {
        ctx.drawImage(image, imageSize[0], imageSize[1], imageSize[2], imageSize[3], pos.x / scale.x, pos.y / scale.y, imageSize[2], imageSize[3]);
    } else {
        ctx.drawImage(image, pos.x / scale.x, pos.y / scale.y);
    }
    /*
    剪切图像，并在画布上定位被剪切的部分：
    context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    参数值
    参数    描述
    img    规定要使用的图像、画布或视频。
    sx    可选。开始剪切的 x 坐标位置。
    sy    可选。开始剪切的 y 坐标位置。
    swidth    可选。被剪切图像的宽度。
    sheight    可选。被剪切图像的高度。
    x    在画布上放置图像的 x 坐标位置。
    y    在画布上放置图像的 y 坐标位置。
    width    可选。要使用的图像的宽度。（伸展或缩小图像）
    height    可选。要使用的图像的高度。（伸展或缩小图像）
     */
};
Sprite.prototype.draw = function (ctx) {};

Sprite.prototype.handleEvent = function () {
    this.exec('onHandleEvent');
    EventSystem.handleEventWithTarget(this);
    this.exec('_handleEvent');
    this.exec('afterHandleEvent');
};