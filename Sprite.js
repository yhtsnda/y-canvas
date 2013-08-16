var globaluuid = 0;

function Sprite() {
    Node.apply(this, arguments);
    this.id = globaluuid++;
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
        if (prop.indexOf('_') === 0 && isFunction(this[prop.substring(1)])) {
            this[prop.substring(1)] = setting;
        } else if (isFunction(this[prop])) {
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
    ctx instanceof CanvasRenderingContext2D && this.performTransform(ctx);
    this._update(ctx);
    this.render(ctx);
    this.afterUpdate(ctx);
    this.updateChildren(ctx);

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
        ctx instanceof CanvasRenderingContext2D ? this.drawWithImage(ctx, this.getImage()) : this.drawWithImageGL(ctx, this.getImage());
    } else {
        ctx instanceof CanvasRenderingContext2D ? this.draw(ctx) : this.drawGL(ctx);
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
function init(gl) {
    if (!gl.program) {
        function createShader(str, type,gl){
            var shader = gl.createShader(type);
            gl.shaderSource(shader, str);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
              alert( "Error compiling shader: " + gl.getShaderInfoLog(shader));
            }
            return shader;
        }
        function createProgram(gl){
            var program = gl.createProgram();
            gl.attachShader(program, createShader(document.getElementById('vs').textContent, gl.VERTEX_SHADER,gl));
            gl.attachShader(program, createShader(document.getElementById('fs').textContent, gl.FRAGMENT_SHADER,gl));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
              alert("Unable to initialize the shader program.");
            }
            return program;
        }
        var program = createProgram(gl);
        gl.useProgram(program);
        gl.positionAttri = gl.getAttribLocation(program, "pos");
        gl.colorAttri = gl.getAttribLocation(program, 'vertexColor');

        gl.enableVertexAttribArray(gl.positionAttri);
        gl.enableVertexAttribArray(gl.colorAttri);

        gl.positionBuffer = gl.createBuffer();
        gl.colorBuffer = gl.createBuffer();
        //gl.texture = gl.createTexture();
        gl.rotate = gl.getUniformLocation(program, "rotate");
        gl.translate = gl.getUniformLocation(program, 'translate');
        gl.anchor = gl.getUniformLocation(program, 'anchor');
        gl.scale = gl.getUniformLocation(program, 'scale');
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);

        gl.activeTexture(gl.TEXTURE0);
        gl.program = program;
    }
    return gl.program;
}

function createTextureFromImage(gl, image) {
    gl.textures = gl.textures || {};
    if (gl.textures[image.src]) {
        return gl.textures[image.src];
    }
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.textures[image.src] = texture;
    return texture;
}


Sprite.prototype.drawWithImageGL = function(gl, image) {
    /*

    （1）创建着色器：glCreateShader

    （2）指定着色器源代码字符串：glShaderSource

    （3）编译着色器：glCompileShader

    （4）创建着色器可执行程序：glCreateProgram

    （5）向可执行程序中添加着色器：glAttachShader

    （6）链接可执行程序：glLinkProgram

    （7）使用可执行程序：glUseProgram

    */
    var program = init(gl);
    var size = image.size,
        pos = this.actualPosition(),
        img = ImageEngine.get(image.img);
    /* 图片在原图中的裁剪位置 position buffer*/
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
    //左下 右下 左上 右上
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
        size ? [
            size[0] / img.width, size[1] / img.height,
            size[0] / img.width + size[2] * 2 / img.width, size[1] / img.height,
            size[0] / img.width, size[1] / img.height + size[3] * 2 / img.height,
            size[0] / img.width + size[2] * 2 / img.width, size[1] / img.height + size[3] * 2 / img.height
        ] : [
            0, this.height() * 2 / getDom().height,
            this.width() * 2 / getDom().width, this.height() * 2 / getDom().height,
            0, 0,
            this.width() * 2 / getDom().width, 0
        ]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(gl.positionAttri, 2, gl.FLOAT, false, 0, 0);

    /* color buffer*/
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(gl.colorAttri, 2, gl.FLOAT, false, 0, 0);

    this.texture = createTextureFromImage(gl, img);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    gl.uniform2f(
        gl.anchor,
        this.width() * 2 * this.anchor().x / getDom().width,
        this.height() * 2 * this.anchor().y / getDom().height
    );
    gl.uniform2f(gl.scale, this.scale().x, this.scale().y);
    gl.uniform2f(gl.rotate, Math.sin(this.rotate()), Math.cos(this.rotate()));
    gl.uniform2f(gl.translate, -1 + this.actualPosition().x * 2 / getDom().width,
        1 - (this.actualPosition().y * 2 + this.height() * 2) / getDom().height // - this.height()  /getDom().height - (this.actualPosition().y + (this.anchor().y + 0.5)* this.height())/ getDom().height
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

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
Sprite.prototype.drawGL = function(ctx) {};

Sprite.prototype.handleEvent = function() {
    this.onHandleEvent();
    EventSystem.handleEventWithTarget(this);
    this._handleEvent();
    this.afterHandleEvent();
};