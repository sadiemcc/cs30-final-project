// Grocery Store Game

let x = 200;
let y = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  movement();
}

function movement(){
  circle(x, y, 50);
  if (keyIsDown("w")){
    y--;
  }
  else if (keyIsDown("a")){
    x--;
  }
  else if (keyIsDown("s")){
    y++;
  }
  else if (keyIsDown("d")){
    x++;
  }
}