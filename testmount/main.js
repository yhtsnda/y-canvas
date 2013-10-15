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
var gl = document.getElementById('app').getContext('webgl');
var program = createProgram(gl);
gl.useProgram(program);

gl.positionAttri = gl.getAttribLocation(program, "pos");
gl.colorAttri = gl.getAttribLocation(program, 'texVertex');

gl.enableVertexAttribArray(gl.positionAttri);
gl.enableVertexAttribArray(gl.colorAttri);

gl.positionBuffer = gl.createBuffer();
gl.textureCoodBuffer = gl.createBuffer();

var textureCood = [];
var hill = [];
var delta = 100;
var max = 8;
var numHillPart = 100;
var hmid = x = 400;
var x = 0,
    y = hmid;

var deltaHillPart = delta / numHillPart;
var deltaHillAngle = Math.PI / numHillPart;

var prex, prey;
hill.parts = [];
for (var i = 0; i < max; i++) {
    prex = x;
    prey = y;
    hill.push(prex);
    hill.push(prey);

    x += delta;
    y = hmid + parseInt(Math.random() * 300 - 150);
    var ymid = (y + prey) / 2;
    var ampl = (prey - y) / 2;
    var r = Math.random(),
        g = Math.random(),
        b = Math.random();
    for (var index = 0; index < numHillPart; index++) {
        var _x = prex + index * deltaHillPart;
        var _y = ymid + ampl * Math.cos(deltaHillAngle * index);
        hill.parts.push(_x);
        hill.parts.push(_y);
        hill.parts.push(_x);
        hill.parts.push(0);
        textureCood.push((index -1)/ numHillPart,1);
        //textureCood.push(0,0);
        textureCood.push(index/ numHillPart, 0);
        //textureCood.push(1,1);
    }
};

gl.bindBuffer(gl.ARRAY_BUFFER, gl.textureCoodBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCood), gl.STATIC_DRAW);

gl.vertexAttribPointer(gl.colorAttri, 2, gl.FLOAT, false, 0, 0);


/*
//draw hill line
gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
    hill
), gl.STATIC_DRAW);

gl.vertexAttribPointer(gl.positionAttri, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.LINE_STRIP, 0, hill.length / 2);
*/

gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
    hill.parts
), gl.STATIC_DRAW);

gl.vertexAttribPointer(gl.positionAttri, 2, gl.FLOAT, false, 0, 0);

var tex = gl.getUniformLocation(program, "tex");
//gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 32, 32, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array(dat));
var img = document.getElementById('hello');
img.onload = function(){
    try{
        //gl.drawArrays(gl.TRIANGLE_STRIP, 0, hill.parts.length / 2);
        var texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.uniform1i(tex, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, hill.parts.length / 2);
    }catch(e){
        debugger
    }
};
img.src='stripe.png';