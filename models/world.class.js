class World {
    character = new Character();
    
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedBottles = 0;
    collectedCoins = 0;
    timepassedThrow
    lastThrowTime = new Date().getTime()





    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this
      
    }

    run() {
        setInterval(() => {
            this.checkJumpingOn();
            this.checkCollision();
            this.checkThrowObjects();
            this.checkCollection();
            this.checkEndbossHit()
        }, 1000 / 60);


    }

    checkThrowObjects() {
        if (this.keyboard.D && this.lastThrow()) {
            if (this.collectedBottles > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.collectedBottles -= 10
                this.lastThrowTime = new Date().getTime()
            }
        }
    }

    lastThrow() {
        let timepassedThrow = new Date().getTime() - this.lastThrowTime
        return timepassedThrow > 500
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit()
                this.statusBarHealth.setPercentage(this.character.energy)
            }
        })
    }

    checkEndbossHit() {
        this.throwableObjects.forEach((bottle) => {
            if (this.level.enemies[0].isColliding(bottle)) {
                this.level.enemies[0].hit()
                this.statusBarEndboss.setPercentage(this.level.enemies[0].energy)
            }
        })
    }

    checkJumpingOn() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isJumpingOn(enemy) && !(enemy instanceof Endboss) && !(this.character.isDead())) {
                this.level.enemies.splice(i, 1);
                this.character.rejump()
            }
        })
    }

    checkCollection() {
        // Flaschen sammeln
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                bottle.collect()
                this.level.bottles.splice(i, 1);
            }
            this.statusBarBottles.setPercentage(this.collectedBottles)
        })

        // Münzen sammeln
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                console.log(this.collectedCoins)
                coin.collect()
                this.statusBarCoins.setPercentage(this.collectedCoins)
                this.level.coins.splice(i, 1);
            }
        })
    }


    checkClose() {
        if (this.character.isClose(Endboss)) {
            this.enemies.Endboss.isClose()

        }

    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character)
        
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.statusBarHealth)
        this.addToMap(this.statusBarCoins)
        this.addToMap(this.statusBarBottles)
        this.addStatusbarEndboss()
        this.ctx.translate(this.camera_x, 0)



        this.ctx.translate(-this.camera_x, 0)

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)

        }
        mo.draw(this.ctx);

        if (mo instanceof Character || mo instanceof Chicken || mo instanceof Endboss || mo instanceof Smallchicken || mo instanceof Bottle || mo instanceof Coin || mo instanceof ThrowableObject) {
            mo.drawFrame(this.ctx);
        }

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    addStatusbarEndboss(){
        if(this.character.x> this.level.enemies[0].x-500){
            this.addToMap(this.statusBarEndboss)
        }
    }
}

