// Grocery Store Game

let gameState = "shopping";
let x = 200;
let y = 200;
let radius = 50;
let groceryListOptions = ['apples', 'bananas', 'oranges', 'cucumbers', 'potatoes', 'tomatoes', 'onions', 'bell peppers', 'lettuce', 'carrots', 'frozen pizza', 'ice cream', 'ground beef', 'sausages', 'fish', 'bacon', 'butter', 'cheese', 'eggs', 'milk', 'yogurt', 'cereal', 'cookies', 'pasta', 'chips', 'soup', 'flour', 'sugar', 'pizza pops', 'frozen veggies', 'frozen fruit', 'ground pork'];
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
    if (keyIsDown(87) && this.y > 100 + this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.y -= 5;
    }
    //a
    if (keyIsDown(65) && this.x > 100 + this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.x -= 5;
    }
    //s
    if (keyIsDown(83) && this.y < height-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.y += 5;
    }
    //d
    if (keyIsDown(68) && this.x < width-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
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
  let produceShelf = new Shelves(width-600, height-75, 600, 100, produce);
  produceShelf.display();
  randomGroceryList();
}

let person = new Player(200, 200, 25*2);

class Shelves{
  constructor(x, y, rectWidth, rectHeight, department){
    this.x = x;
    this.y = y;
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.department = department;
  }
  
  display(){
    fill(this.department);
    rect(this.x, this.y, this.rectWidth, this.rectHeight);
  }
}

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
  rect(0, 0, 100, 500);
  //blue shelves = freezer
  fill(226, 234, 252);
  rect(0, 0, width, 75);
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
  // rect(width-600, height-75, 600, 100);
  rect(width-500, 675, 300, 100);
  rect(width-75, 675, 75, height);
}

function viewCart(){
  rectMode(CENTER);
  rect(width/2, height/2, 1000, 600);
}