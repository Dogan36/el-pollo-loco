class Coin extends MovableObject {
    height = 120;
    width = 120;
    offset = {
        right: 50,
        left: 50,
        top: 50,
        bottom: 50
    };
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]
    
    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES)
        this.x = 200 + Math.random() * 2000;
        this.y = 300 -  Math.random() * 300;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 400)
    }


    collect() {
        world.collectedCoins += 10;
        collect_sound_coin.pause()
        collect_sound_coin.currentTime=0
        collect_sound_coin.play()
    }
}