
function Sprite() {
    Node.apply(this, arguments);
}
Sprite.prototype = mix(Node.prototype, {
    update: function() {
        this.handleEvent();
        this.onUpdate();
        this.updateAction();
        this.performTransform.apply(this, arguments);
        this.render.apply(this, arguments);
        this.restoreTransform.apply(this, arguments);
        this.updateChildren.apply(this, arguments);
        this.restoreAlpha.apply(this, arguments);
    },
    onUpdate: function() {},
    draw: function() {},
    drawGL: function() {},
    handleEvent: function() {
        EventSystem.handle(this);
    },
    updateAction: function() {
        exec(this.actionManager, 'update');
    },
    performTransform: function(ctx) {
        /*
        a = ScaleX    b = SkewX    c = SkewY
        d = ScaleY    e = TranslateX    f = TranslateY
        */
        var alpha = this.alp(),
            pos = this.pos(),
            anchor = this.anchor,
            scale = this.scale,
            skew = this.skew,
            rotate = this.rotate,
            width = this.width,
            height = this.height,
            transform = this.transform;

        ctx.globalAlpha = alpha;
        ctx.translate(pos.x + width * anchor.x, pos.y + height * anchor.y);
        if (rotate !== 0) {
            ctx.rotate(rotate);
        }

        if (skew.x !== 1 || skew.y !== 1) {
            ctx.transform(1, Math.tan(skew.y), Math.tan(skew.x), 1, 0, 0);
        }

        if (scale.x !== 1 || scale.y !== 1) {
            ctx.scale(scale.x, scale.y);
        }

        if (transform && transform.length >= 6) {
            ctx.transform(transform[0], transform[1], transform[2], transform[3], transform[4], transform[5]);
        }

        ctx.translate(-pos.x - width * anchor.x, -pos.y - height * anchor.y);
    },
    restoreTransform: function(ctx) {
        if (ctx instanceof CanvasRenderingContext2D) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    },
    restoreAlpha: function(ctx) {
        if (ctx instanceof CanvasRenderingContext2D) {
            ctx.globalAlpha = 1;
        }
    },
    render: function(ctx) {
        var img = this.getImage();
        if (ctx instanceof CanvasRenderingContext2D) {
            img ? this.drawWithImage(ctx, img) : this.draw(ctx);
        } else {
            img ? this.drawWithImageGL(ctx, img) : this.drawGL(ctx);
        }
    },
    drawWithImageGL: function(gl, image) {
        WebGL.render(gl, this, this.alp(), Image.get(image.img), image.size, this.anchor(), this.pos(), this.rotate(), 0, this.scale(), this.width(), this.height());
    },
    drawWithImage: function(ctx, image) {
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
        var size = image.size,
            pos = this.pos(),
            scale = this.scale,
            img = Image.get(image.img);
        if (size) {
            ctx.drawImage(img, size[0], size[1], size[2], size[3], pos.x, pos.y, size[2], size[3]);
        } else {
            ctx.drawImage(img, pos.x, pos.y);
        }
    }
});