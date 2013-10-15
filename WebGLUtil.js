var WebGLUtil = {
    init: function(gl) {
        if (!gl.textureProgram) {
            function createShader(str, type, gl) {
                var shader = gl.createShader(type);
                gl.shaderSource(shader, str);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
                }
                return shader;
            }

            function createProgram(gl) {
                var program = gl.createProgram();
                gl.attachShader(program, createShader(document.getElementById('vs').textContent, gl.VERTEX_SHADER, gl));
                gl.attachShader(program, createShader(document.getElementById('fs').textContent, gl.FRAGMENT_SHADER, gl));
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
            gl.texVertexAttri = gl.getAttribLocation(program, 'texVertex');

            gl.enableVertexAttribArray(gl.positionAttri);
            gl.enableVertexAttribArray(gl.colorAttri);
            gl.enableVertexAttribArray(gl.texVertexAttri);

            gl.positionBuffer = gl.createBuffer();
            gl.colorBuffer = gl.createBuffer();
            gl.texVertexBuffer = gl.createBuffer();

            //gl.texture = gl.createTexture();
            gl.rotate = gl.getUniformLocation(program, "rotate");
            gl.translate = gl.getUniformLocation(program, 'translate');
            gl.anchor = gl.getUniformLocation(program, 'anchor');
            gl.scale = gl.getUniformLocation(program, 'scale');
            gl.resolution = gl.getUniformLocation(program, 'resolution');
            gl.usetexture = gl.getUniformLocation(program, 'useTexture');
            gl.alpha = gl.getUniformLocation(program, 'alpha');
            gl.position = gl.getUniformLocation(program, 'position');
            gl.size = gl.getUniformLocation(program, 'size');

            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);

            gl.activeTexture(gl.TEXTURE0);
            gl.textureProgram = program;
        }
        return gl.textureProgram;
    },
    updateTexture: function(gl, image, texture){
        gl.textures = gl.textures || {};
        var texture = texture || gl.textures[image.src];
        if(!texture){
            this.createTextureFromImage(gl, image);
            return;
        }
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        //gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    },
    createTextureFromImage: function(gl, image) {
        gl.textures = gl.textures || {};
        if (gl.textures[image.src]) {
            return gl.textures[image.src];
        }
        var texture = gl.createTexture();
        gl.textures[image.src] = texture;
        this.updateTexture(gl, image, texture);
        return texture;
    },
    drawText: function(gl, clear, obj, text, style, pos, maxWidth, maxHeight){
        obj.textCanvas = obj.textCanvas || (function(){
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.src = Math.random();
            //document.body.appendChild(canvas);
            return canvas;
        })();
        var canvas = obj.textCanvas;
        var ctx = canvas.getContext('2d');
        if(clear){
            ctx.clearRect(0, 0, obj.textCanvas.width, obj.textCanvas.height);
        }
        for(var prop in style){
            ctx[prop] = style[prop];
        }
        var width = Math.ceil(ctx.measureText(text).width);
        var lineHeight = /(\d+)px/ig.exec(ctx.font)[1];
        var lines = maxWidth ? Math.ceil(width / maxWidth) : 1;
        width = maxWidth || width;
        if(canvas.width != width){
            canvas.width = width;
        }
        height = maxHeight || lines * lineHeight;
        if(canvas.height != height){
            canvas.height = height;
        }
        ctx.fillText(text, 0, 0);
        this.updateTexture(gl, obj.textCanvas);
        this.render(gl, obj, obj.alpha(), obj.textCanvas, null, obj.anchor(), pos, obj.rotate(), null, obj.scale(), obj.textCanvas.width, obj.textCanvas.height, null, null);
    },
    render: function(gl, obj, alpha, img, size, anchor, pos, rotate, translate, scale, width, height, points, colors) {
        /*

        （1）创建着色器：glCreateShader

        （2）指定着色器源代码字符串：glShaderSource

        （3）编译着色器：glCompileShader

        （4）创建着色器可执行程序：glCreateProgram

        （5）向可执行程序中添加着色器：glAttachShader

        （6）链接可执行程序：glLinkProgram

        （7）使用可执行程序：glUseProgram

        */

        if (!img) {
            var program = this.init(gl);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                colors
            ), gl.DYNAMIC_DRAW);
            gl.vertexAttribPointer(gl.colorAttri, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                points
            ), gl.DYNAMIC_DRAW);

            gl.vertexAttribPointer(gl.positionAttri, 2, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.texVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.DYNAMIC_DRAW);

            gl.vertexAttribPointer(gl.texVertexAttri, 2, gl.FLOAT, false, 0, 0);

            gl.bindTexture(gl.TEXTURE_2D, null);

            gl.uniform1i(gl.usetexture, 0);
            gl.uniform2f(
                gl.resolution,
                getDom().width,
                getDom().height
            );
            gl.uniform1f(gl.alpha, alpha);

            gl.uniform2f(
                gl.anchor,
                0,
                0
            );
            gl.uniform2f(gl.scale, 1, 1);
            gl.uniform2f(gl.rotate, Math.sin(rotate), Math.cos(rotate));
            gl.uniform2f(gl.translate, 0, 0);

            gl.uniform1f(gl.alpha, alpha);
            gl.uniform2f(gl.size, width, height);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length / 2);
        } else {
            width = width || (size ? size[2] : img.width);
            height = height || (size ? size[3] : img.height);
            var program = this.init(gl);

            /* 图片在原图中的裁剪位置 position buffer*/
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
            //左上 右上 左下 右下
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                size ? [
                    size[0], size[3] * 2,
                    size[2] * 2, size[3] * 2,
                    size[0], size[1],
                    size[2] * 2, size[1]
                ] : [
                    //左上
                    0, height * 2,
                    //右上
                    width * 2, height * 2,
                    //左下
                    0, 0,
                    //右下
                    width * 2, 0
                ]), gl.DYNAMIC_DRAW);

            gl.vertexAttribPointer(gl.positionAttri, 2, gl.FLOAT, false, 0, 0);

            /* color buffer*/
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                [0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1]), gl.DYNAMIC_DRAW);

            gl.vertexAttribPointer(gl.colorAttri, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.texVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                size ?
                [
                    size[0] / img.width, size[1] / img.height, (size[0] + size[2]) / img.width, size[1] / img.height,
                    size[0] / img.width, (size[1] + size[3]) / img.height, (size[0] + size[2]) / img.width, (size[1] + size[3]) / img.height
                ] :
                [0, 0, 1, 0, 0, 1, 1, 1]), gl.DYNAMIC_DRAW);

            gl.vertexAttribPointer(gl.texVertexAttri, 2, gl.FLOAT, false, 0, 0);

            obj.texture = this.createTextureFromImage(gl, img);
            //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.bindTexture(gl.TEXTURE_2D, obj.texture);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            gl.uniform1i(gl.usetexture, 1);
            gl.uniform2f(
                gl.resolution,
                getDom().width,
                getDom().height
            );
            gl.uniform2f(
                gl.anchor,
                width * 2 * anchor.x,
                height * 2 * anchor.y
            );
            gl.uniform2f(gl.scale, scale.x, scale.y);
            gl.uniform2f(gl.rotate, Math.sin(rotate), Math.cos(rotate));
            gl.uniform2f(gl.translate, pos.x * 2, pos.y * 2 + height * 2);
            gl.uniform1f(gl.alpha, alpha);
            gl.uniform2f(gl.size, width, height);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
    }
};