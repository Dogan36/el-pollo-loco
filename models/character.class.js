class Character extends MovableObject {
    height = 300;
    width = 150;
    y = 135;
    x = 0;
    speed = 6;
    offset = {
        left: 25,
        top: 90,
        right: 25,
        bottom: 0
    };

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLELONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'

    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',

    ]

    IMAGES_DISAPEAR = [
        'img/2_character_pepe/5_dead/D-57.png'
    ];

   
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLELONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_DISAPEAR);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setStoppableInterval(this.checkKeyboardPress.bind(this), 1000 / 25)
        let animationsIntervalCharacter = setStoppableInterval(this.playAnimations.bind(this), 250)
        setStoppableInterval(this.playAnimationsJump.bind(this), 1000 / 25)
    }


    checkKeyboardPress() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - 300) { this.moveRight(); this.lastKeyPressed = new Date().getTime(); }
        if (this.world.keyboard.LEFT && this.x > -100) { this.moveLeft(); this.otherDirection = true; this.lastKeyPressed = new Date().getTime(); }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) { this.jump(); this.lastKeyPressed = new Date().getTime(); }
        if (this.world.keyboard.D) { this.lastKeyPressed = new Date().getTime(); }
        this.world.camera_x = -this.x + 50;
    }


    playAnimations() {
        if (this.isDead()) this.playAnimationsDead()
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT)
        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playAnimation(this.IMAGES_WALKING)
        else if (this.idle()) this.playAnimation(this.IMAGES_IDLE)
        else if (this.idlelong()) this.playAnimation(this.IMAGES_IDLELONG)
    }


    playAnimationsJump() {
        if (this.isAboveGround() && !this.isDead()) {
            if (this.speedY >= 22.5) this.loadImage(this.IMAGES_JUMPING[2]);
            else if (this.speedY >= 12.5) this.loadImage(this.IMAGES_JUMPING[3]);
            else if (this.speedY >= 7.5) this.loadImage(this.IMAGES_JUMPING[4]);
            else if (this.speedY >= 0) this.loadImage(this.IMAGES_JUMPING[5]);
            else if (this.speedY <= -22.5) this.loadImage(this.IMAGES_JUMPING[7]);
            else if (this.speedY <= -17.5 || this.speedY <= -12.5 || this.speedY <= -7.5) this.loadImage(this.IMAGES_JUMPING[6]);
            else this.loadImage(this.IMAGES_JUMPING[5]);
        }
    }

    playAnimationsDead(){
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            stopIntervalById('animationsIntervalCharacter');
            this.y=1000
            this.loadImage(this.IMAGES_DISAPEAR);
            changeEndscreen('lose')
            stopGame()
        }, 1500);
        //changeEndscreen(lose)
    }

    idle() {
        let timepassedKey = new Date().getTime() - this.lastKeyPressed
        return timepassedKey > 0 && timepassedKey < 8000
    }


    idlelong() {
        let timepassedKey = new Date().getTime() - this.lastKeyPressed
        return timepassedKey > 8000
    }
}