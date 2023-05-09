class Bottle extends MovableObject {
    height = 100;
    width = 100 
    y = 330;
    
    
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
}