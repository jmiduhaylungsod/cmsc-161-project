/*
    RAIN.JS
        the rain things

    Note that, every update:
    > create new set of rain droplets
    > update existing set of rain droplets
 */

let rainArr;    // array of rain droplets (ALL)

// get number between min to max (inclusive)
function randomRange(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createDrop(color, lineMaxVariation)
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
    // add color to bottom vertex
    InsertData(bottomVert, color);

    // TOP VERTEX
    // this vertex is based on the bottom vertex -- same z, same x (if not angled), diff y depending on the linemaxvariation
    let rainlength = randomRange(1, lineMaxVariation);  // get a random number to determine the length.

    // divide length by the y, which will be the "actual" length of the line in terms of decimal, and then use that to determine the
    // top vertex's y
    let actualLen = y / rainlength;

    let topVert = [x, y + actualLen, z, 1];
    InsertData(topVert, color);

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
    > volume is the amount of rain (not exact number of droplets, just the scale thingy) -- is 1 by default
    > lineMaxVariation is the amount of variation of line length -> this is 1 by default (no variation)
    > color is the color of the line (white by default)

    The volume determines how much rain exactly we should create
*/
function createRain(volume=1, lineMaxVariation=1, color=(1,1,1,1))
{
    let droplets = [];

    // get a random amount of droplets affected by 
    let max = 10;   // pass into getrandit to get a numebr between 0 and 10
    let rainCount = randomRange(1, max) * volume;   // multiply result by volume to scale the amount of rain

    for(let i=0;i<rainCount;rain++)
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
        let drop = createDrop(color, lineMaxVariation);
        // add the drop into droplets
        InsertData(droplets, drop);

    }

    // return all created droplets
    return droplets;
}
