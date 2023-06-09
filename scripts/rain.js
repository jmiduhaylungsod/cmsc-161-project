/*
    RAIN.JS
        the rain things

    Note that, every update:
    > create new set of rain droplets
    > update existing set of rain droplets
 */

// get number between min to max (inclusive)
function randomRange(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createDrop(color, lineMaxVariation, lineLen, dir)
{
    /*
        Each dropet has an x, y, and z, with each x being randomized from -1 to 1, z being randomized from -1 to 1, and y being randomized
        from 1 to 2.
        Also color.

        the form of the vertex goes like this:
        [x, y, z, w, color] // no size
     */

    // BOTTOM VERTEX
    let x = Math.random() - randomRange(0, 1);  // gets random num from 0 to 1 (1 non inclusive), subtracted by 1 or 0
                                                // basically sub by 1 is negative x, else positive.

    let y = 1 + Math.random();                  // y should always be above the space (ensure na di muna irender untill bababa)
    let z = Math.random() - randomRange(0, 1);
    let bottomVert = [x, y, z, 1];

    /*
        TOP VERTEX
            // the placement of this vertex depends on the length of the line and its variation value
            // higher variation = chance to be different from original linelen
            
            // we get a random value between 1 to maxVariation
            // multiply said value with our length to get the actual length
    */
    let variation = randomRange(1, lineMaxVariation);
    let actualLen = lineLen * variation;

    // calculate the new position of y
    let topVert = [x+(actualLen*-1*dir), y+actualLen, z, 1];

    /*
        ADDING THE COLOR + size ?
    */

    // check distance of x and y sa cam -- relative to the distance yung magiging alpha value
    // desired behavior is the farther (greater dist) = the less opaque
    let distanceFromCam = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
    color[3] = distanceFromCam / color[3];  // modify the alpha value

    // console.log("new color "+ color[3]);

    // add color to bottom vertex
    InsertData(bottomVert, color);
    bottomVert.push(1);

    // insert the color to our top vertex
    InsertData(topVert, color);
    topVert.push(1);

    // insert topvert into bottom vert and return bottom vert
    // the form of bottomVert then be
    //      [   bottomx, bottomy, bottomz, bottomw, bottomcolors,
    //          topx, topy, topz, topw, topcolors]

    InsertData(bottomVert, topVert);


    return bottomVert;
}

// function that just inserts all data in insertArr to dataArr in a way na 1d arr pa rin.
function InsertData(dest, src)
{
    for(var i=0;i<src.length; i++)
    {
        dest.push(src[i]);
    }
}

/* 
    creating rain droplets
    > rainLen is the length of the drop (default is 0.03, max of 0.1)
    > volume is the amount of rain (not exact number of droplets, just the scale thingy) -- is 1 by default
    > lineMaxVariation is the amount of variation of line length -> this is 1 by default (no variation)
        > max is 10 (rain length of 0.3)
    > line dir -> -1 for left, 1 for right (extreme)
    > color is the color of the line (white by default)

    The volume determines how much rain exactly we should create
*/
function createRain(rainVerts, rainLen=0.03, volume=1, lineMaxVariation=1, lineDir=0, color=[1.0,1.0,1.0,1.0])
{
    let droplets = [];

    // get a random amount of droplets affected by volume
    let max = 5;   // this means, we create 5 rain drops at a time.
    let rainCount = randomRange(1, max) * volume;   // multiply result by volume to scale the amount of rain

    for(let i=0;i<rainCount;i++)
    {
        // we add two points: the upper point and the lower point.
        // the droplets array must  look like this:
        /* 
            [   vertex1 ,   - rain drop 1
                vertex2 ,   - rain drop 1
                vertex3 ,   - rain drop 2
                vertex4 ,   - rain drop 2
            ]
         */
        
        // create element here
        let drop = createDrop(color, lineMaxVariation, rainLen, lineDir);
        // add the drop into droplets
        InsertData(droplets, drop);
    }

    // add the droplets to rainVerts
    InsertData(rainVerts, droplets);
}
