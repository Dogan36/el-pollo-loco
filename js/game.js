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
    var fullscreen = document.getElementById('fullscreen');

    if (!document.fullscreenElement) {
        var requestFullscreen = fullscreen.requestFullscreen || fullscreen.mozRequestFullScreen || fullscreen.webkitRequestFullscreen || fullscreen.msRequestFullscreen;

        if (requestFullscreen) {
            requestFullscreen.call(fullscreen).then(function() {
                setTimeout(adjustScaling, 100);
            });
        }
    } else {
        var exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;

        if (exitFullscreen) {
            exitFullscreen.call(document);
        }
        undoScaling();
    }
}




function adjustScaling() {
    var container = document.getElementById('container');
    var fullscreen = document.getElementById('fullscreen');
    var fullscreenWidth = fullscreen.offsetWidth;
    var fullscreenHeight = fullscreen.offsetHeight;
    var scaleFactor = Math.min(fullscreenWidth / container.offsetWidth, fullscreenHeight / container.offsetHeight);
    var scaledWidth = container.offsetWidth * scaleFactor;
    var scaledHeight = container.offsetHeight * scaleFactor;
    var offsetX = (fullscreenWidth - scaledWidth) / 2;
    var offsetY = (fullscreenHeight - scaledHeight) / 2;

    container.style.transform = 'scale(' + scaleFactor + ')';
    container.style.transformOrigin = 'top left';
    container.style.position = 'absolute';
    container.style.left = offsetX + 'px';
    container.style.top = offsetY + 'px';
    container.style.right = offsetX + 'px';
    container.style.bottom = offsetY + 'px';
}







function undoScaling() {
    var container = document.getElementById('container');
    container.style.transform = 'scale(' + 1 + ')';
    container.style.transformOrigin = 'unset';
    container.style.left = '0';
    container.style.top = '0';
    container.style.position = 'static';
}



function handleFullscreenChange() {
    if (!document.fullscreenElement) {
        undoScaling();
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);
