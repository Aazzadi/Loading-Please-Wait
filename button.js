class Button{
    constructor(x,y,r){
     this.pos=createVector(x,y);
     this.vel=createVector(-1,0);
     this.acc = createVector(0, 0);
     this.r =r;
     this.lifeSpan=10;
     this.col=color(255); 

    }

    show(){

    noFill();
    strokeWeight(2);
    //fill(this.col);
    stroke(this.col);
    //noStroke();
    push();
    translate(this.pos.x,this.pos.y);
    ellipseMode(CENTER);
    ellipse(0,0,this.r*2,this.r*2);
    
    pop();
    
    
    }

    move(){
        //this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    finished(){
        return(this.lifetime<0);
    }

    changeColor(){
     this.col=color(random(255),random(255),0);

    }
}