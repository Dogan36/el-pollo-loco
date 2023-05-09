class Coin extends MovableObject {
    height = 100;
    width = 100;
    offset = {
        right: 60,
        left: 30,
        top: 30,
        bottom: 60
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
    }
}