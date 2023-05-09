class Bottle extends MovableObject {
    height = 100;
    width = 100; 
    y = 330;
    offset = {
        right: 50,
        left: 30,
        top: 30,
        bottom: 50
    };
    bottles=[]
    
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
       
    ]

    constructor(){
        super();
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        this.loadImage(this.IMAGES_BOTTLE[randomIndex]);
        this.x = 120 + Math.random() * 2000;
    }

    collect() {
       
        world.collectedBottles += 10;
    }
        
}