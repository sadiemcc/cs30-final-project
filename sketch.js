// Grocery Store Game

let gameState = "shopping";
let x = 200;
let y = 200;
let radius = 50;
let groceryListOptions = ['apples', 'bananas', 'oranges', 'cucumbers', 'potatoes', 'tomatoes', 'onions', 'bell peppers', 'lettuce', 'carrots', 'frozen pizza', 'ice cream', 'ground beef', 'sausages', 'fish', 'bacon', 'butter', 'cheese', 'eggs', 'milk', 'yogurt', 'cereal', 'cookies', 'pasta', 'chips', 'canned soup', 'flour', 'sugar'];
let chosenGroceryList = [];
let choices;
let randomChoice;

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomGroceryList();
}

class Shelf{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 100;
  }

  display(){
    rect(this.x, this.y, this.width, this.height);
  }
}

let topShelf = new Shelf(0, 0);

function draw() {
  background(220);
  topShelf.display();
  // shelving();
  movement();
}

//randomizes what is on your grocery list
function randomGroceryList(){
  for (let n = 0; n < 5; n++){
    let randomChoice = random(groceryListOptions);
    let choices = groceryListOptions.indexOf(randomChoice);
    chosenGroceryList.push(randomChoice);
    groceryListOptions.splice(choices, 1);
  }
  console.log(chosenGroceryList);
}

//function that makes the chosenlist appear on the white rectangle
function wordsOnList(){
  fill(0);
  textAlign(CENTER);
  textSize(45);
  text("- "+chosenGroceryList[0], width/2, height/2-200);
  text("- "+chosenGroceryList[1], width/2, height/2-100);
  text("- "+chosenGroceryList[2], width/2, height/2);
  text("- "+chosenGroceryList[3], width/2, height/2+100);
  text("- "+chosenGroceryList[4], width/2, height/2+200);
  fill(255);
}

function movement(){
  circle(x, y, radius);
  //w
  if (keyIsDown(87) && y > 100 + radius/2){
    y -= 5;
  }
  //a
  if (keyIsDown(65) && x > 100 + radius/2){
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
    wordsOnList();
  }
}

function shelving(){
  rectMode(CORNER);
  rect(0, 0, width, 100);
  rect(0, 0, 100, height);
  rect(300, 300, width-600, 150);
}