// global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var monkeyd

//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//function Preload
function preload(){
  
  
//Monkey
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
  
monkeyd = loadImage("sprite_0.png")
 
}


//function Setup
function setup() {
  

// create canvas
createCanvas(400,400);
  
//Groups
FoodGroup = createGroup();
obstacleGroup = createGroup();
  
//Monkey
monkey = createSprite(50, 315, 10, 10);
monkey.addAnimation("monkey_running",monkey_running);
monkey.scale = 0.1;
  
// Ground
ground = createSprite(70, 350, 800, 10);
ground.velocityX = -4;
ground.x=ground.width/2;
  
//score
score = 0;

}

//funtion draw
function draw() {
  
//Background
background (180);
  
//displaying survialtime
stroke("black");
fill("black");
textSize(20);
text("Survial Time: "+  score, 100, 50);
  
  
// monkey Collide
monkey.collide(ground);
  
  
// gamestate play
if(gameState === PLAY){
score = Math.ceil(frameCount/frameRate());
     
// ground re generation
if (ground.x < 0){
ground.x = ground.width/2;
}
    
//jump
if(keyDown("space")) {
monkey.velocityY = -12;
}    
    
//Gravity
monkey.velocityY = monkey.velocityY + 0.8;
  
//Adding Functions
food();
obstacles();
    
// switch to end
if(obstacleGroup.isTouching(monkey)){
gameState = END;
}
}

// gamestate END
if (gameState === END) {
obstacleGroup.destroyEach();
FoodGroup.destroyEach();
ground.velocityX=0;
monkey.destroy();
var monkeyde;
monkeyde=createSprite(200,315,20,20);
monkeyde.addImage(monkeyd)
monkeyde.scale=0.1;
text("dead,dead,dead!!",200,200)
}
 
//draw Sprites
drawSprites();
}

// function Banana
function food() {
if (frameCount % 80 === 0) {
banana = createSprite(400,350,40,10);
banana.addImage(bananaImage);
banana.y = Math.round(random(120,200));
banana.scale = 0.1;
banana.velocityX = -3;
banana.lifetime = 200;
FoodGroup.add(banana);
}
}

//function Obstacles
function obstacles() {
if (frameCount % 300 === 0){
obstacle = createSprite(250,325,10,10);
obstacle.addImage(obstacleImage);
obstacle.velocityX = -3;
obstacle.lifetime = 200;
obstacle.scale = 0.1 ;
obstacleGroup.add(obstacle);
}

}

