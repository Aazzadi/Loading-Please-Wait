class Vehicle{
 constructor(x,y,img,snd,link){
    this.pos=createVector(x,y);
    this.target=createVector(x,y);
    //this.vel=createVector(0,0);
    this.vel =p5.Vector.random2D(); //Static Function
    //this.vel = createVector(random(1,-1), random(1,-1));
    
    this.vel.mult(random(-5,5)); //Speed of light 
       
    this.acc = createVector(0, 0);

    this.r =16;
    this.maxSpeed=5; //3 
    this.maxForce=0.04; //0.01 random(0.01,0.4)

    this.seeingDistance =100;
    //Image
    this.img=img;

    //Sound
    this.snd=snd;
    //Rotation Angles
    this.angle=0;
    this.endangle=-PI;

    this.angleV=0;
    this.angleA=0.01;
    
    this.stopped=false;
    
    this.incrementR=3;
    

    this.textPos =300;
    this.link= link;
    this.alpha=0;

 }
 
 stop(){
     this.stopped=true;
 }


 flee(target){
     return this.seek(target).mult(-0.9);
 }

 seek(target){ //Seek and Arrive
     let force =p5.Vector.sub(target,this.pos);

     let slowRadius=300; //Radius where the vehicle will slow down
     let distance= force.mag();  //distance is already there in the force vector
     if(distance<slowRadius){   
         let desiredSpeed=map(distance,-10,slowRadius,0,this.maxSpeed);
         force.setMag(desiredSpeed);
     }else{
     force.setMag(this.maxSpeed);
     }

     //let steer=p5.Vector.sub(desired,this.vel);
     force.sub(this.vel);
     force.limit(this.maxForce);
    //  this.applyForce(desired);
     return force;
 }

 update(){
     //Motion101 algorithm (Euler)
   if(this.stopped==false){   //As long as it is not stopped dont continue to update
  this.vel.add(this.acc);
  
//   this.angle+=0.1;
//   this.vel=p5.Vector.fromAngle(this.angle);

  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);
   }
  

  //internal Angle rotation
  this.angleA= this.acc.y / 100.0;

   
   this.angleA=map(this.angleV,0,width,-0.0005,0.0005); 
  this.angleV=constrain(this.angleV,-1.4,1.4); 

  
  this.angleV += this.angleA;
  this.angle += this.angleV;

  this.acc.set(0, 0);

  //this.textPos--;
  this.alpha +=2;
 }
 
 
 applyForce(force){
  this.acc.add(force);
 }


show(){
    stroke(255);
    strokeWeight(1);

   
    
    noFill();
    push();
    
    translate(this.pos.x,this.pos.y);
    //Debugging info
    noFill();
    stroke(255);
    rotate(this.angle);
    
    scale(1.2);
    imageMode(CENTER);
    image(this.img,-this.r/2+10,-this.r/2+5);

    
    
    //line(0,0,this.r,0);
    // ellipseMode(CENTER);
    //pop();
    
   // push();
    
    // let r=map(sin(angle),-1,1,16,100);
    //  ellipse(8,7.5,this.r*this.incrementR,this.r*this.incrementR);
     
    //let seeingDistance=this.vel.mag()*this.seeingFactor;
    // rect(-this.r,-this.r/2,this.seeingDistance,this.r);
    pop();
   // ellipse(this.pos.x,this.pos.y,this.r*4);
   
    push();
    
    translate(this.pos.x,this.pos.y);
    // this.angle=this.vel.heading();
    // rotate(this.angle);
    rotate(this.vel.heading());
    //triangle(-this.r,-this.r/2,-this.r,this.r/2,this.r,0);
    //pop();
 
    
    pop();

    push();
    //translate()
    

    pop();

}

stopRotation(){
    // if(this.stopped==true){
        
        //this.angleV*=0;
     
           if(this.angle<=PI/2 || this.angle>=-PI/2){ //
          
          this.angleV*=0;
          this.angleA*=0;
          //this.angle=PI;
            //this.ChangeAngle();
            this.angle=lerp(this.angle,this.endangle,random(0.1,0.01));//O and -PI  Ending angle
           
       }
    // }
  
}

pursue(vehicle){
    let target=vehicle.pos.copy();
    target.add(vehicle.vel)

    return this.seek(target);

}

intersects(other){
    var d =dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y);
    if(d<this.r*2+ other.r*2){
      return true;
    }else{
        return false;
    }
}

playSound(){
    if(!this.snd.isPlaying()){
    this.snd.play();
    //this.drawWave();

    //this.r=map(sin(angle),-1,1,-200,200);
    }
}

drawWave(){
    push();
    angleMode(DEGREES);
    stroke(random(255),random(255),random(255));
    noFill();
    translate(this.pos.x,this.pos.y);
    var wave= fft.waveform();

    for (var t=-1;t<=1;t+=2){
       beginShape();
       //angleMode(DEGREES);
     
       for(var i=0;i<=180;i+=1){
        var index= floor(map(i,0, 180,0,wave.length-1));

        var r= map(wave[index],-1,1,16,90);

        let posA= r*sin(i)*t+4;
        let posB= r*cos(i)+2;
        vertex(posA,posB);
    }


    endShape();
   }
    pop();
    angleMode(RADIANS);
}

seperation(vehicles){
    let perceptionRadius=100;
    let steering= createVector();
    let total=0;
    for (let other of vehicles){
        let d= dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y);
        if(other =! this && d<perceptionRadius);
        let diff =p5.Vector(this.pos,other.pos);
        diff.div(d);
        steering.add(diff);
        total++;
    }
    if(total>0){
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
   }

flock(vehicles){
    let seperation= this.seperation(vehicles);
    this.acc.add(seperation);
}

showText(){
    
      noStroke();
    //console.log("First Event triggered")
    //stroke(255)
    textSize(18); // Set the text size
    textFont('Georgia');
    textAlign(CENTER); // Center the text horizontally and vertically
    // let y=600;
    //console.log(this.textPos);
    // y--;
    fill(255, this.alpha);
    //text("In the depths of the artist\'s lair,\n A laboratory lies, full of wonder and scare.\n You get to experiment,analyze each substance with care,\n Take your time, proceed with flair.", 0,this.textPos);
  

  
   if(this.textPos<=300){
    this.textPos=300;
   }


}

clicked(px,py){
     push();
    
     //translate(width/2,height/2);
     //console.log(this.pos.x, this.pos.y)
    let d = dist(px - width/2,py - height/2,this.pos.x,this.pos.y);
    //console.log(this.img.x);
    if( d < (this.r*2)){  //!this.intersects
    console.log("Clicked");
    window.open(this.link);
    //ellipse(this.pos.x,this.pos.y,this.r*4);
    }
    pop();
}
 








//  getNormalPoint(p,a ,v){
//      //Vector from a to pos
//      const ap= p5.Vector.sub(p,a);
//      //Vector for a to b
//           //const ab= p5.Vector.sub(b,a);
//     //Using the dot product for scalar projection
//     v.normalize(); //Normalize the line
//     //project the vector "diff" onto the line using dot product
//     v.mult(ap.dot(v));
//     //finding the normall point along the line segment
//     const normalPoint=p5.Vector.add(a,v);
//     return normalPoint;
//  }

//  avoid(obstacle){
//     let pos = obstacle.copy(); //Position is the obstacle
//     let a = this.pos.copy();
//     //let v= this.vel.copy().mult(this.seeingFactor);
//     let v= this.vel.copy()
//    // let b= p5.Vector.add(a,v);
//     let normal =this.getNormalPoint(pos,a,v);


//     stroke(255);
//     line(normal.x,normal.y,obstacle.x,obstacle.y);
    
//     let d1 =p5.Vector.dist(normal,obstacle);
//     let d2 =p5.Vector.dist(normal,this.pos);
//     if(d1< obstacle.r && d2<this.seeingDistance){
//         fill(255,0,0);
//     }else{
//         fill(0,255,0);
//     }
//     noStroke();
//     circle(normal.x,normal.y,16);
    
//  }





}