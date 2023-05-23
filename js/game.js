let canvas;
let world;
let keyboard = new Keyboard();
let world_sound = new Audio('audio/music.mp3')
let danger_sound = new Audio('audio/danger.m4a')
let jump_sound = new Audio('audio/jump.mp3');
let hurt_sound = new Audio('audio/hurt.mp3');
let sleep_sound = new Audio('audio/snore.mp3')
let collect_sound_bottle = new Audio('audio/bottleCollect.mp3')
let collect_sound_coin = new Audio('audio/coinCollect.mp3')
let jumpon_sound = new Audio('audio/jumpon.mp3')
let break_sound = new Audio('audio/brokenglas.m4a')
let throw_sound = new Audio('audio/throw.mp3')
let victory_sound = new Audio('audio/victory.mp3')
let defeat_sound = new Audio('audio/lost.mp3')

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

function handleTouchStart(event, key) {
    event.preventDefault(); // Verhindert das Standardverhalten des Browsers
    keyboard[key] = true; // Setzt die entsprechende Taste auf true
}

function handleTouchEnd(event, key) {
    event.preventDefault(); // Verhindert das Standardverhalten des Browsers
    keyboard[key] = false; // Setzt die entsprechende Taste auf false
}


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

function clearIntervals() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

function showEndscreen() {
    document.getElementById('endscreen').classList.remove('d-none');
}
function hideEndscreen() {
    document.getElementById('endscreen').classList.add('d-none');
}
function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}

function restartGame() {
    hideEndscreen();
    world_sound.play();
            danger_sound.pause()
    initLevel();
    init();
}

function changeEndscreen(status) {
    let endscreen = document.getElementById('endscreenImg')
    if (status == 'win') endscreen.src = 'img/9_intro_outro_screens/game_over/game over!.png'
    else endscreen.src = 'img/9_intro_outro_screens/game_over/you lost.png'
}

function toggleFullscreen() {
    let fullscreenImg = document.getElementById('fullscreenImg')
    var fullscreen = document.getElementById('fullscreen');
    if (!document.fullscreenElement) {
        var requestFullscreen = fullscreen.requestFullscreen || fullscreen.mozRequestFullScreen || fullscreen.webkitRequestFullscreen || fullscreen.msRequestFullscreen;
        if (requestFullscreen) {
            requestFullscreen.call(fullscreen).then(function () {
                setTimeout(adjustScaling, 100);
            });
        }
        fullscreenImg.src = 'img/minimize.png'
        removeBackground()
    } else {
        var exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        if (exitFullscreen) {
            exitFullscreen.call(document);
        }
        undoScaling();
        fullscreenImg.src = 'img/fullscreen.png'
        showBackground()
    }
}

function toggleRotateOverlay(show) {
    var rotateOverlay = document.getElementById('rotateOverlay');
    if (show) {
        rotateOverlay.style.display = 'flex';
    } else {
        rotateOverlay.style.display = 'none';

    }
}

function checkOrientation() {
    if (window.innerWidth < window.innerHeight) {
        toggleRotateOverlay(true);
    } else {
        toggleRotateOverlay(false);
    }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);


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
    container.style.zIndex = 3
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



function removeBackground() {
    document.getElementById('pepeBackground').classList.add('d-none')
    document.getElementById('endbossBackground').classList.add('d-none')
}


function showBackground() {
    document.getElementById('pepeBackground').classList.remove('d-none')
    document.getElementById('endbossBackground').classList.remove('d-none')
}


var isMuted = false;
function toggleMute() {
    let muteButton = document.getElementById('muteButton')
    isMuted = !isMuted;
    world_sound.muted = isMuted;
    if (isMuted) {
        muteButton.src = "img/audio-speaker-on.png";
    } else {
        muteButton.src = "img/mute.png";
    }
}