class Smallchicken extends MovableObject {
    height = 70;
    width = 70;
    y = 360;
    speed = 0.2
    offset = {
        right: 10,
        left: 10,
        top: 10,
        bottom: 10
    };

    jumpon_sound_played = false;
    

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGE_DEAD)
        this.x = 200 + Math.random() * 2500;
        this.speed = this.speed + Math.random() * 0.25
        this.animate();
    }

    animate() {
        setStoppableInterval(this.playAnimations.bind(this), 200);
        setStoppableInterval(this.chickenMove.bind(this), 1000 / 60);
    }


    playAnimations() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGE_DEAD)
            if(this.jumpon_sound_played == false){
                jumpon_sound.pause();
                jumpon_sound.currentTime = 0;
                jumpon_sound.play()
            this.jumpon_sound_played = true
        }
        }
        else this.playAnimation(this.IMAGES_WALKING)
    }



    chickenMove() {
        if (!(this.isDead())) this.moveLeft()
    }
}