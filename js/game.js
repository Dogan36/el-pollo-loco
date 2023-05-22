let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    hideStartscreen()
    hideEndscreen()
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
    intervalIds.push(id);
    return id;
}

function stopIntervalById(id) {
    clearInterval(intervalIds.find(intervalId => intervalId === id));
  }
  
  
  function stopGame() {
    clearIntervals()
    showEndscreen()
}

function clearIntervals(){
    intervalIds.forEach(clearInterval);
      intervalIds=[];
}

function showEndscreen(){
    document.getElementById('endscreen').classList.remove('d-none');
}
function hideEndscreen(){
    document.getElementById('endscreen').classList.add('d-none');
}
function hideStartscreen(){
    document.getElementById('startscreen').classList.add('d-none');
}

function restartGame(){
    hideEndscreen();
    initLevel();
    init();
}

function changeEndscreen(status){
    let endscreen = document.getElementById('endscreenImg')
if(status == 'win') endscreen.src = 'img/9_intro_outro_screens/game_over/game over!.png'
else endscreen.src = 'img/9_intro_outro_screens/game_over/you lost.png'
}

function toggleFullscreen() {
    let fullscreenImg = document.getElementById('fullscreenImg')
    var fullscreen = document.getElementById('fullscreen');
    if (!document.fullscreenElement) {
        var requestFullscreen = fullscreen.requestFullscreen || fullscreen.mozRequestFullScreen || fullscreen.webkitRequestFullscreen || fullscreen.msRequestFullscreen;
        if (requestFullscreen) {
            requestFullscreen.call(fullscreen).then(function() {
                setTimeout(adjustScaling, 100);
            });
        }
        fullscreenImg.src='img/minimize.png'
        removeBackground()
    } else {
        var exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        if (exitFullscreen) {
            exitFullscreen.call(document);
        }
        undoScaling();
        fullscreenImg.src='img/fullscreen.png'
        showBackground()
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
        showBackground()
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function removeBackground(){
    document.getElementById('pepeBackground').classList.add('d-none')
    document.getElementById('endbossBackground').classList.add('d-none')
}

function showBackground(){
    document.getElementById('pepeBackground').classList.remove('d-none')
    document.getElementById('endbossBackground').classList.remove('d-none')
}