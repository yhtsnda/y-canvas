var WebGLUtil = {
    init2: function(gl) {
        if (!gl.drawProgram) {
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
                gl.attachShader(program, createShader(document.getElementById('ovs').textContent, gl.VERTEX_SHADER, gl));
                gl.attachShader(program, createShader(document.getElementById('ofs').textContent, gl.FRAGMENT_SHADER, gl));
                gl.linkProgram(program);
                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    alert("Unable to initialize the shader program.");
                }
                return program;
            }
            var program = createProgram(gl);

            gl.pAttri = gl.getAttribLocation(program, "pos");
            gl.cAttri = gl.getAttribLocation(program, 'vertexColor');
            gl.colorresolution = gl.getUniformLocation(program, 'resolution');
            gl.enableVertexAttribArray(gl.pAttri);
            gl.enableVertexAttribArray(gl.cAttri);

            gl.pBuffer = gl.createBuffer();
            gl.cBuffer = gl.createBuffer();
            gl.drawProgram = program;
        }
        return gl.drawProgram;
    },
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

            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);

            gl.activeTexture(gl.TEXTURE0);
            gl.textureProgram = program;
        }
        return gl.textureProgram;
    },
    createTextureFromImage: function(gl, image) {
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

        //gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.textures[image.src] = texture;
        return texture;
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

        //a. obj.getImage()
        //b. obj.verticles
        if (!img) {
            var program = this.init(gl);

            //gl.useProgram(program);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                colors
            ), gl.STATIC_DRAW);
            gl.vertexAttribPointer(gl.colorAttri, 4, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                points
            ), gl.STATIC_DRAW);

            gl.vertexAttribPointer(gl.positionAttri, 2, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.texVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

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
            gl.uniform2f(gl.translate, 0, 0);/*
            gl.uniform1f(gl.alpha, alpha);*/
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length / 2);
        } else {
            img = ImageEngine.get(img);
            width = width || (size ? size[2] : img.width);
            height = height || (size ? size[3] : img.height);
            var program = this.init(gl);

            //gl.useProgram(program);
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
                ]), gl.STATIC_DRAW);

            gl.vertexAttribPointer(gl.positionAttri, 2, gl.FLOAT, false, 0, 0);

            /* color buffer*/
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                [0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1]), gl.STATIC_DRAW);

            gl.vertexAttribPointer(gl.colorAttri, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.texVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
                size ?
                [
                    size[0] / img.width, size[1] / img.height, (size[0] + size[2]) / img.width, size[1] / img.height,
                    size[0] / img.width, (size[1] + size[3]) / img.height, (size[0] + size[2]) / img.width, (size[1] + size[3]) / img.height
                ] :
                [0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);

            gl.vertexAttribPointer(gl.texVertexAttri, 2, gl.FLOAT, false, 0, 0);

            obj.texture = this.createTextureFromImage(gl, img);
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

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
    }
};