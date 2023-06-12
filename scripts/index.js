/*
    MAIN SCRIPT
        used by index.html, uses rain and other shit
 */
let allRain = [];

function draw(gl)
{
    // we use allrain in draw
    createRain(allRain, 1, 1, (1,1,1,1));

    // setting the data for the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allRain), gl.STATIC_DRAW);

    // clear the screen
    gl.clearColor(-1.0, -1.0, -1.0 , 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    console.log("cleared screen");
    console.log(allRain);
    
    gl.drawArrays(gl.LINE, 0, allRain.length);

}