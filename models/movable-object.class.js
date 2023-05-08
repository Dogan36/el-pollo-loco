class MovableObject extends DrawableObject {

  speed = 0.1;
  otherDirection = false;
  speedY
  speedX
  acceleration = 2.5;
  energy = 100;
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
    if(!this.isHurt()){
    this.energy -= 10;
    if (this.energy <= 0) {
      this.energy = 0
    } else {
      this.lastHit = new Date().getTime();
    }}
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

  playAnimation(images) {
    let i = this.currentImage % images.length
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
