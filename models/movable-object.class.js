class MovableObject extends DrawableObject {

  speed = 0.1;
  otherDirection = false;
  speedY
  speedX
  acceleration = 2.5;
  energy = 100;
  collectedCoins = 0;
  collectedBottles = 0;
  lastHit = 0;
  timepassed
  lastKeyPressed = new Date().getTime()


  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true
    } else {
      return this.y < 135;
    }
  };


  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY
        this.speedY -= this.acceleration
        if (this instanceof Character && this.y > 135) {
          this.y = 135
        }
      }

    }, 1000 / 25)
  };


  cancelGravity() {
    clearInterval(this.gravityInterval);
  }


  isColliding(mo) {
    const x1 = this.x + this.offset.left;
    const y1 = this.y + this.offset.top;
    const x2 = x1 + this.width - this.offset.right - this.offset.left;
    const y2 = y1 + this.height - this.offset.bottom - this.offset.top;

    const moX1 = mo.x + mo.offset.left;
    const moY1 = mo.y + mo.offset.top;
    const moX2 = moX1 + mo.width - mo.offset.right - mo.offset.left;
    const moY2 = moY1 + mo.height - mo.offset.bottom - mo.offset.top;

    return x2 > moX1 &&
      y2 > moY1 &&
      x1 < moX2 &&
      y1 < moY2;
  }


  isJumpingOn(mo) {
    const characterBottom = this.y + this.height + this.offset.bottom;
    const characterLeft = this.x - this.offset.left;
    const characterRight = this.x + this.width - this.offset.right;

    const objectTop = mo.y + mo.offset.top;
    const objectBottom = mo.y + mo.height - mo.offset.bottom;
    const objectLeft = mo.x + mo.offset.left;
    const objectRight = mo.x + mo.width - mo.offset.right;

    return (
        this.speedY < -5 &&
        characterBottom >= objectTop &&
        characterBottom <= objectBottom &&
        characterRight + 10 > objectLeft &&
        characterLeft - 10 < objectRight
    );
}



  hit() {
    if (!this.isHurt()) {
      this.energy -= 10;
      if (this.energy <= 0) {
        this.energy = 0
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }


  isDead() {
    return this.energy == 0
  }


  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit
    return timepassed < 500
  }


  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;

  }


  moveLeft() {
    this.x -= this.speed
  }


  jump() {
    this.speedY = 30

  };


  rejump() {
    this.speedY = 10
  }


  playAnimation(images) {
    let i = this.currentImage % images.length
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
