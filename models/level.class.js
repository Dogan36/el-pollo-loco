class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    level_end_x = 3000;

    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins
    }
}