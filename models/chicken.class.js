class Chicken extends MovableObject {
    height = 100;
    width = 100 
    y = 330;
    speed = 0.2;
    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        this.x = 200 + Math.random() * 2500;
        this.speed = this.speed + Math.random() * 0.25
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200)


        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60)

    }
}