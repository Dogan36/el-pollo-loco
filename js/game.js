let canvas;
let world;
let keyboard = new Keyboard();

function init(){
canvas = document.getElementById('canvas');
world = new World(canvas, keyboard)

}


document.addEventListener('keydown', (event) => {
    if(event.keyCode == 39)
    keyboard.RIGHT = true
    console.log(keyboard.RIGHT)
})
document.addEventListener('keydown', (event) => {
    if(event.keyCode == 37)
    keyboard.LEFT = true
})
document.addEventListener('keydown', (event) => {
    if(event.keyCode == 38)
    keyboard.UP = true
})
document.addEventListener('keydown', (event) => {
    if(event.keyCode == 32)
    keyboard.SPACE = true
})
document.addEventListener('keydown', (event) => {
    if(event.keyCode == 68)
    keyboard.D = true
})


document.addEventListener('keyup', (event) => {
    if(event.keyCode == 39)
    keyboard.RIGHT = false
    console.log(keyboard.RIGHT)
})
document.addEventListener('keyup', (event) => {
    if(event.keyCode == 37)
    keyboard.LEFT = false
})
document.addEventListener('keyup', (event) => {
    if(event.keyCode == 38)
    keyboard.UP = false
})
document.addEventListener('keyup', (event) => {
    if(event.keyCode == 32)
    keyboard.SPACE = false
})
document.addEventListener('keyup', (event) => {
    if(event.keyCode == 68)
    keyboard.D = false
})