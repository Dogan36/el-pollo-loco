class ThrowableObject extends MovableObject {


    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(x,y);
        this.speedY = 25;
        this.speedX = 10;
    }

    throw(){

        
        this.applyGravity()
        setInterval(()=> {
            this.x += this.speedX;
            
        },25)
    }
}

    
