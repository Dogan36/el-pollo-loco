class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 50;
    x = 2500;
    speed = 0.2;
    offset = {
        right: 50,
        left: 30,
        top: 30,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',



    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        setTimeout(() => {
            this.animate();
        }, 2000); // 2 Sekunden Verzögerung

    }

    isReached() {
        return world.character.x > this.x - 700
    };

    isClose() {
        return world.character.x > this.x - 500

    };

    isAttacking() {
        return world.character.x > this.x - 400
    }

    animate() {
        setStoppableInterval(this.moveEndboss.bind(this), 16);
        let animationsIntervalEndboss = setStoppableInterval(this.playAnimations.bind(this), 160);
        
    }

    moveEndboss() {
        if (this.isDead()) { }
        else if (this.isHurt()) {
            this.speed = 1.5;
            this.moveLeft();
        }
        else if (this.isAttacking()) this.moveLeft();
        else if (this.isClose()) { }
        else if (this.isReached()) this.moveLeft();
    }


    playAnimations() {
        if (this.isDead()) this.playAnimationsDead();
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.isAttacking()) this.playAnimation(this.IMAGES_ATTACK);
        else if (this.isClose()) this.playAnimation(this.IMAGES_ALERT);
        else if (this.isReached()) this.playAnimation(this.IMAGES_WALKING);
    }


    playAnimationsDead(){
        this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                stopIntervalById('animationsIntervalEndboss');
                this.loadImage(this.IMAGES_DEAD[2]);
                changeEndscreen('win')
                stopGame()
            }, 2000);
    }
}   