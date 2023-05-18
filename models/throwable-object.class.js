class ThrowableObject extends MovableObject {

    height = 60;
    width = 50;
    speedY = 20;
    speedX = 10;


    offset = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }

    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]


    constructor(x, y) {
        super()
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING)
        this.loadImages(this.IMAGES_SPLASH)
        this.x = x;
        this.y = y;

        this.throw(x, y);
        this.animate()
    }


    throw() {
        this.applyGravity()
        this.throwInterval = setInterval(() => {
            this.x += this.speedX;
        }, 25)
    }

   

    animate() {
        setInterval(() => {
           
            if (world.level.enemies[0].isColliding(this)) {
                this.playAnimation(this.IMAGES_SPLASH)
                this.cancelGravity()
                clearInterval(this.throwInterval);
            }
            else {
                this.playAnimation(this.IMAGES_THROWING)
            }
        }, 50)

    }

}


