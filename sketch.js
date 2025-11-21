// Grocery Store Game

let gameState = "shopping";
let x = 200;
let y = 200;
let radius = 50;
let groceryListOptions = ['apples', 'bananas', 'oranges', 'cucumbers', 'potatoes', 'tomatoes', 'onions', 'bell peppers', 'lettuce', 'carrots', 'frozen pizza', 'ice cream', 'ground beef', 'sausages', 'fish', 'bacon', 'butter', 'cheese', 'eggs', 'milk', 'yogurt', 'cereal', 'cookies', 'pasta', 'chips', 'canned soup', 'flour', 'sugar'];
let chosenGroceryList = [];
let choices;
let randomChoice;
let lastSwitched = 0;
let duration = 60000;
let showDuration = 6000;

class Player{
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  display(){
    circle(this.x, this.y, this.radius);
  }

  move(){
    if (keyIsDown(87) && this.y > 100 + this.radius/2){
      this.y -= 5;
    }
    //a
    if (keyIsDown(65) && this.x > 100 + this.radius/2){
      this.x -= 5;
    }
    //s
    if (keyIsDown(83) && this.y < height-this.radius/2){
      this.y += 5;
    }
    //d
    if (keyIsDown(68) && this.x < width-this.radius/2){
      this.x += 5;
    }
    if (keyIsDown(32) && !keyIsDown(87) && !keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68)){
      rectMode(CENTER);
      rect(width/2, height/2, 400, 700);
      wordsOnList();
    }
    if (this.x < 225 && this.y < 275){
      fill(0);
      textSize(100);
      text("test", 100, 100);
      textAlign(CENTER);
      fill(255);
    }
  }
}

let person = new Player(200, 200, 25*2);

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomGroceryList();
}

function draw() {
  background(220);
  shelving();
  interactiveShelf();
  person.display();
  person.move();
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
  let listHeight = 200;
  let division = 100;
  for (let i = 0; i < chosenGroceryList.length; i++){
    text("- "+chosenGroceryList[i], width/2, height/2-listHeight);
    listHeight = listHeight - division;
  }
  fill(255);
}

function shelving(){
  rectMode(CORNER);
  rect(0, 0, width, 100);
  rect(0, 0, 100, height);
  rect(300, 300, width-600, 150);
}

function interactiveShelf(){
  rectMode(CORNER);
  fill("yellow");
  rect(0, 100, 100, 100);
  fill(0, 255, 0, 15);
  rect(0, 100, 200, 150);
  fill(255);
}