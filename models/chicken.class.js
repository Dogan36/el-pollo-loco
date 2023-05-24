class Chicken extends MovableObject {
    height = 100;
    width = 100
    y = 330;
    speed = 0.2;
    offset = {
        right: 20,
        left: 20,
        top: 10,
        bottom: 10
    };
    jumpon_sound_played = false;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    
    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 2500;
        this.speed = this.speed + Math.random() * 0.25
        this.animate();
    }

    /**
    * This function sets intervals to play animations
    * 
    */
    animate() {
        setStoppableInterval(this.playAnimations.bind(this), 200);
        setStoppableInterval(this.chickenMove.bind(this), 1000 / 60);
    }

/**
 * This function plays the images and sounds depending on the status of the character
 * 
 */
    playAnimations() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGE_DEAD)
            if (this.jumpon_sound_played == false) {
                jumpon_sound.pause();
                jumpon_sound.currentTime = 0;
                jumpon_sound.play()
                this.jumpon_sound_played = true
            }
        }
        else this.playAnimation(this.IMAGES_WALKING)
    }

/**
 * This function lets move the chicken to the left
 * 
 */
    chickenMove() {
        if (!(this.isDead())) this.moveLeft()
    }
}