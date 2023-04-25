class MovableObject {
  x = 50;
  y = 280;
  img;
  height = 100;
  width = 100;
  imageCache = {};
  currentImage = 0;
speed = 0.1
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log('Moving right');
  }

  moveLeft(){
    setInterval(() => {
        this.x -= this.speed

    }, 1000/60)
}
}

