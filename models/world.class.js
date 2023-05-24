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
        world_sound.play()
    }


    setWorld() {
        this.character.world = this
    }

    /**
     * This function runs certain checks in an interval
     * 
     */
    run() {
        setInterval(() => {
            this.checkJumpingOn();
            this.checkCollision();
            this.checkThrowObjects();
            this.checkCollection();
            this.checkEndbossHit()
        }, 1000 / 60);
    }

    /**
     * This function creates a new throwableObject if contidions are met, reduces colleceted bottles and sets time of last throw
     * 
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.lastThrow() && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 1
            this.lastThrowTime = new Date().getTime()
        }
    }

    /**
     * This function checks if the last throw happend in a certain timeframe
     * 
     * @returns boolean
     */
    lastThrow() {
        let timepassedThrow = new Date().getTime() - this.lastThrowTime
        return timepassedThrow > 600
    }

    /**
     * This function checks if the character is colliding with any of the enemies, calls hit() on character and sets percentage of health
     * 
     */
    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !(enemy.isDead()) || this.charaterBehindEndboss()) {
                this.character.hit()
                this.statusBarHealth.setPercentage(this.character.energy)
            }
        })
    }


    /**
     * Checks if the character is behind endboss
     * 
     * @returns boolean
     */
    charaterBehindEndboss() {
        return this.character.x > this.level.enemies[0].x + 100
    }

    /**
     * Checks if the Endboss is hit by a trowable object
     * 
     */
    checkEndbossHit() {
        const throwableObjects = this.throwableObjects.slice(); // Kopie der throwableObjects-Array erstellen
        const enemies = this.level.enemies; // Referenz auf enemies speichern
        for (let i = 0; i < throwableObjects.length; i++) {
            const bottle = throwableObjects[i];
            if (enemies[0].isColliding(bottle)) {
                enemies[0].hit();
                this.statusBarEndboss.setPercentage(enemies[0].energy);
                setTimeout(() => {
                    const index = this.throwableObjects.indexOf(bottle); // Index des bottle in der ursprünglichen Array finden
                    if (index !== -1) {
                        this.throwableObjects.splice(index, 1);
                    }
                }, 250);
            }
        }
    }

    /**
     * This function checks if the charater is jumping on any of the enemies except endboss
     * 
     */
    checkJumpingOn() {
        const enemies = this.level.enemies.slice(); // Kopie der Feind-Array erstellen
        enemies.forEach((enemy, i) => {
            if (this.character.isJumpingOn(enemy) && !(enemy instanceof Endboss) && !(this.character.isDead()) && !(enemy.isDead())) {
                enemy.energy = 0;
                setTimeout(() => {
                    const index = this.level.enemies.indexOf(enemy); // Index des Feindes in der ursprünglichen Array finden
                    if (index !== -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, 2000);
                this.character.rejump();
            }
        });
    }


    checkCollection() {
        this.checkCollectionBottles()
        this.checkCollectionCoins()
    }

    /**
     * This function checks if is colliding with any of the bottles, calls collect, removes it from array
     * 
     */
    checkCollectionBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                bottle.collect()
                this.level.bottles.splice(i, 1);
            }
        })
        this.statusBarBottles.setPercentage(this.collectedBottles * 10)
    }

    /**
     * This function checks if is colliding with any of the coins, calls collect, removes it from array
     * 
     */
    checkCollectionCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                coin.collect()
                this.statusBarCoins.setPercentage(this.collectedCoins)
                this.level.coins.splice(i, 1);
            }
        })

    }

    /**
     * This function checks if the character is close to hte endboss
     * 
     */
    checkClose() {
        if (this.character.isClose(Endboss)) this.enemies.Endboss.isClose()
    }

/**
 * This function clears the canvas and draws everything depending on the animationframe
 * 
 */
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

/**
 * This function calls addToMap function for each element of an array
 * 
 * @param {string} objects - This is an array of elements
 */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

/**
 * This function adds an element to the map, flips it if necessary
 * 
 * @param {string} mo- this elements is added to the map 
 */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo)
    }

/**
 * This function flips an element
 * 
 * @param {string} mo - This is the element to be flipped
 */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

/**
 * This function flips an element back
 * 
 * @param {string} mo - This is the element to be flipped
 */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

/**
 * This function add the statusbar of the endboss if certain conditions are met, stoppes world sound, plays danger sound
 * 
 */
    addStatusbarEndboss() {
        if (this.level.enemies[0] && this.character.x > this.level.enemies[0].x - 500 && !(this.level.enemies[0].isDead())) {
            this.addToMap(this.statusBarEndboss)
            world_sound.pause();
            danger_sound.play()
        }
    }
}

