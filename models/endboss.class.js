class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 50;
    speed = 0.2


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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2000;
        setTimeout(() => {
           this.animate();
        }, 2000); // 2 Sekunden Verzögerung
        
    }

    isReached() {
        return world.character.x > this.x - 700
    };

    isClose() {
        return world.character.x > this.x - 500
        console.log(world.character)
    };

    isAttacking() {
        return world.character.x > this.x - 400
    }

    animate() {
        setInterval(() => {
            if (this.isAttacking()) {
              this.moveLeft()  
            }

            else if(this.isClose())
            {
                
            }
            else if (this.isReached()) {
                this.moveLeft()
            }
        }, 16)

        setInterval(() => {

            if (this.isAttacking()) {
                this.playAnimation(this.IMAGES_ATTACK)
            }

            else if (this.isClose()) {
                this.playAnimation(this.IMAGES_ALERT)
            }

            else if (this.isReached()) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 150)

    }
}