// Grocery Store Game

let x = 200;
let y = 200;
let radius = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  movement();
}

function movement(){
  circle(x, y, radius);
  //w
  if (keyIsDown(87) && y > radius/2){
    y -= 5;
  }
  //a
  else if (keyIsDown(65) && x > radius/2){
    x -= 5;
  }
  //s
  else if (keyIsDown(83) && y < height-radius/2){
    y += 5;
  }
  //d
  else if (keyIsDown(68) && x < width-radius/2){
    x += 5;
  }
}