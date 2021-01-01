var PLAY = 1;
var END = 0;
var gameState = 1;
var sword, fruit, bomb, fruitGroup, enemyGroup, score, r, randomFruit, over;
var swordImage, fruit1, fruit2, fruit3, fruit4, bombImage, gameOverImage;

function preload(){
  swordImage = loadImage("sword.png");
  bombImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
}

function setup() {
  createCanvas(600, 600);
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.6;
  sword.setCollider("rectangle",0,0,40,40);
  score=0;
  over = createSprite(300, 300,20,20);
  over.addImage(gameOverImage);
  over.visible = false;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background("lightblue");
  if(gameState===PLAY){
    fruits();
    enemies();
    sword.y = World.mouseY;
    sword.x = World.mouseX;
  
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+1;
    }
    
    else
    {
      if(enemyGroup.isTouching(sword)){
        gameState= END;
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        over.visible = true;
}
}
}
  
  drawSprites();
  text("Score : "+ score,300,30);
}

function enemies(){
  if(World.frameCount%180===0){
    bomb = createSprite(400,200,20,20);
    bomb.addAnimation("bomb", bombImage);
    bomb.y=Math.round(random(100,300));
    bomb.velocityX=-10;
    bomb.setLifetime=50;
    enemyGroup.add(bomb);
}
}

function fruits(){
  if(World.frameCount%60===0){
    fruit=createSprite(600,200,20,20);
    fruit.scale=0.2;
    r = Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }   
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-10;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
}
}