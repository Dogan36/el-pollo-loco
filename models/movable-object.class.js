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

/**
 * This function checks if an elements is above ground
 * 
 * @returns boolean 
 */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true
    } else {
      return this.y < 135;
    }
  };


  /**
   * This function applies gravity to elements
   * 
   */
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

/**
 * This function cancels gravity
 * 
 */
  cancelGravity() {
    clearInterval(this.gravityInterval);
  }


  /**
   * This function checks if an element is colliding with an moveable object
   * 
   * @param {string} mo -This is the id of the moveable object collision is checked with
   * @returns boolean
   */
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

  /**
  * This function checks if an element is jumping on a moveable object
  * 
  * @param {string} mo -This is the id of the moveable object jumped on is checked with
  * @returns boolean
  */
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


/**
 * This function reduces the energy of an element when it is hit but not hurt, sets time of last hit
 * 
 */
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

/**
 * This function checks if the energy of an element is 0
 * 
 * @returns boolean
 */
  isDead() {
    return this.energy == 0
  }

/**
 * This function checks if an element got hurt inside a timeframe
 * 
 * @returns boolean
 */
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
