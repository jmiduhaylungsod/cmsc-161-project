let allRain = [];
let then = 0;

function main(gl)
{

    /*
    MATRIX FOR TRANSFORMING STUFF ?
    */
    let transformMatrix = [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
    ];

    // we create the matrices here.
    const modelMatrix = glMatrix.mat4.create();
    const viewMatrix = glMatrix.mat4.create();
    const projectionMatrix = glMatrix.mat4.create();

    /*
        POINTERS
    */

    // we can access the pointers here already
    var vertexPositionPtr = gl.getAttribLocation(program, 'a_position');
    var vertexSizePtr = gl.getAttribLocation(program, 'a_point_size');
    var vertexColorPtr = gl.getAttribLocation(program, 'in_Color');
    // for affine transformationheadVertexCount
    var transformPtr = gl.getUniformLocation(program, 'u_transformation_matrix');

    // accessing the pointers for glMatrices here
    var modelPtr = gl.getUniformLocation(program, 'model');
    var viewPtr = gl.getUniformLocation(program, 'view');
    var projectionPtr = gl.getUniformLocation(program, 'projection');
    
    // setting up initial values/transform
    glMatrix.mat4.lookAt(viewMatrix, [0,0,0], [0,0,1], [0,1,0]);
    // projection matrix init
    const near = 0.1;
    const far = 100;
    const fov = 0.7;
    const aspect = gl.canvas.clientWidth/gl.canvas.clientHeight;
    // glMatrix.mat4.ortho(projectionMatrix, -1, 1, -1, 1, near, far);
    glMatrix.mat4.perspective(projectionMatrix, fov, aspect, near, far);

    /* 
        FORDA BUFFERS
    */

    // buffer creation for rain
    var rainBuffer = gl.createBuffer();

    // buffer for walls
    var frontBuffer = gl.createBuffer();  // z=1
    var backBuffer = gl.createBuffer();   // where z=-1
    var leftBuffer = gl.createBuffer();   // where x=-1
    var rightBuffer = gl.createBuffer();  // where x=1

    // buffer for top and bottom
    var skyBuffer = gl.createBuffer();
    var floorBuffer = gl.createBuffer();

    // other buffers
    var flowerBuffer = gl.createBuffer();

    // setup flowers -- this occurs only once.
    var flowerData = []
    let max_flower = randomRange(10, 20);
    for(let num_flowers=0; num_flowers<max_flower; num_flowers++)
    {
        let oneFlower = putFlower([Math.random(), Math.random(), Math.random(), 1]);

        // we have an array within array within array
        // [ [ flowerInner, flowerOuter ] ]
        // add flowe
        flowerData.push(oneFlower);
    }

    init();

    // render
    requestAnimationFrame(render);

    /*
        MAIN FUNCTIONS
    */

    //uutualizes teh initial values of glmatrix -- initial
    function init()
    {
    
        // enabling vertex attrib arrays
        gl.enableVertexAttribArray(vertexPositionPtr);
        gl.enableVertexAttribArray(vertexColorPtr);
        gl.enableVertexAttribArray(vertexSizePtr);
        gl.enable(gl.DEPTH_TEST);
    }
    
    /*
    *  Sets up the buffers, buffer data, and vertex pointers right before drawing.
    */
    function InitDrawVariables(buffer, points)
    {
        // SETTING UP BUFFERS ETC
        // binding the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // setting the data for the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
        
    
        /*
        * FOR INTERPRETING THE DATA
        */
    
        // POSITION
        var stride = 0;
        var offset = 9 * Float32Array.BYTES_PER_ELEMENT;
    
        gl.vertexAttribPointer(vertexPositionPtr, 4, gl.FLOAT, false, offset, stride);
    
        // COLOR
        stride = 4 * Float32Array.BYTES_PER_ELEMENT;
        // same offset as above
        gl.vertexAttribPointer(vertexColorPtr, 4, gl.FLOAT, false, offset, stride);
    
        // SIZE
        stride = 8 * Float32Array.BYTES_PER_ELEMENT;
        // same offset
        gl.vertexAttribPointer(vertexSizePtr, 1, gl.FLOAT, false, offset, stride);
    
    }
    
    /*
        Sets up the scene by clearing old screen and getting the transform matrix thingies + setting up what camera will look @
            > dito ata need i-modify para masali yung feature ng ikot ikot cam
    */
    function setScene()
    {
        console.log("cleared screen");
        gl.uniformMatrix4fv(transformPtr, false, new Float32Array(transformMatrix));
    
        //
        // dito iseset yung values ng uniform matrices.
        //
        gl.uniformMatrix4fv(modelPtr, false, new Float32Array(modelMatrix));
        gl.uniformMatrix4fv(viewPtr, false, new Float32Array(viewMatrix));
        gl.uniformMatrix4fv(projectionPtr, false, new Float32Array(projectionMatrix));
    
        // clear the screen
        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (keys['ArrowUp']) {
            glMatrix.mat4.rotateX(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(0.2));
            console.log("in up");
        }
        if (keys['ArrowDown']) {
            glMatrix.mat4.rotateX(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(-0.2));
            console.log("in down");
        }
        if (keys['ArrowLeft']) {
            glMatrix.mat4.rotateY(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(-0.2));
            console.log("in left");
        }
        if (keys['ArrowRight']) {
            glMatrix.mat4.rotateY(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(0.2));
            console.log("in right");
        }
    
    }
    
    /*
        Updates the positions of rain and other things in the screen. Affected by the modifiable parameters
    */
    function update(delta, speed, dir)
    {
        // update y manually -- i think sa mat4.translate, yung buong buffer or buong space ng buffer yung nattranslate instead of
        // individual drops, which results in makikita mong gumagalaw lahat (even the newly created drops) as a unit / nagsspawn
        // sa space na nakikita ng user xd
        let sizeOfElement = 9;  // 9 floats per element
        for(let i=1;i<allRain.length;i+=sizeOfElement)
        {
            // update the y manually?
            allRain[i] -= delta * speed;
            allRain[i-1] += delta * dir;
    
            // note that bottom vertex (for the rain) is an odd index, while top is even
            // here we check if thie current vertex y is now past -1, meaning nasa bottom na
            // we remove that drop from the array, para di madami laman ni allrain
            if(i%2==0 && allRain[i] < -1)
            {
                // indices to remove
                // top = i-1 (x) to i+8
                // bottom = i - sizeofelement - 1 (x) to i-2 (last element of bottom drop)
                // 18 elements to remove
                allRain.splice(i - sizeOfElement - 1, 18);
            }
        }
    }
    
    // gets the slider data
    function getElementData()
    {
        let rainParams = {
            spd: Number((document.getElementById("rain-speed")).value),
            len: Number((document.getElementById("rain-len")).value),
            lenVar: Number((document.getElementById("rain-len-var")).value),
            volume: Number((document.getElementById("rain-volume")).value),
            color_r: Number((document.getElementById("color-r")).value),
            color_g: Number((document.getElementById("color-g")).value),
            color_b: Number((document.getElementById("color-b")).value),
            color_a: Number((document.getElementById("color-alpha")).value),
            dir: Number((document.getElementById("dir")).value)

        }
    
        return rainParams;
    }
    
    function drawEnv()
    {
        InitDrawVariables(frontBuffer, frontWall);
        // draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, frontWall.length / 9);

        
        InitDrawVariables(backBuffer, backWall);
        // draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, backWall.length / 9);

        
        InitDrawVariables(leftBuffer, leftWall);
        // draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, leftWall.length / 9);

        
        InitDrawVariables(rightBuffer, rightWall);
        // draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, rightWall.length / 9);

        
        InitDrawVariables(skyBuffer, skypts);
        // draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, skypts.length / 9);

        
        InitDrawVariables(floorBuffer, floorpts);
        // draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, floorpts.length / 9);

        // draw the flowers here
        // flower data contains the array containing the matrix of inner and outer
        flowerData.forEach(flower => {
            // draw outer
            InitDrawVariables(flowerBuffer, flower[0]);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, flower[0].length);

            // draw inner
            InitDrawVariables(flowerBuffer, flower[1]);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, flower[1].length);
        });
    }

    // Renders the scene repeatedly.
    function render(now)
    {
        const lenPerVertex = 8;    // 8 array elements per vertex
        now *= .001;    // converts to seconds
        // get dt
        dt = now - then;
        // update then
        then = now;
    
        // set camera
        setScene();
    
        let params = getElementData();
        
        // create and add to rain
        createRain(allRain, 
            params.len, 
            params.volume, 
            params.lenVar,
            params.dir,
            [params.color_r, params.color_g, params.color_b, params.color_a]);
    
        console.log(params);

        // draw environment
        drawEnv();

        // draw scene w rain
        InitDrawVariables(rainBuffer, allRain);
    
        // DRAW
        gl.drawArrays(gl.LINES, 0, allRain.length/9);    // 8 is size of individual element arrays (4 pos, 4 color)
    
        // call function to update
        update(dt, params.spd, params.dir);
    
        requestAnimationFrame(render);
    }
    

}