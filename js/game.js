let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard)
}


document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39)
        keyboard.RIGHT = true

})
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 37)
        keyboard.LEFT = true

})
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 38)
        keyboard.UP = true

})
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 32)
        keyboard.SPACE = true

})
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 68)
        keyboard.D = true

})


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 39)
        keyboard.RIGHT = false;


})
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 37)
        keyboard.LEFT = false

})
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 38)
        keyboard.UP = false

})
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 32)
        keyboard.SPACE = false

})
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 68)
        keyboard.D = false

})

let intervalIds = [];

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    console.log(id)
    intervalIds.push(id);
}

function stopGame() {
    intervalIds.forEach(clearInterval);
}

function toggleFullscreen() {
    var container = document.getElementById('game-container');

    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) { // Firefox
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) { // Chrome, Safari and Opera
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { // IE/Edge
            container.msRequestFullscreen();
        }
        adjustScaling()
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        undoScaling()
    }
}

function adjustScaling() {
    var canvas = document.getElementById('canvas');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var scaleFactorX = windowWidth / canvas.width;
    var scaleFactorY = windowHeight / canvas.height;
    canvas.style.transform = 'scale(' + scaleFactorX + ', ' + scaleFactorY + ')';


}
function undoScaling() {
    var canvas = document.getElementById('canvas');

    canvas.style.transform = 'scale(' + 1 + ', ' + 1 + ')';


}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') undoScaling();
});
