/*
    MAIN SCRIPT
        used by index.html, uses rain and other shit
 */

import * as RAIN from "rain.js";

export let allRain;

export function draw(gl)
{
    // we use allrain in draw
    RAIN.createRain(allRain);

    // clear the screen
    gl.clearColor(-1.0, -1.0, -1.0 , 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    console.log("cleared screen");
    
    gl.drawArrays(gl.LINE, 0, allRain.length);

}