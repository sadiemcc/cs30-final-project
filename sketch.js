// Grocery Store Game

let gameState = "shopping";
let x = 200;
let y = 200;
let radius = 50;
let groceryListOptions = ['apples', 'bananas', 'oranges', 'cucumbers', 'potatoes', 'tomatoes', 'onions', 'bell peppers', 'lettuce', 'carrots', 'frozen pizza', 'ice cream', 'ground beef', 'sausages', 'fish', 'bacon', 'butter', 'cheese', 'eggs', 'milk', 'yogurt', 'cereal', 'cookies'];
let chosenGroceryList = [];
let choices;

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomGroceryList();
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
  if (keyIsDown(65) && x > radius/2){
    x -= 5;
  }
  //s
  if (keyIsDown(83) && y < height-radius/2){
    y += 5;
  }
  //d
  if (keyIsDown(68) && x < width-radius/2){
    x += 5;
  }
  if (keyIsDown(32)){
    rectMode(CENTER);
    rect(width/2, height/2, 400, 700);
  }
}

function randomGroceryList(){
  for (let n = 0; n < 5; n++){
    let choices = indexOf(random(groceryListOptions));
    groceryListOptions.splice(choices, 1);
    chosenGroceryList.push(choices);
  }
  console.log(choices);
}