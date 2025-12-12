// Grocery Store Game

//ADD COLLISION TO STOP MOVING WHEN COLLIDING
//edit collision location (not in player class it runs constantly)
//make individual images of the items to show in cart
//make cart image
//make text bubble images (for interaction)

function preload(){
  prodBin = loadImage("Drawings/produce-bin.png");
  prodApple = loadImage("Drawings/produce-apples.png");
  prodBanana = loadImage("Drawings/produce-bananas.png");
  prodOranges = loadImage("Drawings/produce-oranges.png");
  prodPotatoes = loadImage("Drawings/produce-potatoes.png");
  prodTomatoes = loadImage("Drawings/produce-tomatoes.png");
  prodOnions = loadImage("Drawings/produce-onions.png");
  prodBellPeppers = loadImage("Drawings/produce-bellpeppers.png");
  prodLettuce = loadImage("Drawings/produce-lettuce.png");
  prodCarrots = loadImage("Drawings/produce-carrots.png");

  meatFish = loadImage("Drawings/meat-fish.png");
  meatGroundBeef = loadImage("Drawings/meat-groundbeef.png");
}

let hitOrange = false;
let hitApple = false;
let hitBanana = false;
let hitPotato = false;
let hitOnion = false;
let hitPepper = false;
let hitLettuce = false;
let hitTomato = false;
let hitCarrot = false;
let x = 200;
let y = 200;
let radius = 50;
let departments = {
  produce: ["apples", "bananas", "oranges", "potatoes", "tomatoes", "onions", "bell peppers", "lettuce", "carrots"],
  freezer: ["frozen pizza", "ice cream", "pizza pops", "frozen veggies", "frozen fruit"],
  meat: ["ground beef", "sausages", "fish", "bacon", "ground pork"],
  dairy: ["butter", "cheese", "eggs", "milk", "yogurt"],
  dryGoods: ["cereal", "cookies", "pasta", "chips", "soup", "flour", "sugar"]
};
let theCart = [];
let chosenGroceryList = [];
let choices;
let randomChoice;
let inventory = [];
let meat = (251, 195, 188);
let dairy = (249, 199, 132);
let dryGoods = (255, 246, 204);
let freezer = (226, 234, 252);
let produce = (221, 229, 182);
let items;
let displayTime = 5000;

class Player{
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 5;
  }
  
  move(){
    //w
    if (keyIsDown(87) && this.y > 75 + this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.y -= this.speed;
    }
    //a
    if (keyIsDown(65) && this.x > this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.x -= this.speed;
    }
    //s
    if (keyIsDown(83) && this.y < height-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.y += this.speed;
    }
    //d
    if (keyIsDown(68) && this.x < width-this.radius/2-75 && !keyIsDown(32) && !keyIsDown(70)){
      this.x += this.speed;
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

  collision(){
    rectMode(CORNER);
    circle(this.x, this.y, 50);
    hitOrange = collideRectCircle(width-500, 650, 100, 100, this.x, this.y, 50);
    hitApple = collideRectCircle(width-400, 650, 100, 100, this.x, this.y, 50);
    hitBanana = collideRectCircle(width-300, 650, 100, 100, this.x, this.y, 50);
    hitPotato = collideRectCircle(width-700, height-100, 100, 100, this.x, this.y, 50);
    hitOnion = collideRectCircle(width-600, height-100, 100, 100, this.x, this.y, 50);
    hitPepper = collideRectCircle(width-500, height-100, 100, 100, this.x, this.y, 50);
    hitLettuce = collideRectCircle(width-400, height-100, 100, 100, this.x, this.y, 50);
    hitTomato = collideRectCircle(width-300, height-100, 100, 100, this.x, this.y, 50);
    hitCarrot = collideRectCircle(width-200, height-100, 100, 100, this.x, this.y, 50);

    fill(0, 0, 0, 0);
    textSize(30);

    if (hitOrange === true && !hitApple){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-500, 650, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for oranges", this.x, this.y);
      fill(255);
      for (items of chosenGroceryList){
        if (items === "oranges" && keyCode === 69){
          notifShow();
          // theCart.push(items);
          // return items;
        }
      }
    }
    if (hitApple === true && !hitBanana && !hitOrange){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-400, 650, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for apples", this.x, this.y);
      fill(255);
      if (chosenGroceryList[0] === "apples" && keyCode === 69){
        notifShow();
        // theCart.push("apples");
      }
    }
    if (hitBanana === true && !hitApple){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-300, 650, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for bananas", this.x, this.y);
      fill(255);
      for (items of chosenGroceryList){
        if (items === "bananas" && keyCode === 69){
          notifShow();
          // theCart.push(items);
          // return items;
        }
      }
      stroke(0);
    }
    if (hitPotato === true && !hitOnion){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-700, height-100, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for potatoes", this.x, this.y);
      fill(255);
      for (items of chosenGroceryList){
        if (items === "potatoes" && keyCode === 69){
          notifShow();
          // theCart.push(items);
          // return items;
        }
      }
    }
    if (hitOnion === true && !hitPotato && !hitPepper){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-600, height-100, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for onions", this.x, this.y);
      fill(255);
      if (chosenGroceryList[0] === "onions" && keyCode === 69){
        notifShow();
        // theCart.push(items);
        // return items;
      }
    }
    if (hitPepper === true && !hitOnion && !hitLettuce){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-500, height-100, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for bell peppers", this.x, this.y);
      fill(255);
      for (items of chosenGroceryList){
        if (items === "bell peppers" && keyCode === 69){
          notifShow();
          // theCart.push(items);
          // return items;
        }
      }
      stroke(0);
    }
    if (hitLettuce === true && !hitPepper && !hitTomato){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-400, height-100, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for lettuce", this.x, this.y);
      fill(255);
      for (items of chosenGroceryList){
        if (items === "lettuce" && keyCode === 69){
          notifShow();
          // theCart.push(items);
          // return items;
        }
      }
    }
    if (hitTomato === true && !hitLettuce && !hitCarrot){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-300, height-100, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for tomatoes", this.x, this.y);
      fill(255);
      if (chosenGroceryList[0] === "tomatoes" && keyCode === 69){
        notifShow();
        // theCart.push(items);
        // return items;
      }
    }
    if (hitCarrot === true && !hitTomato){
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-200, height-100, 100, 100);
      textSize(30);
      fill(0);
      text("press 'e' for carrots", this.x, this.y);
      fill(255);
      for (items of chosenGroceryList){
        if (items === "carrots" && keyCode === 69){
          notifShow();
          // theCart.push(items);
          // return items;
        }
      }
      stroke(0);
    }
    else{
      stroke(0);
      this.speed = 5;
    }
  }
}

function notifShow(){
  theCart.push(items);
  stroke(0);
  rectMode(CENTER);
  rect(width/2, height/4+height/2, 500, 200);
  textAlign(CENTER);
  fill(0);
  text(theCart[0] + " were added to the cart", width/2, height/4+height/2);
  return items;
}

class Shelves{
  constructor(x, y, rectWidth, rectHeight){
    this.x = x;
    this.y = y;
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
  }

  display(){
    rect(this.x, this.y, this.rectWidth, this.rectHeight);
  }
}

function setup() {
  createCanvas(1912, 954);
  randomGroceryList();
  // let middleProduce = new Shelves(windowWidth-515, 635, 330, 130);
  // middleProduce.display();
}

let person = new Player(200, 200, 25*2);

function draw() {
  background(155);
  shelving();
  person.move();
  person.collision();
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
  rect(300, 650, width-900, 100);
  //green shelves = produce
  fill(221, 229, 182);
  image(prodPotatoes, width-700, height-100);
  image(prodOnions, width-600, height-100);
  image(prodBellPeppers, width-500, height-100);
  image(prodLettuce, width-400, height-100);
  image(prodTomatoes, width-300, height-100);
  image(prodCarrots, width-200, height-100);
  image(prodBin, width-100, height-100);
  image(prodBanana, width-300, 650);
  image(prodApple, width-400, 650);
  image(prodOranges, width-500, 650);
}

function viewCart(){
  rectMode(CENTER);
  rect(width/2, height/2, 1000, 600);
}