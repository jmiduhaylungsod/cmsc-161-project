keys = {};
const canvas_win = document.getElementById("output");
const mid_X = canvas_win.clientWidth/2;
const mid_Y = canvas_win.clientHeight/2;
var moveFactor_X = 0;
var moveFactor_Y = 0;
var camSpeed = 0.3;

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    // console.log(`Pressed ${e.code}`);
    e.preventDefault();
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    // console.log(`Released ${e.key}`);
    e.preventDefault();
});
console.log(`X/2: ${mid_X}`);
console.log(`Y/2: ${mid_Y}`);
canvas_win.addEventListener('mousemove', updateMousePosition, false);
function updateMousePosition (e) {
    var mouse_X = e.clientX - mid_X;
    var mouse_Y = mid_Y - e.clientY;
    
    moveFactor_X = mouse_X/mid_X;
    moveFactor_Y = mouse_Y/mid_Y;
    console.log(`x_factor: ${moveFactor_X}`);
    console.log(`y_factor: ${moveFactor_Y}`);
}