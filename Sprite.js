function Sprite() {
    Node.apply(this, arguments);
}
Sprite.prototype = mixIn(Node.prototype, {});

(function() {
    function defaultFunc() {
        return this;
    }
    ['onInit', 'afterInit', 'onUpdate', '_update', 'afterUpdate', 'onRender', '_render', 'afterRender', 'onClear', '_clear', 'afterClear', 'onHandleEvent', '_handleEvent', 'afterHandleEvent'].some(function(prop) {
        Sprite.prototype[prop] = defaultFunc;
    });
})();
Sprite.prototype.init = function() {
    this.onInit.apply(this, arguments);
    this._init.apply(this, arguments);
    this.afterInit.apply(this, arguments);
};
Sprite.prototype._init = function(settings) {
    forEach(settings, function(setting, prop) {
        if (isFunction(this[prop])) {
            this[prop](setting);
        } else {
            this[prop] = setting;
        }
    }, this);
    return this;
};
Sprite.prototype.update = function(ctx) {
    this.handleEvent(ctx);
    this.onUpdate(ctx);
    this.performAction(ctx);
    this.performTransform(ctx);
    this._update(ctx);
    this.render(ctx);
    this.updateChildren(ctx);
    this.afterUpdate(ctx);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
};
Sprite.prototype.render = function(ctx) {
    this.onRender(ctx);
    this._render(ctx);
    this.afterRender(ctx);
};
Sprite.prototype._render = function(ctx) {
    if (this.getImage()) {
        this.drawWithImage(ctx, this.getImage());
    } else {
        return this.draw(ctx);
    }
};
Sprite.prototype.performTransform = function(ctx) {
    /*
    a = ScaleX    b = SkewX    c = SkewY
    d = ScaleY    e = TranslateX    f = TranslateY
     */
    ctx.globalAlpha = this.alpha();
    /*var matrix = new Matrix([
    [1,0,this.actualPosition().x + this.width() * this.anchor().x],[0,1,this.actualPosition().y + this.height() * this.anchor().y],[0,0,1]]);*/
    ctx.translate(this.actualPosition().x + this.width() * this.anchor().x, this.actualPosition().y + this.height() * this.anchor().y);
    if (this.rotate() !== 0) {
        ctx.rotate(this.rotate());
        /* matrix.multi(new Matrix(
        [[Math.cos(this.rotate()),-Math.sin(this.rotate()),0],
        [Math.sin(this.rotate()),Math.cos(this.rotate()),0],
        [0,0,1]])); */
    }

    if (this.skew().x !== 1 || this.skew().y !== 1) {
        ctx.transform(1, Math.tan(this.skew().y), Math.tan(this.skew().x), 1, 0, 0);
        /* matrix.multi(new Matrix(
        [[1,Math.tan(this.skew().x),0],
        [Math.tan(this.skew().y),1,0],
        [0,0,1]])); */
    }

    if (this.scale().x !== 1 || this.scale().y !== 1) {
        ctx.scale(this.scale().x, this.scale().y);
        /* matrix.multi(new Matrix(
        [[this.scale().x,0,0],
        [0,this.scale().y,0],
        [0,0,1]])); */
    }
    if (this.transform() && this.transform().length >= 6) {
        ctx.transform(this.transform()[0], this.transform()[1], this.transform()[2], this.transform()[3], this.transform()[4], this.transform()[5]);
    }

    ctx.translate(-this.actualPosition().x - this.width() * this.anchor().x, -this.actualPosition().y - this.height() * this.anchor().y);

    /* matrix.multi(new Matrix([[1,0,-this.actualPosition().x - this.width() * this.anchor().x],[0,1,-this.actualPosition().y - this.height() * this.anchor().y],[0,0,1]]));
    ctx.transform(matrix[0][0], matrix[0][1], matrix[0][2], matrix[1][0], matrix[1][1], matrix[1][2]); */
};
Sprite.prototype.performAction = function(ctx) {
    exec(this.actionManager, 'update');
};
Sprite.prototype.drawWithImage = function(ctx, image) {
    var size = image.size, //this.imageSizes()[this.imageIndex()],
        pos = this.actualPosition(),
        scale = this.scale(),
        img = ImageEngine.get(image.img);
    if (size) {
        ctx.drawImage(img, size[0], size[1], size[2], size[3], pos.x, pos.y, size[2], size[3]);
    } else {
        ctx.drawImage(img, pos.x, pos.y);
        //console.log(pos.x / scale.x, pos.y / scale.y);
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
Sprite.prototype.draw = function(ctx) {};

Sprite.prototype.handleEvent = function() {
    this.onHandleEvent();
    EventSystem.handleEventWithTarget(this);
    this._handleEvent();
    this.afterHandleEvent();
};