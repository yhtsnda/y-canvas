function createShader(gl, str, type) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, str/*document.getElementById(id).textContent*/);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
	}
	return shader;
}

function createProgram(gl) {
	var program = gl.createProgram();
	gl.attachShader(program, createShader(document.getElementById('vs').textContent, gl.VERTEX_SHADER));
	gl.attachShader(program, createShader(document.getElementById('fs').textContent, gl.FRAGMENT_SHADER));
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		alert("Unable to initialize the shader program.");
	}
	return program;
}
