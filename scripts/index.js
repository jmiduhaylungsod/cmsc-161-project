/*
    MAIN SCRIPT
        used by index.html, uses rain and other shit
 */
let allRain = [];

function draw(gl)
{
    // we use allrain in draw
    createRain(allRain, 1, 1, (1,1,1,1));

    console.log("cleared screen");
    
    gl.drawArrays(gl.LINE, 0, allRain.length);

}


function translate(translate, transformMatrix)
{
    // we basically remember the old transform matrix and add that with our new translation value.
    for(let i=0;i<transformMatrix.length;i++)
    {
        transformMatrix[i] = transformMatrix[i] + translate[i];
    }
}
