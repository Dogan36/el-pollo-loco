let canvas;
let world;
let keyboard = new Keyboard();
let world_sound = new Audio('audio/music.mp3');
let danger_sound = new Audio('audio/danger.m4a');
let jump_sound = new Audio('audio/jump.mp3');
let hurt_sound = new Audio('audio/hurt.mp3');
let sleep_sound = new Audio('audio/snore.mp3');
let collect_sound_bottle = new Audio('audio/bottleCollect.mp3');
let collect_sound_coin = new Audio('audio/coinCollect.mp3');
let jumpon_sound = new Audio('audio/jumpon.mp3');
let break_sound = new Audio('audio/brokenglas.m4a');
let throw_sound = new Audio('audio/throw.mp3');
let victory_sound = new Audio('audio/victory.mp3');
let defeat_sound = new Audio('audio/lost.mp3');
let audioElements = [world_sound, danger_sound, jump_sound, hurt_sound, sleep_sound, collect_sound_bottle, collect_sound_coin, jumpon_sound, break_sound, throw_sound, victory_sound, defeat_sound];

/**
 * This function initializes the canvas and world. hides overlays Startscreen and Endscreen
 * 
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    hideStartscreen()
    hideEndscreen()
}


document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = true
})


document.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) keyboard.LEFT = true
})


document.addEventListener('keydown', (event) => {
    if (event.keyCode == 32) keyboard.SPACE = true
})


document.addEventListener('keydown', (event) => {
    if (event.keyCode == 68) keyboard.D = true
})


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
})


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 37) keyboard.LEFT = false
})



document.addEventListener('keyup', (event) => {
    if (event.keyCode == 32) keyboard.SPACE = false
})


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 68) keyboard.D = false
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

/**
 * This function sets intervals and pushes their ID into an array
 * 
 * @param {string} fn - this is the name of the function to call inside the setInverval
 * @param {number} time - this is the time the interval will be called after
 * @returns string
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}

/**
 * This function searches for an interval by its id and stopps it
 * 
 * @param {string} id - This is the ID of the interval to be stopped
 */
function stopIntervalById(id) {
    clearInterval(intervalIds.find(intervalId => intervalId === id));
}

/**
 * This function clears allIntervals, showes the endscreen and sets all collectables to 0
 * 
 */
function stopGame() {
    clearIntervals()
    showEndscreen()
    world.collectedBottles = 0;
    world.collectedCoins = 0;
}

/**
 * This function clears all intervals of the intervalIDs array
 * 
 */
function clearIntervals() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**
 * This function removes display-none from endscreen
 * 
 */
function showEndscreen() {
    document.getElementById('endscreen').classList.remove('d-none');
}

/**
 * This function adds display-none to endscreen
 * 
 */
function hideEndscreen() {
    document.getElementById('endscreen').classList.add('d-none');
}


/**
 * This function adds display-none to startscreen
 * 
 */
function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}

/**
 * This function restarts the game by hiding the endscreen, setting sound to default and initializing world and level
 * 
 */
function restartGame() {
    hideEndscreen();
    world_sound.play();
    danger_sound.pause();
    initLevel();
    init();
}


/**
 * This functions changes the img of the endscreen depending of win or lose
 * 
 * @param {string} status - this tells if you have won or not
 */
function changeEndscreen(status) {
    let endscreen = document.getElementById('endscreenImg')
    if (status == 'win') endscreen.src = 'img/9_intro_outro_screens/game_over/game over!.png'
    else endscreen.src = 'img/9_intro_outro_screens/game_over/you lost.png'
}

/**
 * This function toggles fullscreen
 * 
 */
function toggleFullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    if (!document.fullscreenElement) enterFullscreen(fullscreen);
    else exitFullscreen(fullscreen);
}

/**
 * This function lets the element go fullscreen
 * 
 * @param {string} element - ID of the element to go fullscreen
 */
function enterFullscreen(element) {
    const requestFullscreen = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen || element.msRequestFullscreen;
    if (requestFullscreen) {
        requestFullscreen.call(element).then(() => {
            setTimeout(adjustScaling, 100);
        });
    }
    document.getElementById('fullscreenImg').src = 'img/minimize.png';
    removeBackground();
}

/**
 * this function exits fullscreen
 * 
 */
function exitFullscreen() {
    const exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (exitFullscreen) exitFullscreen.call(document);
    undoScaling();
    document.getElementById('fullscreenImg').src = 'img/fullscreen.png';
    showBackground();
}

/**
 * This function toggles display of rotateOverlay
 * 
 * @param {boolean} show - tells if element to be shown or not
 */
function toggleRotateOverlay(show) {
    let rotateOverlay = document.getElementById('rotateOverlay');
    if (show) rotateOverlay.style.display = 'flex';
    else rotateOverlay.style.display = 'none';
}

/**
 * This function checks the orientation of the window
 * 
 */
function checkOrientation() {
    if (window.innerWidth < window.innerHeight) toggleRotateOverlay(true);
    else toggleRotateOverlay(false);

}


window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);

/**
 * This function adjusts the scaling of the cointainer after going fullscreen
 * 
 */
function adjustScaling() {
    let container = document.getElementById('container');
    let fullscreen = document.getElementById('fullscreen');
    let fullscreenWidth = fullscreen.offsetWidth;
    let fullscreenHeight = fullscreen.offsetHeight;
    let scaleFactor = Math.min(fullscreenWidth / container.offsetWidth, fullscreenHeight / container.offsetHeight);
    let scaledWidth = container.offsetWidth * scaleFactor;
    let scaledHeight = container.offsetHeight * scaleFactor;
    let offsetX = (fullscreenWidth - scaledWidth) / 2;
    let offsetY = (fullscreenHeight - scaledHeight) / 2;

    container.style.transform = 'scale(' + scaleFactor + ')';
    container.style.transformOrigin = 'top left';
    container.style.position = 'absolute';
    container.style.left = offsetX + 'px';
    container.style.top = offsetY + 'px';
    container.style.right = offsetX + 'px';
    container.style.bottom = offsetY + 'px';
    container.style.zIndex = 3
}


/**
 * This function removes the scaling of the cointainer after leaving fullscreen
 * 
 */
function undoScaling() {
    let container = document.getElementById('container');
    container.style.transform = 'scale(' + 1 + ')';
    container.style.transformOrigin = 'unset';
    container.style.left = '0';
    container.style.top = '0';
    container.style.position = 'static';
}

/**
 * This function handles scaling and background after fullscreenchange
 * 
 */
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

/**
 * This function removes background elements
 * 
 */
function removeBackground() {
    document.getElementById('pepeBackground').classList.add('d-none')
    document.getElementById('endbossBackground').classList.add('d-none')
}

/**
 * This function shows background elements
 * 
 */
function showBackground() {
    document.getElementById('pepeBackground').classList.remove('d-none')
    document.getElementById('endbossBackground').classList.remove('d-none')
}


let isMuted = false;

/**
 * This function toggles all sounds
 * 
 */
function toggleMute() {
    let muteButton = document.getElementById('muteButton')
    isMuted = !isMuted;
    for (let i = 0; i < audioElements.length; i++) {
        audioElements[i].muted = isMuted;
    }
    if (isMuted) muteButton.src = "img/audio-speaker-on.png";
    else muteButton.src = "img/mute.png";
}