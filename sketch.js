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

//PRODUCE VARIABLES
let hitOrange = false;
let hitApple = false;
let hitBanana = false;
let hitPotato = false;
let hitOnion = false;
let hitPepper = false;
let hitLettuce = false;
let hitTomato = false;
let hitCarrot = false;

//MEAT VARIABLES
let hitGroundBeef = false;
let hitSausages = false;
let hitFish = false;
let hitBacon = false;
let hitShrimp = false;

//FROZEN VARIABLES
let hitFrozenPizza = false;
let hitIceCream = false;
let hitPizzaPops = false;
let hitFrozenVeggies = false;
let hitFrozenFruit = false;

//DRY GOODS VARIABLES
let hitCereal = false;
let hitCookies = false;
let hitPasta = false;
let hitChips = false;
let hitSoup = false;
let hitFlour = false;
let hitSugar = false;
let hitCrackers = false;

//DAIRY VARIABLES
let hitButter = false;
let hitCheese = false;
let hitEggs = false;
let hitMilk = false;
let hitYogurt = false;

let departments = {
  produce: ["apples", "bananas", "oranges", "potatoes", "tomatoes", "onions", "bell peppers", "lettuce", "carrots"],
  freezer: ["frozen pizza", "ice cream", "pizza pops", "frozen veggies", "frozen fruit"],
  meat: ["ground beef", "sausages", "fish", "bacon", "shrimp"],
  dairy: ["butter", "cheese", "eggs", "milk", "yogurt"],
  dryGoods: ["cereal", "cookies", "pasta", "chips", "soup", "flour", "sugar", "crackers"]
};
let chosenGroceryList = [];
let choices;
let randomChoice;
let inventory = [];
let items;
let itemHit = [];
let interact = false;
let hitting = false;

class Player{
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 5;
  }
  
  move(){
    //w
    if (keyIsDown(87) && this.y > 0 + this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
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
    if (keyIsDown(68) && this.x < width-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      this.x += this.speed;
    }
    if (keyIsDown(32) && !keyIsDown(70)){
      rectMode(CENTER);
      rect(width/2, height/2, 400, 700);
      wordsOnList();
    }
    if (keyIsDown(70) && !keyIsDown(32)){
      viewCart();
    }
  }

  collision(){
    rectMode(CORNER);
    circle(this.x, this.y, 50);

    //PRODUCE COLLISION
    hitOrange = collideRectCircle(width-500, 650, 100, 100, this.x, this.y, this.radius);
    hitApple = collideRectCircle(width-400, 650, 100, 100, this.x, this.y, this.radius);
    hitBanana = collideRectCircle(width-300, 650, 100, 100, this.x, this.y, this.radius);
    hitPotato = collideRectCircle(width-700, height-100, 100, 100, this.x, this.y, this.radius);
    hitOnion = collideRectCircle(width-600, height-100, 100, 100, this.x, this.y, this.radius);
    hitPepper = collideRectCircle(width-500, height-100, 100, 100, this.x, this.y, this.radius);
    hitLettuce = collideRectCircle(width-400, height-100, 100, 100, this.x, this.y, this.radius);
    hitTomato = collideRectCircle(width-300, height-100, 100, 100, this.x, this.y, this.radius);
    hitCarrot = collideRectCircle(width-200, height-100, 100, 100, this.x, this.y, this.radius);

    //MEAT COLLISION
    hitShrimp = collideRectCircle(0, height/2-200, 100, 100, this.x, this.y, this.radius);
    hitBacon = collideRectCircle(0, height/2-100, 100, 100, this.x, this.y, this.radius);
    hitGroundBeef = collideRectCircle(0, height/2, 100, 100, this.x, this.y, this.radius);
    hitSausages = collideRectCircle(0, height/2+100, 100, 100, this.x, this.y, this.radius);
    hitFish = collideRectCircle(0, height/2+200, 100, 100, this.x, this.y, this.radius);

    //FROZEN COLLISION
    hitFrozenPizza = collideRectCircle(0, 0, width/6, 100, this.x, this.y, this.radius);
    hitIceCream = collideRectCircle(width/6, 0, width/6, 100, this.x, this.y, this.radius);
    hitPizzaPops = collideRectCircle(width/6*2, 0, width/6, 100, this.x, this.y, this.radius);
    hitFrozenVeggies = collideRectCircle(width/6*3, 0, width/6, 100, this.x, this.y, this.radius);
    hitFrozenFruit = collideRectCircle(width/6*4, 0, width/6, 100, this.x, this.y, this.radius);

    //DRY GOODS COLLISION
    hitCereal = collideRectCircle(300, 225, 450, 100, this.x, this.y, this.radius);
    hitCookies = collideRectCircle(750, 225, 450, 100, this.x, this.y, this.radius);
    hitPasta = collideRectCircle(1200, 225, 450, 100, this.x, this.y, this.radius);
    hitChips = collideRectCircle(300, 450, 450, 100, this.x, this.y, this.radius);
    hitSoup = collideRectCircle(750, 450, 450, 100, this.x, this.y, this.radius);
    hitFlour = collideRectCircle(1200, 450, 450, 100, this.x, this.y, this.radius);
    hitSugar = collideRectCircle(300, 650, 500, 100, this.x, this.y, this.radius);
    hitCrackers = collideRectCircle(800, 650, 500, 100, this.x, this.y, this.radius);

    //DAIRY COLLISION
    hitButter = collideRectCircle(width-100, 0, 100, 754/5, this.x, this.y, this.radius);
    hitCheese = collideRectCircle(width-100, 754/5, 100, 754/5, this.x, this.y, this.radius);
    hitEggs = collideRectCircle(width-100, 754/5*2, 100, 754/5, this.x, this.y, this.radius);
    hitMilk = collideRectCircle(width-100, 754/5*3, 100, 754/5, this.x, this.y, this.radius);
    hitYogurt = collideRectCircle(width-100, 754/5*4, 100, 754/5, this.x, this.y, this.radius);

    fill(0, 0, 0, 0);
    textSize(30);

    if (hitOrange === true && !hitApple){
      itemHit.push("oranges");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-500, 650, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitApple === true && !hitBanana && !hitOrange){
      itemHit.push("apples");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-400, 650, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitBanana === true && !hitApple){
      itemHit.push("bananas");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-300, 650, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitPotato === true && !hitOnion){
      itemHit.push("potatoes");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-700, height-100, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitOnion === true && !hitPotato && !hitPepper){
      itemHit.push("onions");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-600, height-100, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitPepper === true && !hitOnion && !hitLettuce){
      itemHit.push("bell peppers");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-500, height-100, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitLettuce === true && !hitPepper && !hitTomato){
      itemHit.push("lettuce");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-400, height-100, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitTomato === true && !hitLettuce && !hitCarrot){
      itemHit.push("tomatoes");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-300, height-100, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitCarrot === true && !hitTomato){
      itemHit.push("carrots");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-200, height-100, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitShrimp === true && !hitBacon){
      itemHit.push("shrimp");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(0, height/2-200, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitBacon === true && !hitShrimp && !hitGroundBeef){
      itemHit.push("bacon");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(0, height/2-100, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitGroundBeef === true && !hitBacon && !hitSausages){
      itemHit.push("ground beef");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(0, height/2, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitSausages === true && !hitGroundBeef && !hitFish){
      itemHit.push("sausages");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(0, height/2+100, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitFish === true && !hitSausages){
      itemHit.push("fish");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(0, height/2+200, 100, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitFrozenPizza === true && !hitIceCream){
      itemHit.push("frozen pizza");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(0, 0, width/6, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitIceCream === true && !hitFrozenPizza && !hitPizzaPops){
      itemHit.push("ice cream");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width/6, 0, width/6, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitPizzaPops === true && !hitIceCream && !hitFrozenVeggies){
      itemHit.push("pizza pops");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width/6*2, 0, width/6, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitFrozenVeggies === true && !hitPizzaPops && !hitFrozenFruit){
      itemHit.push("frozen veggies");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width/6*3, 0, width/6, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitFrozenFruit === true && !hitFrozenVeggies){
      itemHit.push("frozen fruit");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width/6*4, 0, width/6, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitCereal === true && !hitCookies){
      itemHit.push("cereal");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(300, 225, 450, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitCookies === true && !hitCereal && !hitPasta){
      itemHit.push("cookies");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(750, 225, 450, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitPasta === true && !hitCookies && !hitChips){
      itemHit.push("pasta");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(1200, 225, 450, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitChips === true && !hitPasta && !hitSoup){
      itemHit.push("chips");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(300, 450, 450, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitSoup === true && !hitChips && !hitFlour){
      itemHit.push("soup");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(750, 450, 450, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitFlour === true && !hitSoup && !hitSugar){
      itemHit.push("flour");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(1200, 450, 450, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitSugar === true && !hitFlour && !hitCrackers){
      itemHit.push("sugar");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(300, 650, 500, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitCrackers === true && !hitSugar){
      itemHit.push("crackers");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(800, 650, 500, 100);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitButter === true && !hitCheese){
      itemHit.push("butter");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-100, 0, 100, 754/5);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitCheese === true && !hitButter && !hitEggs){
      itemHit.push("cheese");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-100, 754/5, 100, 754/5);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitEggs === true && !hitCheese && !hitMilk){
      itemHit.push("eggs");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-100, 754/5*2, 100, 754/5);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitMilk === true && !hitEggs && !hitYogurt){
      itemHit.push("milk");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-100, 754/5*3, 100, 754/5);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    if (hitYogurt === true && !hitMilk){
      itemHit.push("yogurt");
      stroke("yellow");
      fill(0, 0, 0, 0);
      rect(width-100, 754/5*4, 100, 754/5);
      interactionUI();
      stroke(0);
      return itemHit;
    }
    else{
      itemHit = [];
      interact = false;
      hitting = false;
    }
  }
}

function interactionUI(){
  hitting = true;
  fill(0);
  textSize(30);
  text("press 'e' for "+ itemHit[0], person.x, person.y);
}

//MAKE WORK FOR ALL ITEMS
function keyPressed(){
  if (key === 'e' && hitting === true && itemHit[0] === chosenGroceryList[0] && inventory[0] !== itemHit[0]){
    inventory.push(itemHit[0]);
  }
}

function setup() {
  createCanvas(1912, 954);
  randomGroceryList();
}

let person = new Player(25, 875, 50);

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
  rect(0, 0, width/6, 100);
  rect(width/6, 0, width/6, 100);
  rect(width/6*2, 0, width/6, 100);
  rect(width/6*3, 0, width/6, 100);
  rect(width/6*4, 0, width/6, 100);
  //orange shelves = dairy
  fill(249, 199, 132);
  rect(width-100, 0, 100, 754/5);
  rect(width-100, 754/5, 100, 754/5);
  rect(width-100, 754/5*2, 100, 754/5);
  rect(width-100, 754/5*3, 100, 754/5);
  rect(width-100, 754/5*4, 100, 754/5);
  //yellow shelves = dry goods
  fill(255, 246, 204);
  rect(300, 225, 450, 100);
  rect(750, 225, 450, 100);
  rect(1200, 225, 450, 100);
  rect(300, 450, 450, 100);
  rect(750, 450, 450, 100);
  rect(1200, 450, 450, 100);
  rect(300, 650, 500, 100);
  rect(800, 650, 500, 100);
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