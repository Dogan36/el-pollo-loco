class MovableObject extends DrawableObject {

  speed = 0.1;
  otherDirection = false;
  speedY
  speedX
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  lastKeyPressed = 0

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true
    } else {
      return this.y < 135;
    }
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY
        this.speedY -= this.acceleration
      }
    }, 1000 / 25)
  };



  isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
  }

  hit() {
    this.energy -= 10;
    if (this.energy <= 0) {
      this.energy = 0
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit
    timepassed = timepassed / 1000
    return timepassed < 1
  }

  idle(){
    let timepassed = new Date().getTime() - this.lastKeyPressed
    timepassed = timepassed / 1000
    return timepassed > 0
  }

  idlelong(){
    let timepassed = new Date().getTime() - this.lastKeyPressed
    timepassed = timepassed / 1000
    return timepassed > 2
  }

  
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
    this.lastKeyPressed = new Date().getTime();
  }

  moveLeft() {
    this.x -= this.speed
    this.lastKeyPressed = new Date().getTime();
  }

  jump() {
    this.speedY = 20
    this.lastKeyPressed = new Date().getTime();
  };

  playAnimation(images) {
    let i = this.currentImage % images.length
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
