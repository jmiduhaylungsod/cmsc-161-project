//Function for creating and compiling shader programs
function createShader (gl, type, sourceCode) {
	// Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
	var shader = gl.createShader( type );
	gl.shaderSource( shader, sourceCode );
	gl.compileShader( shader );
  
	if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
	  var info = gl.getShaderInfoLog( shader );
	  throw 'Could not compile WebGL program. \n\n' + info;
	}
	return shader;
}


const canvas = document.getElementById("canvas");
if(!canvas){
    console.log("Canvas element with specified ID ('canvas') cannot be found.");
}

//Setting up the WebGL Context
const gl = canvas.getContext('webgl2');
const vertexShaderSource = document.querySelector('#vertex-shader').text;
const fragmentShaderSource = document.querySelector('#fragment-shader').text;
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//Creation and initialization of GL program 
var program = gl.createProgram();

// Attach pre-existing shaders
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// Link program
gl.linkProgram(program);

if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
    var info = gl.getProgramInfoLog(program);
    throw 'Could not compile WebGL program. \n\n' + info;
}

// set the program created earlier
gl.useProgram(program);

//---<Declaration of pointers to the attributes>---
//attributes
const aPositionPointer = gl.getAttribLocation(program, 'a_position');
//const aColorPointer = gl.getAttribLocation(program, 'a_color');
//uniforms
const uColorPointer = gl.getUniformLocation(program, 'u_color');
const uModelMatrixPointer = gl.getUniformLocation(program, 'u_model_matrix');
const uViewMatrixPointer = gl.getUniformLocation(program, 'u_view_matrix');
const uProjectionMatrixPointer = gl.getUniformLocation(program, 'u_projection_matrix');

// camera/view matrix
const viewMatrix = glMatrix.mat4.create();
glMatrix.mat4.lookAt(viewMatrix, [0,0,0], [0,0,0], [0,1,0]);

//model matrix;
const modelMatrix = glMatrix.mat4.create();
// glMatrix.mat4.rotateZ(modelMatrix, modelMatrix, glMatrix.glMatrix.toRadian(0));

//projection matrix
const projectionMatrix = glMatrix.mat4.create();
var left = -1; 
var right = 1; 
var bottom = -1; 
var top = 1;
var fov = 0.7;
var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
var near = 0.1; 
var far = 100;
glMatrix.mat4.perspective(projectionMatrix, fov, aspect, Number(near), Number(far));	
// glMatrix.mat4.ortho(projectionMatrix, left, right, bottom, top, near, far);

//cube buffer
var cubeBuffer = gl.createBuffer();

