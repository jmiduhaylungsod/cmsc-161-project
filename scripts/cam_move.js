keys = {};
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