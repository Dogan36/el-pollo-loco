class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = 0 + Math.random() * 6000;
        this.animate();
    }


    animate() {
        setStoppableInterval(this.moveLeft.bind(this), 1000 / 60)
    }
}