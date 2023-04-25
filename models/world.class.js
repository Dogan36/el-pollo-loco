class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud(),
    ];
    backgroundObjects = [
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0, 100)
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.canvas = canvas
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.addToMap(this.character)
        
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.backgroundObjects);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

addObjectsToMap(objects){
    objects.forEach(object => {
        this.addToMap(object);
        });
}

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
}

