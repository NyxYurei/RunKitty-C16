var level1, level1img, invisibleground;
var levelground, levelgroundimg;
var soulimg, soul;
var cat, catwalk, catdead;
var monster, monsterimg;

var souls = 0;
var score = 0;
var gameState = 0; 


function preload(){
 level1img = loadImage ("level1.png");
 levelgroundimg = loadImage ("ground.png")
 soulimg = loadImage ("soul.png");
 catwalk = loadAnimation ("walk1.png", "walk2.png", "walk3.png", "walk4.png", "walk5.png", "walk6.png");
 catdead = loadAnimation ("dead.png");
 monsterimg = loadImage ("monster5.png");
}


function setup() {
   createCanvas (700, 430);
  
   
  //leve1
    //background
  level1 = createSprite (400, 200, 20, 20);
  level1.addImage ("level1", level1img);
  level1.scale = 1.7; 
  level1.velocityX = -3;
  
   //ground
  levelground = createSprite (350, 410, 700, 10);
  levelground.addImage ("ground", levelgroundimg);
  levelground.scale = 1.5;
  levelground.velocityX = 3
  
  //player
  cat = createSprite (220, 344, 10, 10);
  cat.addAnimation ("walk", catwalk);
  cat.addAnimation ("dead", catdead);
  cat.scale = 2.2;

   
  //invisible ground
   invisibleground = createSprite (220, 370, 60, 10);
   invisibleground.visible = false;


  //groups
   soulg = new Group();
   monsterg = new Group();

}

function draw() {
  background ("gray");

  drawSprites() 
  //score 
  textSize (19);
  textFont ("Impact");
  fill (rgb(224, 221, 170));
  text ("Score: " + score, 40, 40)
  
  textSize (19);
  textFont ("Impact");
  fill (rgb(224, 221, 170));
  text ("Souls Colectted: " + souls, 165, 40);


  if(gameState == 0){
    spawnSoul();
    spawnMonster()
   levelground.velocityX = (4 +3* score/600);
   level1.velocityX = -(4 +3* score/600);
 
   score = score + Math.round(getFrameRate()/60)
   //collectd souls
    if(soulg.isTouching(cat)){
      soulg.destroyEach();
      souls = souls + 1;
    }
   //lost
   if(monsterg.isTouching(cat)){
     monsterg.destroyEach;
     gameState = 1;
   }

   //level1img restart
   if(level1.x < 280){
     level1.x = level1.width/1.2;
   } 
   //ground restart
   if(levelground.x > 430){
     levelground.x = levelground.width/2;
   }
  
   //jump
   if(keyDown("space")&& cat.y >= 343){
    cat.velocityY = -12;
  }
   //give gravity
     cat.velocityY = cat.velocityY + 0.6;     
  }
   
  if(gameState == 1){
   cat.changeAnimation ("dead")
   level1.velocityX = 0;
   levelground.velocityX = 0;
    //give gravity
    cat.velocityY = cat.velocityY + 0.4; 
    textSize (50);
    textFont ("Impact");
    fill (rgb(137, 15, 13));
    text ("YOU DIED", 250, 215);
    textSize (20);
    textFont ("Georgia");
    fill (rgb(224, 221, 170));
    text ("Press UP ARROW to restart", 230, 234);
    if(keyDown("UP_ARROW")) {
      reset();
    }
  }

  //make the cat stop falling
  cat.collide (invisibleground); 
}

function spawnSoul(){
 if(frameCount % 200 == 0){
  soul = createSprite (700, random (255, 340), 30, 30);
  soul.addImage (soulimg);
  soul.scale = 0.04;
  soul.velocityX = -(3 + 4* score/350);
  soul.lifetime = 240;
  soulg.add(soul);
 }
}

function spawnMonster(){
 if(frameCount % 150 == 0){
   monster = createSprite (20, cat.y , 20, 20);
   monster.addImage(monsterimg);
   monster.scale = 2;
   monster.velocityX = (6 + 1* score/650);
   monsterg.add(monster);
 }
}
 
function reset(){
 gameState = 0;
 cat.changeAnimation ("walk");
 score = 0;
 souls = 0;
 monsterg.destroyEach();
 soulg.destroyEach();
}








