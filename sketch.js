// Sadie Kuzyk (McConnell)
// CS30 Capstone Project
// January 19th, 2026

//preloading images, sounds, and font
function preload(){
  //misc images
  floorImg = loadImage("Drawings/floor.jpg");
  walkTowards = loadImage("walkingAnimations/walkTowards.gif");
  walkBack = loadImage("walkingAnimations/walkBack.gif");
  walkLeft = loadImage("walkingAnimations/walkLeft.gif");
  walkRight = loadImage("walkingAnimations/walkRight.gif");
  idle = loadImage("walkingAnimations/idleAnimation.gif");
  basket = loadImage("Drawings/shoppingbasket.png");

  //produce images
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

  //frozen items images
  frozenPizza = loadImage("Drawings/frozen-pizza.png");
  frozenIceCream = loadImage("Drawings/frozen-icecream.png");
  frozenPizzaPops = loadImage("Drawings/frozen-pizzapops.png");
  frozenVeggies = loadImage("Drawings/frozen-veggies.png");
  frozenFruit = loadImage("Drawings/frozen-fruit.png");

  //dry goods images
  dryCereal = loadImage("Drawings/dry-cereal.png");
  dryCookies = loadImage("Drawings/dry-cookies.png");
  dryPasta = loadImage("Drawings/dry-pasta.png");
  dryChips = loadImage("Drawings/dry-chips.png");
  drySoup = loadImage("Drawings/dry-soup.png");
  dryFlour = loadImage("Drawings/dry-flour.png");
  drySugar = loadImage("Drawings/dry-sugar.png");
  dryCrackers = loadImage("Drawings/dry-crackers.png");

  //sounds
  pickedUp = loadSound("Audios/pickedUp.wav");
  gameMusic = loadSound("Audios/musics/titleScreen/Music_Loop_3_Full.wav");
  walking = loadSound("Audios/walkingslowed.wav");

  //font
  font = loadFont("Funzytoon.ttf");
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

//SHELVING VARIABLES
let hitFrozen = false;
let hitMeat = false;
let hitDairy = false;
let hitDry1 = false;
let hitDry2 = false;
let hitDry3 = false;
let hitProduce1 = false;
let hitProduce2 = false;

// departments so one item from each department is on the list
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
    
    //move forward
    if (keyIsDown(87) && this.y > 0 + this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      if (hitting){
        this.y = this.newY;
        this.x = this.newX;
      }
      else if (!hitting){
        this.newY = this.y;
        this.y -= this.speed;
        movementState = true;
      }
      image(walkBack, this.x, this.y, 75, 100);
    }
    //move left
    if (keyIsDown(65) && this.x > this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      if (hitting){
        this.x = this.newX;
        this.y = this.newY;
      }
      else if (!hitting){
        this.newX = this.x;
        this.x -= this.speed;
        movementState = true;
      }
      image(walkLeft, this.x, this.y);
    }
    //move down
    if (keyIsDown(83) && this.y < height-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      if (hitting){
        this.y = this.newY;
        this.x = this.newX;
      }
      else if (!hitting){
        this.newY = this.y;
        this.y += this.speed;
        movementState = true;
      }
      image(walkTowards, this.x, this.y, 75, 100);
    }
    //move right
    if (keyIsDown(68) && this.x < width-this.radius/2 && !keyIsDown(32) && !keyIsDown(70)){
      if (hitting){
        this.x = this.newX;
        this.y = this.newY;
      }
      else if (!hitting){
        this.newX = this.x;
        this.x += this.speed;
        movementState = true;
      }
      image(walkRight, this.x, this.y);
    }
    //open grocery list
    if (keyIsDown(32) && !keyIsDown(70)){
      image(idle, this.x, this.y);
      stroke(0);
      fill(255);
      rectMode(CENTER);
      rect(width/2, height/2, 400, 700);
      noStroke();
      wordsOnList();
    }
    //open basket view
    if (keyIsDown(70) && !keyIsDown(32)){
      image(idle, this.x, this.y);
      viewCart();
    }
    //idle animation detection
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
    hitOrange = collideRectCircle(width-500, 625, 100, 100, this.x, this.y, this.radius);
    hitApple = collideRectCircle(width-400, 625, 100, 100, this.x, this.y, this.radius);
    hitBanana = collideRectCircle(width-300, 625, 100, 100, this.x, this.y, this.radius);
    hitPotato = collideRectCircle(width-700, height-100, 115, 100, this.x, this.y, this.radius);
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
      hitting = true;
      itemHit.push("oranges");
      interactionUI();
      return itemHit;
    }
    if (hitApple === true && !hitBanana && !hitOrange){
      hitting = true;
      itemHit.push("apples");
      interactionUI();
      return itemHit;
    }
    if (hitBanana === true && !hitApple){
      hitting = true;
      itemHit.push("bananas");
      interactionUI();
      return itemHit;
    }
    if (hitPotato === true){
      hitting = true;
      itemHit.push("potatoes");
      interactionUI();
      return itemHit;
    }
    if (hitOnion === true && !hitPotato){
      hitting = true;
      itemHit.push("onions");
      interactionUI();
      return itemHit;
    }
    if (hitPepper === true && !hitOnion){
      hitting = true;
      itemHit.push("bell peppers");
      interactionUI();
      return itemHit;
    }
    if (hitLettuce === true && !hitPepper){
      hitting = true;
      itemHit.push("lettuce");
      interactionUI();
      return itemHit;
    }
    if (hitTomato === true && !hitLettuce){
      hitting = true;
      itemHit.push("tomatoes");
      interactionUI();
      return itemHit;
    }
    if (hitCarrot === true && !hitTomato){
      hitting = true;
      itemHit.push("carrots");
      interactionUI();
      return itemHit;
    }
    if (hitShrimp === true && !hitBacon){
      hitting = true;
      itemHit.push("shrimp");
      interactionUI();
      return itemHit;
    }
    if (hitBacon === true && !hitShrimp && !hitGroundBeef){
      hitting = true;
      itemHit.push("bacon");
      interactionUI();
      return itemHit;
    }
    if (hitGroundBeef === true && !hitBacon && !hitSausages){
      hitting = true;
      itemHit.push("ground beef");
      interactionUI();
      return itemHit;
    }
    if (hitSausages === true && !hitGroundBeef && !hitFish){
      hitting = true;
      itemHit.push("sausages");
      interactionUI();
      return itemHit;
    }
    if (hitFish === true && !hitSausages){
      hitting = true;
      itemHit.push("fish");
      interactionUI();
      return itemHit;
    }
    if (hitFrozenPizza === true && !hitIceCream){
      hitting = true;
      itemHit.push("frozen pizza");
      interactionUI();
      return itemHit;
    }
    if (hitIceCream === true && !hitFrozenPizza && !hitPizzaPops){
      hitting = true;
      itemHit.push("ice cream");
      interactionUI();
      return itemHit;
    }
    if (hitPizzaPops === true && !hitIceCream && !hitFrozenVeggies){
      hitting = true;
      itemHit.push("pizza pops");
      interactionUI();
      return itemHit;
    }
    if (hitFrozenVeggies === true && !hitPizzaPops && !hitFrozenFruit){
      hitting = true;
      itemHit.push("frozen veggies");
      interactionUI();
      return itemHit;
    }
    if (hitFrozenFruit === true && !hitFrozenVeggies){
      hitting = true;
      itemHit.push("frozen fruit");
      interactionUI();
      return itemHit;
    }
    if (hitCereal === true && !hitCookies){
      hitting = true;
      itemHit.push("cereal");
      interactionUI();
      return itemHit;
    }
    if (hitCookies === true && !hitCereal && !hitPasta){
      hitting = true;
      itemHit.push("cookies");
      interactionUI();
      return itemHit;
    }
    if (hitPasta === true && !hitCookies && !hitChips){
      hitting = true;
      itemHit.push("pasta");
      interactionUI();
      return itemHit;
    }
    if (hitChips === true && !hitPasta && !hitSoup){
      hitting = true;
      itemHit.push("chips");
      interactionUI();
      return itemHit;
    }
    if (hitSoup === true && !hitChips && !hitFlour){
      hitting = true;
      itemHit.push("soup");
      interactionUI();
      return itemHit;
    }
    if (hitFlour === true && !hitSoup && !hitSugar){
      hitting = true;
      itemHit.push("flour");
      interactionUI();
      return itemHit;
    }
    if (hitSugar === true && !hitFlour && !hitCrackers){
      hitting = true;
      itemHit.push("sugar");
      interactionUI();
      return itemHit;
    }
    if (hitCrackers === true && !hitSugar){
      hitting = true;
      itemHit.push("crackers");
      interactionUI();
      return itemHit;
    }
    if (hitButter === true && !hitCheese){
      hitting = true;
      itemHit.push("butter");
      interactionUI();
      return itemHit;
    }
    if (hitCheese === true && !hitButter && !hitEggs){
      hitting = true;
      itemHit.push("cheese");
      interactionUI();
      return itemHit;
    }
    if (hitEggs === true && !hitCheese && !hitMilk){
      hitting = true;
      itemHit.push("eggs");
      interactionUI();
      return itemHit;
    }
    if (hitMilk === true && !hitEggs && !hitYogurt){
      hitting = true;
      itemHit.push("milk");
      interactionUI();
      return itemHit;
    }
    if (hitYogurt === true && !hitMilk){
      hitting = true;
      itemHit.push("yogurt");
      interactionUI();
      return itemHit;
    }
    else{
      itemHit = [];
      interact = false;
      hitting = false;
      colliding = false;
    }
    stroke(0);
  }
}

//adds the "press e for..."
function interactionUI(){
  textFont(font);
  fill(0);
  textSize(30);
  noStroke();
  text("press 'e' for "+ itemHit[0], person.x, person.y);
}

function keyPressed(){
  //pick up code
  if (key === 'e' && hitting === true){
    for (let item = 0; item < chosenGroceryList.length; item++){
      if (itemHit[0] === chosenGroceryList[item] && inventory[0] !== itemHit[0] && inventory[1] !== itemHit[0] && inventory[2] !== itemHit[0] && inventory[3] !== itemHit[0] && inventory[4] !== itemHit[0]){
        inventory.push(itemHit[0]);
        pickedUp.play();
      }
    }
  }
  //press esc for menu
  if (keyCode === 27 && gameState === "game"){
    gameState = "pause";
    menu();
  }
  //if menu, go back to game
  else if (keyCode === 27 && gameState === "pause"){
    gameState = "game";
  }
  //press i for instructions title screen
  if (key === 'i' && gameState === "titleScreen"){
    gameState = "instructions";
    instructions();
  }
  //in menu instructions
  else if (key === 'i' && gameState === "pause"){
    gameState = "pauseInstructions";
    instructions();
  }
  // if instructions, go back to menu
  else if (key === 'i' && gameState === "instructions"){
    gameState = "titleScreen";
  }
  // if instructions, go back to game
  else if (key === 'i' && gameState === "pauseInstructions"){
    gameState = "game";
  }
  // goes home if beat game
  if (key === 'h' && gameState === "ending"){
    gameState = "titleScreen";
    title();
  }
}

function setup() {
  getAudioContext().suspend();
  outputVolume(0.3);
  gameMusic.loop();
  gameMusic.play(); 
  createCanvas(1912, 954);
}

let person = new Player(25, 875, 50);

function draw() {
  // audio when moving
  if (movementState === true && !walking.isPlaying()){
    walking.play();
  }
  // if in game, add floor images
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
    if (inventory.length === 5){
      gameState = "ending";
      ending();
    }
  }
  //title screen resets everything
  if (gameState === "titleScreen"){
    person.x = 25;
    person.y = 875;
    person.newX = 25;
    person.newY = 875;
    chosenGroceryList = [];
    title();
  }
}

//instructions
function instructions(){
  fill(255);
  rectMode(CENTER);
  rect(width/2, height/2, width-400, height-100);
  textSize(100);
  fill(0);
  text("INSTRUCTIONS", width/2, height/2-300);
  textSize(50);
  text("Use WASD to move. Use 'e' to interact when the prompt appears.", width/2, height/2-200);
  text("Hold 'f' to view your basket. Hold SPACE to see your grocery list.", width/2, height/2-100);
  text("Press ESC to open the menu. If you get stuck, open the menu.", width/2, height/2);
  textSize(60);
  text("FIND EVERYTHING ON YOUR LIST.", width/2, height/2+100);
  textSize(130);
  text("GOOD LUCK.", width/2, height/2+300);
  textSize(25);
  text("Press 'i' to close the instructions.", width/2, height/2+400);
}

// when user moves mouse, start music
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
  textFont(font);
  fill(255);
  textAlign(CENTER);
  textSize(45);
  let listHeight = 200;
  let division = 100;
  fill(0);
  for (let i = 0; i < chosenGroceryList.length; i++){
    text("- " + chosenGroceryList[i], width/2, height/2-listHeight);
    listHeight = listHeight - division;
  }
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
  image(frozenPizza, 0, 0, width/6, 125);
  image(frozenIceCream, width/6, 0, width/6, 125);
  image(frozenPizzaPops, width/6*2, 0, width/6, 125);
  image(frozenVeggies, width/6*3, 0, width/6, 125);
  image(frozenFruit, width/6*4, 0, width/6, 125);
  //orange shelves = dairy
  fill(249, 199, 132);
  rect(width-100, 0, 100, 754/5);
  rect(width-100, 754/5, 100, 754/5);
  rect(width-100, 754/5*2, 100, 754/5);
  rect(width-100, 754/5*3, 100, 754/5);
  rect(width-100, 754/5*4, 100, 754/5);
  //yellow shelves = dry goods
  image(dryCereal, 300, 225);
  image(dryCookies, 750, 225);
  image(dryPasta, 1200, 225);
  image(dryChips, 300, 450);
  image(drySoup, 750, 450);
  image(dryFlour, 1200, 450);
  image(drySugar, 300, 650, 500);
  image(dryCrackers, 800, 650, 500);
  //green shelves = produce
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
  //basket image
  background(255);
  image(basket, width/2-400, height/2+150);
  textSize(100);
  fill(0);
  text("IN BASKET", width/2, 200);
  fill(	255, 133, 161);
  rect(width-700, height/2-100, 500, 500);

  textAlign(CORNER);
  textSize(50);
  fill(0);
  //if # of items in inventory, # of item names appear on "has" list
  if (inventory.length === 1){
    text("-" + inventory[0], width-600, height/2);
  }
  else if (inventory.length === 2){
    text("-" + inventory[0], width-600, height/2);
    text("-" + inventory[1], width-600, height/2+100);
  }
  else if (inventory.length === 3){
    text("-" + inventory[0], width-600, height/2);
    text("-" + inventory[1], width-600, height/2+100);
    text("-" + inventory[2], width-600, height/2+200);
  }
  else if (inventory.length === 4){
    text("-" + inventory[0], width-600, height/2);
    text("-" + inventory[1], width-600, height/2+100);
    text("-" + inventory[2], width-600, height/2+200);
    text("-" + inventory[3], width-600, height/2+300);
  }
  fill(0);
  textAlign(CENTER);
}

//title/ main home screen
function title(){
  inventory = [];
  textFont(font);
  background("pink");
  fill(0);
  textAlign(CENTER);
  textSize(100);
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

//all buttons
function mousePressed(){
  if (gameState === "titleScreen" && mouseX > width/2-200 && mouseX < width/2+200 && mouseY < height/2+height/4+100 && mouseY > height/2+height/4-100){
    randomGroceryList();
    gameState = "game";
  }
  if (gameState === "pause" && mouseX > width/2-160-275 && mouseX < width/2-160+275 && mouseY > height/2-75 && mouseY < height/2-25+100){
    person.x = 25;
    person.y = 875;
  }
  if (gameState === "pause" && mouseX > width/2-300 && mouseX < width/2+300 && mouseY > height/2+50 && mouseY < height/2+150){
    gameState = "titleScreen";
    title();
  }
}

//lame winner screen
function ending(){
  clear();
  background(255, 229, 144);
  textSize(100);
  text("CONGRATULATIONS!!", width/2, height/2-200);
  textSize(75);
  text("YOU WON!", width/2, height/2);
  text("PRESS 'H' TO GO BACK TO THE HOME SCREEN", width/2, height/2+200);
}

//pause menu when pressed esc
function menu(){
  textFont(font);
  rectMode(CENTER);
  fill(0,0,0,100);
  rect(width/2, height/2, width, height);
  fill(255, 245, 153);
  rect(width/2, height/2, 700, 350);
  textSize(60);
  fill(255);
  rect(width/2-160, height/2-25, 275, 100);
  rect(width/2+160, height/2-25, 275, 100);
  rect(width/2, height/2+100, 600, 100);
  fill(0);
  text("MENU", width/2, height/2-115);
  textAlign(CENTER);
  textSize(30);
  text("I'M STUCK!!", width/2-160, height/2-15);
  text("PRESS 'I' FOR", width/2+160, height/2-30);
  text("INSTRUCTIONS", width/2+160, height/2);
  text("BACK TO HOME", width/2, height/2+110);
}