// Grocery Store Game

let gameState = "shopping";
let x = 200;
let y = 200;
let radius = 50;
let departments = {
  produce: ["apples", "bananas", "oranges", "cucumbers", "potatoes", "tomatoes", "onions", "bell peppers", "lettuce", "carrots"],
  freezer: ["frozen pizza", "ice cream", "pizza pops", "frozen veggies", "frozen fruit"],
  meat: ["ground beef", "sausages", "fish", "bacon", "ground pork"],
  dairy: ["butter", "cheese", "eggs", "milk", "yogurt"],
  dryGoods: ["cereal", "cookies", "pasta", "chips", "soup", "flour", "sugar"]
};
let chosenGroceryList = [];
let choices;
let randomChoice;
let inventory = [];
let meat = (251, 195, 188);
let dairy = (249, 199, 132);
let dryGoods = (255, 246, 204);
let freezer = (226, 234, 252);
let produce = (221, 229, 182);

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
    if (keyIsDown(87) && this.y > 75 + this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.y -= 5;
    }
    //a
    if (keyIsDown(65) && this.x > this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.x -= 5;
    }
    //s
    if (keyIsDown(83) && this.y < height-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.y += 5;
    }
    //d
    if (keyIsDown(68) && this.x < width-this.radius/2-75 && !keyIsDown(32) && !keyIsDown(70)){
      this.x += 5;
    }
    if (keyIsDown(32)){
      rectMode(CENTER);
      rect(width/2, height/2, 400, 700);
      wordsOnList();
    }
    if (keyIsDown(70)){
      viewCart();
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomGroceryList();
}

let person = new Player(200, 200, 25*2);

function draw() {
  background(220);
  shelving();
  person.display();
  person.move();
}

//randomizes what is on your grocery list
function randomGroceryList(){
  let randomProduce = random(departments.produce);
  let randomFreezer = random(departments.freezer);
  let randomMeat = random(departments.meat);
  let randomDairy = random(departments.dairy);
  let randomDryGood = random(departments.dryGoods);
  chosenGroceryList.push(randomProduce);
  chosenGroceryList.push(randomFreezer);
  chosenGroceryList.push(randomMeat);
  chosenGroceryList.push(randomDairy);
  chosenGroceryList.push(randomDryGood);
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
  //pink-red shelves = meat
  fill(251, 195, 188);
  rect(0, height/2, 100, 100);
  rect(0, height/2-100, 100, 100);
  rect(0, height/2-200, 100, 100);
  rect(0, height/2+100, 100, 100);
  rect(0, height/2+200, 100, 100);
  //blue shelves = freezer
  fill(226, 234, 252);
  rect(0, 0, width/5, 75);
  rect(width/5, 0, width/5, 75);
  rect(width/5*2, 0, width/5, 75);
  rect(width/5*3, 0, width/5, 75);
  rect(width/5*4, 0, width/5, 75);
  //orange shelves = dairy
  fill(249, 199, 132);
  rect(width-75, 0, 75, height);
  //yellow shelves = dry goods
  fill(255, 246, 204);
  rect(300, 225, width-600, 100);
  rect(300, 450, width-600, 100);
  rect(300, 675, width-900, 100);
  //green shelves = produce
  fill(221, 229, 182);
  rect(width-600, height-75, 100, 100);
  rect(width-500, height-75, 100, 100);
  rect(width-400, height-75, 100, 100);
  rect(width-300, height-75, 100, 100);
  rect(width-200, height-75, 200, 100);
  rect(width-700, height-75, 100, 100);
  rect(width-600, 675, 100, 100);
  rect(width-300, 675, 100, 100);
  rect(width-400, 675, 100, 100);
  rect(width-500, 675, 100, 100);
}

function viewCart(){
  rectMode(CENTER);
  rect(width/2, height/2, 1000, 600);
}