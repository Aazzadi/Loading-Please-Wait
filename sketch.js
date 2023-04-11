//Aditya Kanade
//https://linktr.ee/adityakanade
//Instagram : @azz_adi
let sceneNum=0;
var gDebugMode=false;
let startpos=125;
let sepdist=50;
let timer=0;

let angle = 0;
let angleV = 0.05;

let goal;

let vehicle; //Create a vehicle
let button1; //Create a button

let vehicles=[];
let buttons=[];
let logo=[];

let button2; 
let startTimer =false; //Timer is off




let spots;

let spots0;
let spots1;
let spots2;
let spots3;
let spots4;
let spots5;



let cars=[];

let cars0=[];
let cars1=[];
let cars2=[];
let cars3=[];
let cars4=[];
let cars5=[];

let img;

let particle;
var particles=[];

let stopWatch=0;


//------------------------------------------------------------------
function preload(){
   img= loadImage('data/ff.png');

   for(let i=0;i<6;i++){
     logo[i]= loadImage('data/bmw' + i +'.png');
   }

  
}

//--------------------------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  //textSize(15);
  //console.log('width',windowWidth, 'height',windowHeight);
   
   
  vehicles[0]= new Vehicle(-250,0,logo[0]);
  vehicles[1]= new Vehicle(-150,0,logo[1]);
  vehicles[2]= new Vehicle(-50,0,logo[2]);
  vehicles[3]= new Vehicle(50,0,logo[3]);
  vehicles[4]= new Vehicle(150,0,logo[4]);
  vehicles[5]= new Vehicle(250,0,logo[5]);
   
   

  buttons[0]= new Button(-250,0,30);
  buttons[1]= new Button(-150,0,30);
  buttons[2]= new Button(-50,0,30);
  buttons[3]= new Button(50,0,30);
  buttons[4]= new Button(150,0,30);
  buttons[5]= new Button(250,0,30);



  //Particles from Random Locations
  var density = displayDensity();
  pixelDensity(1);

  loadingPixels();
  creatingArrays();
   

  // pop();
  //console.log('cars', cars.length);
 
  //console.log('spots', spots.length);
  //
  
}




//---------------------------------------------------------------------------------------
function draw() {
  
  background(51);
  
  translate(width/2,height/2);
  stopWatch+=0.01;
  
  //Opening Sequence
  firstSequence(); //Particles from Random Locations and Deleting them Open

  
 
    if(stopWatch>4.99){
      
     secondSequence();
     
   }
   
  

  //Show all target buttons
  // for (var j=0;j<buttons.length;j++){
  //   var button=buttons[j];
  //    button.show();
  // }
  
  
  let steering0 =vehicles[0].seek(buttons[5].pos);
  let steering1 =vehicles[1].seek(buttons[4].pos);
  let steering2 =vehicles[2].seek(buttons[3].pos);
  let steering3 =vehicles[3].seek(buttons[2].pos);
  let steering4 =vehicles[4].seek(buttons[1].pos);
  let steering5 =vehicles[5].seek(buttons[0].pos);
  
  //Refactored
  // for (let i = 0; i < vehicles.length; i++) {
  //   let steering = vehicles[i].seek(buttons[vehicles.length-i-1].pos);
  //   vehicles[i].applyForce(steering);
  //   }
  
  
  vehicles[0].applyForce(steering0);
  vehicles[1].applyForce(steering1);
  vehicles[2].applyForce(steering2);
  vehicles[3].applyForce(steering3);
  vehicles[4].applyForce(steering4);
  vehicles[5].applyForce(steering5);
  
  //Refactored
  // for (let i = 0; i < vehicles.length; i++) {
  //   vehicles[i].applyForce(eval("steering" + i));
  // }

  checkIntersection();

  
  if(gDebugMode==true){
    drawDebugInfo();
     }
  
}
//------------------------------------------------------------
// function mousePressed(){
//   //translate(width/2,height/2);
//   for (var i=0;i<vehicles.length;i++){
   
//     var vehicle=vehicles[i];
//     vehicle.clicked(mouseX, mouseY);
//   }
// }

//-------------------------------------------------------------------------------

function secondSequence(){
  //drawiText();
  for (var i=0;i<vehicles.length;i++){
    var vehicle=vehicles[i];
    vehicle.update();
    vehicle.show();
    vehicle.showText();
    //vehicle.flock(vehicles);
    // if(vehicle.clicked(mouseX,mouseY)){
    //   console.log("Clicked")
    // }
    
    //For every vehicle check every other vehicles

    for(var j=0;j<vehicles.length;j++){
      if(i!=j && vehicles[i].intersects(vehicles[j])){
        //vehicles[i].playSound();
        //vehicles[i].drawWave();
        
      }
    }
    
  }
  
}

function checkIntersection(){

 //Get the distance between 2 objects
  
      

      //Check if they thar

  if(allIntersected()){  //|| eachIntersected()
          
      
      for (var i=0;i<vehicles.length;i++){
        var vehicle=vehicles[i];
        //vehicle.stop();
        vehicle.stopRotation();
        timer+=0.01;
      }
      
    
    
        for (var j=0;j<buttons.length;j++){
          var button=buttons[j];
    
          button.lifeSpan-=0.1;
       //Star,255t timer
    if(timer>=10 || button.finished()){ //
      //if(timer>=10 && button.lifeSpan>=10){
    // if(button.finished()){
      changeScene();
  
      timer =0 ;
      button.lifeSpan=10;
    }

    // else if (timer<=-10 && button.lifeSpan<=-10){
    //   changeScene();
    //   timer =0 ;
    //   button.lifeSpan=10;
    // }
    
    
     }
    
  }

  
}

function allIntersected(){

  let dist0= p5.Vector.dist(buttons[5].pos,vehicles[0].pos);
      let dist1= p5.Vector.dist(buttons[4].pos,vehicles[1].pos);
      let dist2= p5.Vector.dist(buttons[3].pos,vehicles[2].pos);
      let dist3= p5.Vector.dist(buttons[2].pos,vehicles[3].pos);
      let dist4= p5.Vector.dist(buttons[1].pos,vehicles[4].pos);
      let dist5= p5.Vector.dist(buttons[0].pos,vehicles[5].pos);

  if((dist0 <= (vehicles[0].r + buttons[5].r )) &&
  (dist1 <= (vehicles[1].r + buttons[4].r )) &&
  (dist2 <= (vehicles[2].r + buttons[3].r )) &&
  (dist3 <= (vehicles[3].r + buttons[2].r )) &&
  (dist4 <= (vehicles[4].r + buttons[1].r)) &&
  (dist5 <= (vehicles[5].r + buttons[0].r ))){
    
    //vehicle.stop();
    for (var j=0;j<buttons.length;j++){
      var button=buttons[j];
       //button.changeColor();
    }

    return true;
  }
}



 function changeScene(){
  sceneNum++;
  //button==null;
  if (sceneNum == 2 ){
    sceneNum = 0;
    
  }
  switch(sceneNum){
    case 0:


      // for(var j=0;j<6;j++){
      //   //buttons[j]=new Button(-j*100,0,30);
      //   buttons[j]=new Button(random(-width/2,width/2),random(-height/2,height/2),25);
      // }
      buttons[5]= new Button(-250,0,30);
      buttons[4]= new Button(-150,0,30);
      buttons[3]= new Button(-50,0,30);
      buttons[2]= new Button(50,0,30);
      buttons[1]= new Button(150,0,30);
      buttons[0]= new Button(250,0,30);
    
     //button1= new Button(-125,0,30);
    //  button1= new Button(random(-width/2,width/2),random(-height/2,height/2));
    for (var i=0;i<vehicles.length;i++){
      var vehicle=vehicles[i];
       
        vehicle.vel =p5.Vector.random2D();
        vehicle.vel.mult(random(-5))
        vehicle.acc.mult(0);

        vehicle.angle=-PI;
        vehicle.endangle=0;
        // vehicle.maxSpeed*0;
        // vehicle.maxForce*0;
    }
     break;

     case 1:
      
      

      // for(var j=0;j<6;j++){
      //  // buttons[j]=new Button(100+j*100,0,30);
      //  buttons[j]=new Button(random(-width/2,width/2),random(-height/2,height/2),25);
      // }
      
      buttons[0]= new Button(-250,0,30);
      buttons[1]= new Button(-150,0,30);
      buttons[2]= new Button(-50,0,30);
      buttons[3]= new Button(50,0,30);
      buttons[4]= new Button(150,0,30);
      buttons[5]= new Button(250,0,30);


     //button1 = new Button(125,0,30);
    
    //  button1= new Button(random(-width/2,width/2),random(-height/2,height/2));
    for (var i=0;i<vehicles.length;i++){
      var vehicle=vehicles[i];
    
     vehicle.vel =p5.Vector.random2D();
     vehicle.vel.mult(random(-5))

        vehicle.acc.mult(0);

        vehicle.angle=0;
        vehicle.endangle=-PI;
        // vehicle.maxSpeed*0;
        // vehicle.maxForce*0;
    }
    
     break;
    }
 
  
 }






function drawDebugInfo(){

  fill(255);
  noStroke();

  //text(" Particle Timer : " + cars0[0].timer , -400, height/2-40);
  //text(" Particle Velocity : " + cars5[0].vel , -400, height/2-60);

  text(" SceneNum : " + sceneNum , -400, height/2-80);
  text(" timer : " + timer , -400, height/2-100);
  //text(" lifespan: " + cars0.isDead , -400, height/2-120);

  // text(" watch State: " + watchStart , -400, height/2-140);
  //text(" vel : " + vehicle.vel , -400, height/2-120);
  //text(" acc : " + vehicle.acc , -400, height/2-140);
  // text(" Target 2 Xposition : " + targets[2].pos.x , -400, height/2-80);
 
}

function loadingPixels(){
  

 
   
  logo[0].loadPixels();
  spots0=[];

  for (var x = 0; x < logo[0].width; x++) {
    for (var y = 0; y < logo[0].height; y++) {

      var index = x + y * logo[0].width;
      var c = logo[0].pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        spots0.push(createVector(x+46, y-2));
      }
    }
  }
  logo[0].updatePixels();


  



  logo[1].loadPixels();
  spots1=[];

  for (var x = 0; x < logo[1].width; x++) {
    for (var y = 0; y < logo[1].height; y++) {

      var index = x + y * logo[1].width;
      var c = logo[1].pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        spots1.push(createVector(x+89, y-2));
      }
    }
  }
  logo[1].updatePixels();


  logo[2].loadPixels();
  spots2=[];

  for (var x = 0; x < logo[2].width; x++) {
    for (var y = 0; y < logo[2].height; y++) {

      var index = x + y * logo[2].width;
      var c = logo[2].pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        spots2.push(createVector(x+131, y-2));
      }
    }
  }
  logo[2].updatePixels();


  logo[3].loadPixels();
  spots3=[];

  for (var x = 0; x < logo[3].width; x++) {
    for (var y = 0; y < logo[3].height; y++) {

      var index = x + y * logo[3].width;
      var c = logo[3].pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        spots3.push(createVector(x+172, y-2));
      }
    }
  }
  logo[3].updatePixels();


  logo[4].loadPixels();
  spots4=[];

  for (var x = 0; x < logo[4].width; x++) {
    for (var y = 0; y < logo[4].height; y++) {

      var index = x + y * logo[4].width;
      var c = logo[4].pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        spots4.push(createVector(x+214, y-2));
      }
    }
  }
  logo[4].updatePixels();

  logo[5].loadPixels();
  spots5=[];

  for (var x = 0; x < logo[5].width; x++) {
    for (var y = 0; y < logo[5].height; y++) {

      var index = x + y * logo[5].width;
      var c = logo[5].pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        spots5.push(createVector(x+255, y-2));
      }
    }
  }
  logo[5].updatePixels();



  
}

function creatingArrays(){
  

  push();
  

  for (var i=0;i<spots0.length;i++){
    var pt=spots0[i];
  
    var a= new Particle(pt.x+46,pt.y-2);
    cars0.push(a);
    

  }
 
  pop();


  push();
  
  for (var i=0;i<spots1.length;i++){
    var pt=spots1[i];
  
    var b= new Particle(pt.x+89,pt.y-2);
    cars1.push(b);

  }
 
  pop();


  push();
  
  for (var i=0;i<spots2.length;i++){
    var pt=spots2[i];
  
    var c= new Particle(pt.x+131,pt.y-2);
    cars2.push(c);

  }
 
  pop();

  push();
  
  for (var i=0;i<spots3.length;i++){
    var pt=spots3[i];
  
    var d= new Particle(pt.x+172,pt.y-2);
    cars3.push(d);

  }
 
  pop();

  push();
  
  for (var i=0;i<spots4.length;i++){
    var pt=spots4[i];
  
    var e= new Particle(pt.x+214,pt.y-2);
    cars4.push(e);

  }
 
  pop();

  push();
  
  for (var i=0;i<spots5.length;i++){
    var pt=spots5[i];
  
    var f= new Particle(pt.x+255,pt.y-2);
    cars5.push(f);

  }
 
  pop();


}


function firstSequence(){

  for (var i=0;i<cars0.length;i++){
    var a=cars0[i];
    a.behaviours();
    a.update();
    a.display();
    if(a.isDead()){
           cars0.splice(i,1);
     }
  }
  // for( i=cars0.lenght-1;i<=0;i--){
  //   if(cars0[i].isDead()){
  //     cars0.splice(i,581);
  //   }
  // }


  for (var i=0;i<cars1.length;i++){
    var b=cars1[i];
    b.behaviours();
    b.update();
    b.display();
    if(b.isDead()){
      cars1.splice(i,1);
    }
  }

  for (var i=0;i<cars2.length;i++){
    var c=cars2[i];
    c.behaviours();
    c.update();
    c.display();
    if(c.isDead()){
      cars2.splice(i,1);
    }
  }

  for (var i=0;i<cars3.length;i++){
    var d=cars3[i];
    d.behaviours();
    d.update();
    d.display();
    if(d.isDead()){
      cars3.splice(i,1);
    }
  }

  for (var i=0;i<cars4.length;i++){
    var e=cars4[i];
    e.behaviours();
    e.update();
    e.display();
    if(e.isDead()){
      cars4.splice(i,1);
    }
  }

  for (var i=0;i<cars5.length;i++){
    var f=cars5[i];
    f.behaviours();
    f.update();
    f.display();
    if(f.isDead()){
      cars5.splice(i,1);
    }
  }
}










