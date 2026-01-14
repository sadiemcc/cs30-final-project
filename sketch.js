// Grocery Store Game

//TO DO
//2. Simplify code/ tidy
//3. More shelving images
//4. Make a game ending
//5. Add pricing and randoize coins around store

function preload(){
  floorImg = loadImage("Drawings/floor.jpg");
  walkTowards = loadImage("walkingAnimations/walkTowards.gif");
  walkBack = loadImage("walkingAnimations/walkBack.gif");
  walkLeft = loadImage("walkingAnimations/walkLeft.gif");
  walkRight = loadImage("walkingAnimations/walkRight.gif");
  idle = loadImage("walkingAnimations/idleAnimation.gif");
  basket = loadImage("Drawings/shoppingbasket.png");

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


  pickedUp = loadSound("Audios/pickedUp.wav");
  gameMusic = loadSound("Audios/musics/titleScreen/Music_Loop_3_Full.wav");
  walking = loadSound("Audios/walkingslowed.wav");
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
let gameState = "titleScreen";
let movementState;


class Player{
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 5;
    this.newX = x;
    this.newY = y;
  }
  move(){
    fill(0, 0, 0, 0);
    noStroke();
    imageMode(CENTER);
    
    //w
    if (keyIsDown(87) && this.y > 0 + this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      if (!hitting){
        this.newY = this.y;
        this.newX = this.x;
        this.y -= this.speed;
        movementState = true;
      }
      else if (hitting){
        this.y = this.newY;
        this.x = this.newX;
      }
      image(walkBack, this.x, this.y, 75, 100);
    }
    //a
    if (keyIsDown(65) && this.x > this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      if (!hitting){
        this.newX = this.x;
        this.newY = this.y;
        this.x -= this.speed;
        movementState = true;
      }
      else if (hitting){
        this.x = this.newX;
        this.y = this.newY;
      }
      image(walkLeft, this.x, this.y);
    }
    //s
    if (keyIsDown(83) && this.y < height-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      if (!hitting){
        this.newY = this.y;
        this.newX = this.x;
        this.y += this.speed;
        movementState = true;
      }
      else if (hitting){
        this.y = this.newY;
        this.x = this.newX;
      }
      image(walkTowards, this.x, this.y, 75, 100);
    }
    //d
    if (keyIsDown(68) && this.x < width-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      if (!hitting){
        this.newX = this.x;
        this.newY = this.y;
        this.x += this.speed;
        movementState = true;
      }
      else if (hitting){
        this.x = this.newX;
        this.y = this.newY;
      }
      image(walkRight, this.x, this.y);
    }
    if (keyIsDown(32) && !keyIsDown(70)){
      image(idle, this.x, this.y);
      stroke(0);
      fill(255);
      rectMode(CENTER);
      rect(width/2, height/2, 400, 700);
      noStroke();
      wordsOnList();
    }
    if (keyIsDown(70) && !keyIsDown(32)){
      image(idle, this.x, this.y);
      viewCart();
    }
    else if (!keyIsDown(87) && !keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68)){
      image(idle, this.x, this.y);
      movementState = false;
    }
    imageMode(CORNER);
    
  }

  collision(){
    rectMode(CORNER);
    fill(0,0,0,0);
    noStroke();
    circle(this.x, this.y, 50);

    //PRODUCE COLLISION
    hitOrange = collideRectCircle(width-500, 650, 100, 100, this.x, this.y, this.radius);
    hitApple = collideRectCircle(width-400, 650, 100, 100, this.x, this.y, this.radius);
    hitBanana = collideRectCircle(width-300, 650, 100, 100, this.x, this.y, this.radius);

    let hit3Fruits = collideRectCircle(width-500, 650, 300, 100, this.x, this.y, this.radius);

    hitPotato = collideRectCircle(width-700, height-100, 100, 100, this.x, this.y, this.radius);
    hitOnion = collideRectCircle(width-600, height-100, 100, 100, this.x, this.y, this.radius);
    hitPepper = collideRectCircle(width-500, height-100, 100, 100, this.x, this.y, this.radius);
    hitLettuce = collideRectCircle(width-400, height-100, 100, 100, this.x, this.y, this.radius);
    hitTomato = collideRectCircle(width-300, height-100, 100, 100, this.x, this.y, this.radius);
    hitCarrot = collideRectCircle(width-200, height-100, 100, 100, this.x, this.y, this.radius);

    let hitProduce = collideRectCircle(width-700, height-100, 700, 100, this.x, this.y, this.radius);

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

    if (hit3Fruits === true){
      rect(width-500, 650, 300, 100);
      hitting = true;
    }
    if (hitProduce === true){
      hitting = true;
      stroke("yellow");
      rect(width-700, height-100, 700, 100);
    }

    if (hitOrange === true && !hitApple){
      hitting = true;
      itemHit.push("oranges");
      rect(width-500, 650, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitApple === true && !hitBanana && !hitOrange){
      hitting = true;
      itemHit.push("apples");
      rect(width-400, 650, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitBanana === true && !hitApple){
      hitting = true;
      itemHit.push("bananas");
      rect(width-300, 650, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitPotato === true && !hitOnion){
      hitting = true;
      itemHit.push("potatoes");
      rect(width-700, height-100, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitOnion === true && !hitPotato && !hitPepper){
      hitting = true;
      itemHit.push("onions");
      rect(width-600, height-100, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitPepper === true && !hitOnion && !hitLettuce){
      hitting = true;
      itemHit.push("bell peppers");
      rect(width-500, height-100, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitLettuce === true && !hitPepper && !hitTomato){
      hitting = true;
      itemHit.push("lettuce");
      rect(width-400, height-100, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitTomato === true && !hitLettuce && !hitCarrot){
      hitting = true;
      itemHit.push("tomatoes");
      rect(width-300, height-100, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitCarrot === true && !hitTomato){
      hitting = true;
      itemHit.push("carrots");
      rect(width-200, height-100, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitShrimp === true && !hitBacon){
      hitting = true;
      itemHit.push("shrimp");
      rect(0, height/2-200, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitBacon === true && !hitShrimp && !hitGroundBeef){
      hitting = true;
      itemHit.push("bacon");
      rect(0, height/2-100, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitGroundBeef === true && !hitBacon && !hitSausages){
      hitting = true;
      itemHit.push("ground beef");
      rect(0, height/2, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitSausages === true && !hitGroundBeef && !hitFish){
      hitting = true;
      itemHit.push("sausages");
      rect(0, height/2+100, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitFish === true && !hitSausages){
      hitting = true;
      itemHit.push("fish");
      rect(0, height/2+200, 100, 100);
      interactionUI();
      return itemHit;
    }
    if (hitFrozenPizza === true && !hitIceCream){
      hitting = true;
      itemHit.push("frozen pizza");
      rect(0, 0, width/6, 100);
      interactionUI();
      return itemHit;
    }
    if (hitIceCream === true && !hitFrozenPizza && !hitPizzaPops){
      hitting = true;
      itemHit.push("ice cream");
      rect(width/6, 0, width/6, 100);
      interactionUI();
      return itemHit;
    }
    if (hitPizzaPops === true && !hitIceCream && !hitFrozenVeggies){
      hitting = true;
      itemHit.push("pizza pops");
      rect(width/6*2, 0, width/6, 100);
      interactionUI();
      return itemHit;
    }
    if (hitFrozenVeggies === true && !hitPizzaPops && !hitFrozenFruit){
      hitting = true;
      itemHit.push("frozen veggies");
      rect(width/6*3, 0, width/6, 100);
      interactionUI();
      return itemHit;
    }
    if (hitFrozenFruit === true && !hitFrozenVeggies){
      hitting = true;
      itemHit.push("frozen fruit");
      rect(width/6*4, 0, width/6, 100);
      interactionUI();
      return itemHit;
    }
    if (hitCereal === true && !hitCookies){
      hitting = true;
      itemHit.push("cereal");
      rect(300, 225, 450, 100);
      interactionUI();
      return itemHit;
    }
    if (hitCookies === true && !hitCereal && !hitPasta){
      hitting = true;
      itemHit.push("cookies");
      rect(750, 225, 450, 100);
      interactionUI();
      return itemHit;
    }
    if (hitPasta === true && !hitCookies && !hitChips){
      hitting = true;
      itemHit.push("pasta");
      rect(1200, 225, 450, 100);
      interactionUI();
      return itemHit;
    }
    if (hitChips === true && !hitPasta && !hitSoup){
      hitting = true;
      itemHit.push("chips");
      rect(300, 450, 450, 100);
      interactionUI();
      return itemHit;
    }
    if (hitSoup === true && !hitChips && !hitFlour){
      hitting = true;
      itemHit.push("soup");
      rect(750, 450, 450, 100);
      interactionUI();
      return itemHit;
    }
    if (hitFlour === true && !hitSoup && !hitSugar){
      hitting = true;
      itemHit.push("flour");
      rect(1200, 450, 450, 100);
      interactionUI();
      return itemHit;
    }
    if (hitSugar === true && !hitFlour && !hitCrackers){
      hitting = true;
      itemHit.push("sugar");
      rect(300, 650, 500, 100);
      interactionUI();
      return itemHit;
    }
    if (hitCrackers === true && !hitSugar){
      hitting = true;
      itemHit.push("crackers");
      rect(800, 650, 500, 100);
      interactionUI();
      return itemHit;
    }
    if (hitButter === true && !hitCheese){
      hitting = true;
      itemHit.push("butter");
      rect(width-100, 0, 100, 754/5);
      interactionUI();
      return itemHit;
    }
    if (hitCheese === true && !hitButter && !hitEggs){
      hitting = true;
      itemHit.push("cheese");
      rect(width-100, 754/5, 100, 754/5);
      interactionUI();
      return itemHit;
    }
    if (hitEggs === true && !hitCheese && !hitMilk){
      hitting = true;
      itemHit.push("eggs");
      rect(width-100, 754/5*2, 100, 754/5);
      interactionUI();
      return itemHit;
    }
    if (hitMilk === true && !hitEggs && !hitYogurt){
      hitting = true;
      itemHit.push("milk");
      rect(width-100, 754/5*3, 100, 754/5);
      interactionUI();
      return itemHit;
    }
    if (hitYogurt === true && !hitMilk){
      hitting = true;
      itemHit.push("yogurt");
      rect(width-100, 754/5*4, 100, 754/5);
      interactionUI();
      return itemHit;
    }
    else{
      itemHit = [];
      interact = false;
      hitting = false;
    }
    stroke(0);
  }
}

function interactionUI(){
  fill(0);
  textSize(30);
  noStroke();
  text("press 'e' for "+ itemHit[0], person.x, person.y);
}

function keyPressed(){
  if (key === 'e' && hitting === true){
    for (let item = 0; item < chosenGroceryList.length; item++){
      if (itemHit[0] === chosenGroceryList[item] && inventory[item] !== itemHit[0]){
        inventory.push(itemHit[0]);
        pickedUp.play();
      }
    }
  }
  if (key === 'i' && gameState === "titleScreen"){
    gameState = "instructions";
    fill(255);
    rectMode(CENTER);
    rect(width/2, height/2, width-400, height-100);
  }
  else if (key === 'i' && gameState === "instructions"){
    gameState = "titleScreen";
  }
}

function setup() {
  getAudioContext().suspend();
  outputVolume(0.3);
  gameMusic.loop();
  gameMusic.play(); 
  createCanvas(1912, 954);
  randomGroceryList();
}

let person = new Player(25, 875, 50);

function draw() {
  console.log(movementState);
  if (movementState === true && !walking.isPlaying()){
    walking.play();
  }
  if (gameState === "game"){
    image(floorImg, 0, 0,width/4, height/2);
    image(floorImg, width/4, 0, width/4, height/2);
    image(floorImg, width/2, 0, width/4, height/2);
    image(floorImg, width/2+width/4, 0, width/4, height/2);
    image(floorImg, 0, height/2,width/4, height/2);
    image(floorImg, width/4, height/2, width/4, height/2);
    image(floorImg, width/2, height/2, width/4, height/2);
    image(floorImg, width/2+width/4, height/2, width/4, height/2);
    shelving();
    person.move();
    person.collision();
  }
  if (gameState === "titleScreen"){
    title();
  }
}

function mouseMoved(){
  if (gameState === "titleScreen"){
    userStartAudio();
  }
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
  fill(255);
  textAlign(CENTER);
  textSize(45);
  let listHeight = 200;
  let division = 100;
  fill(0);
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
  fill(255);
  rectMode(CENTER);
  rect(width/2, height/2, 1000, 600);
  image(basket, width/2, height/2);
}

function title(){
  background("pink");
  fill(0);
  textAlign(CENTER);
  textSize(70);
  text("Untitled Shopping Game", width/2, height/3);
  fill(255);
  rectMode(CENTER);
  rect(width/2, height/2+height/4, 400, 200);
  fill(0);
  textSize(40);
  text("PLAY", width/2, height/2+height/4);
  textSize(25);
  text("Press 'i' for instructions", width/2, height/2+100);
}

function mousePressed(){
  if (gameState === "titleScreen" && mouseX > width/2-200 && mouseX < width/2+200 && mouseY < height/2+height/4+100 && mouseY > height/2+height/4-100){
    gameState = "game";
  }
}

function ending(){
  // some sort of ending screen
}