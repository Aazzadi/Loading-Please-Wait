class Particle{
  constructor(x,y){
    this.loc=createVector(random(-width,width),random(-height,height)); //Starting Position
    this.tar=createVector(x,y);

    this.vel=p5.Vector.random2D();
    this.acc=createVector();
    this.r=1.5; //Size
    this.maxSpeed=5;
    this.maxForce=0.3;

    this.timer=0;
    this.lifeSpan=255;

  }

  behaviours(){
    var arrive =this.arrive(this.tar);
    this.applyForce(arrive);
  }

  applyForce(f){
   this.acc.add(f);
  }


  update(){
      this.loc.add(this.vel);  //Vel changing position
      this.vel.add(this.acc); //Acceleration changing Vel

      this.acc.mult(0);
      this.timer+=0.01;
  }

  display(){
    push();
    stroke(255,this.lifeSpan);
    strokeWeight(1);
    scale(1.2);
    point(this.loc.x-356,this.loc.y-50);
    point()
    pop();
  }

  seek(target){
    var desired= p5.Vector.sub(target,this.loc);
    desired.setMag(this.maxSpeed);
    var steer=p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  arrive(target){
    var desired= p5.Vector.sub(target,this.loc);
    var d=desired.mag();
    var speed= this.maxSpeed;
    if(d<100){
       speed= map(d,0,100,0,this.maxSpeed);
    }
    desired.setMag(speed);
    var steer=p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxForce);
    return steer;


  }

  isDead(){
    if(this.timer>=5){
      this.lifeSpan-=0.001;
      this.timer=0;
      return true;
    }else{
      return false;
      }
     
  
  }

}