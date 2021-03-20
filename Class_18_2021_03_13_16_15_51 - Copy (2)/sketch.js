var monkey, monkey_img, banana, banana_img, stone, stone_img, score, gameOverImg, restartImg;
var backImg, jungle, ground;
var PLAY = 1;
var gameState = PLAY;

var obstacleGroup, bananaGroup;

function preload(){ 
  backImg = loadImage("jungle.jpg");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  monkey_img = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  banana_img = loadImage("banana.png");
  stone_img = loadImage("stone.png");
}  

function setup() {
  createCanvas(1000, 300);
  jungle = createSprite(300,50);
  jungle.addImage("img", backImg);
  
  jungle.x = 100;
  jungle.velocityX = -6;  
  
  monkey = createSprite(50,230,20,40);
  monkey.addAnimation("running", monkey_img);
  monkey.scale = 0.1;
  
  ground = createSprite(100,260,600,10);
  ground.visible = false; 

  gameOver = createSprite(100,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(100,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
}
  
function draw() {

  background(220);
 
  if(gameState === PLAY){

if (keyWentDown("space") && monkey.collide(ground)) {
monkey.velocityY = -16;
}

gameOver.visible = false;
restart.visible = false;
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);

  if (jungle.x < 50){
      jungle.x = 100;
  }
  
  if(bananaGroup.isTouching(monkey)) {
    score = score+2
    console.log(score)
    bananaGroup.destroyEach();  
    switch(score) {
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18
      break;
    default: break;
    }    
  }
  
  if(score>=2){
    end();
}
  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.075;
    obstacleGroup.destroyEach();
    score=0;
  }
  camera.position.x = monkey.x;
  camera.position.y = monkey.y;
  
  spawnBananas();
  spawnObstacles();
  drawSprites();
  
  textSize(20);
  text("Score: "+ score, 400,100);
  }
}

function spawnBananas() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("banana's_image", banana_img);
    banana.scale = 0.035
    banana.velocityX = -3;
    
   
    banana.lifetime = 200;
    
    
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    stone = createSprite(600,240,10,40);
    stone.addImage("stone_image", stone_img);
    stone.scale = 0.1
    stone.velocityX = -6;

    stone.lifetime = 300;
   
    obstacleGroup.add(stone);
  }
}

function end(){
  gameOver.visible = true;
  restart.visible = true;
  monkey.velocityX = 0;
  jungle.velocityX = 0;
  stone.velocityX = 0;
  banana.velocityX = 0;
  stone.visible = false;
  banana.visible = false;
  if(mousePressedOver(restart)){
    reset();
}
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach()
  bananaGroup.destroyEach()
  score = 0;
  jungle.x = 100;
  jungle.velocityX = -6;  
  }