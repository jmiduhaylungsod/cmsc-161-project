gl.enable(gl.DEPTH_TEST);
// gl.enable(gl.CULL_FACE);
console.log(gl.canvas.clientWidth);
function drawScene() {
    gl.clearColor(0,0,0, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniformMatrix4fv(uModelMatrixPointer, false, new Float32Array(modelMatrix));
	gl.uniformMatrix4fv(uViewMatrixPointer, false, new Float32Array(viewMatrix));
	gl.uniformMatrix4fv(uProjectionMatrixPointer, false, new Float32Array(projectionMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube_1), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aPositionPointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPositionPointer);
    // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lefteye_normals_front), gl.STATIC_DRAW);
    // gl.vertexAttribPointer(aNormalPointer, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aNormalPointer);
    gl.uniform4f(uColorPointer, 1, 0.5, 0.23, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube_2), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aPositionPointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPositionPointer);
    // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lefteye_normals_front), gl.STATIC_DRAW);
    // gl.vertexAttribPointer(aNormalPointer, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aNormalPointer);
    gl.uniform4f(uColorPointer, 0.5, 0.1, 0.73, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube_3), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aPositionPointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPositionPointer);
    // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lefteye_normals_front), gl.STATIC_DRAW);
    // gl.vertexAttribPointer(aNormalPointer, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aNormalPointer);
    gl.uniform4f(uColorPointer, 0, 0.6, 1, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube_4), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aPositionPointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPositionPointer);
    // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lefteye_normals_front), gl.STATIC_DRAW);
    // gl.vertexAttribPointer(aNormalPointer, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aNormalPointer);
    gl.uniform4f(uColorPointer, 0.3, 1, 0.7, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    // glMatrix.mat4.rotateY(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(0.3));
    if (keys['ArrowUp']) {
        glMatrix.mat4.rotateX(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(-0.2));
    }
    if (keys['ArrowDown']) {
        glMatrix.mat4.rotateX(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(0.2));
    }
    if (keys['ArrowLeft']) {
        glMatrix.mat4.rotateY(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(-0.2));
    }
    if (keys['ArrowRight']) {
        glMatrix.mat4.rotateY(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(0.2));
    }
    requestAnimationFrame(drawScene);	
}

drawScene();