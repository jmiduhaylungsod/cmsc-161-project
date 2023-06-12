/*
    MAIN SCRIPT
        used by index.html, uses rain and other shit
 */
let allRain = [];

function draw(gl)
{
    // we use allrain in draw
    createRain(allRain);

    console.log("cleared screen");
    
    gl.drawArrays(gl.LINES, 0, allRain.length/8);    // 8 is size of individual element arrays (4 pos, 4 color)

}

