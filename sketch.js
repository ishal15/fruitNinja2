var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,enemyGroup, score,a,randomFruit;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage, knifeSound, gameOverSound;


function preload(){
  
  knifeImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  knifeSound= loadSound("knifeSwooshSound.mp3");
  gameOverSound= loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  
  knife.setCollider("rectangle",0,0,40,40);

  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    
    fruits();
    Enemy();
    
   
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
   
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score=score+2;
      knifeSound.play();
    }
   
      
      if(enemyGroup.isTouching(knife)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        knife.addImage(gameOverImage);
        knife.x=200;
        knife.y=200;
        gameOverSound.play();
      }
    }
  
  
  drawSprites();
  text("Score : "+ score,300,30);
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10))
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     
     a=Math.round(random(1,4));
    if (a == 1) {
      fruit.addImage(fruit1);
    } else if (a == 2) {
      fruit.addImage(fruit2);
    } else if (a == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

