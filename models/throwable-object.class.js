class ThrowableObject extends MovableObject {

    height = 60;
    width = 50;
    speedY = 20;
    speedX = 10;

    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png'
    ]


    constructor(x, y) {
        super()
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING)
        this.x = x;
        this.y = y;
        this.throw(x, y);
        this.animate()
    }

    throw() {
        this.applyGravity()
        setInterval(() => {
            this.x += this.speedX;

        }, 25)
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING)
        }, 50)


    }

}


