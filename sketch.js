var boy,boyImg,boyImg2;

var PLAY = 1;
var END = 0;

var score = 0;

var gameState = PLAY;

var invisibleGround;

var gamebackground,gamebackgroundImg;

var stone1,stone2,stone3,stoneOrSticksGroup,stoneorstick;
var stickImg;

var restart,restartImg;


function preload(){
 boyImg = loadImage("boyrunning.gif");
 boyImg2 = loadImage("boyrunning2.png")

 gamebackgroundImg = loadImage("street background.jpg");

 stone1 = loadImage("stone image.png");
 stone2 = loadImage("stone2 image.jpg");
 stone3 = loadImage("stone3 image.jpg");

 stick = loadImage("stick image.png");

 restartImg = loadImage("restart image.jpg");
}

function setup() {
 createCanvas(400,400)

 gameState = PLAY;

 gamebackground=createSprite(0,200);
 gamebackground.addImage(gamebackgroundImg);
 gamebackground.velocityX = -4;

 boy = createSprite(70,250)
 boy.addImage(boyImg);
 boy.scale = 0.5;

 invisibleGround = createSprite(200,300,400,10)
 invisibleGround.visible = false;

 stoneOrSticksGroup = new Group();
 
 restart = createSprite(200,200);
 restart.addImage(restartImg);
 restart.scale = 0.25;
 restart.visible = false;

 score = 0;
}

function draw() {

  textSize(50);
  text("Score: "+ score, 100,50);
 
  if(gameState===PLAY) {
    if(gamebackground.x < 0) {
      gamebackground.x = 200;
    }

    score = score + Math.round(getFrameRate()/60);
    gamebackground.velocityX = -(6 + 3*score/100);
   
    boy.collide(invisibleGround);

    //boy.debug = true;
   
    spawnStonesAndSticks();
   
    if(keyDown("space") && boy.y >= 200) {
     boy.velocityY = -12;
    }
     boy.velocityY += 0.7;
    
    if(boy.isTouching(stoneOrSticksGroup)) {
      gameState = END;
    }
  } else if(gameState===END) {
     boy.velocityX = 0;
     boy.velocityY = 0;

     stoneOrSticksGroup.setVelocityXEach(0);
     stoneOrSticksGroup.setLifetimeEach(-1);
     gamebackground.velocityX = 0;

     restart.visible = true;

     boy.addImage(boyImg2);

     if(mousePressedOver(restart)) {
      reset();
    }
  }

 drawSprites();
}

function spawnStonesAndSticks() {
  if(frameCount % 60 === 0) {
    stoneorstick = createSprite(424,290,50,50);
    stoneorstick.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: stoneorstick.addImage(stone1);
              stoneorstick.scale = 0.2;
              break;
      case 2: stoneorstick.addImage(stone2);
              stoneorstick.scale = 0.2;
              break;
      case 3: stoneorstick.addImage(stone3);
              stoneorstick.scale = 0.05;
              break;
      case 4: stoneorstick.addImage(stick);
              stoneorstick.scale = 0.2;
              break;
      default: break;
    }

    stoneorstick.lifetime = 80;
    stoneOrSticksGroup.add(stoneorstick);
  }
}

function reset() {
  gameState = PLAY;
  
  restart.visible = false;

  stoneOrSticksGroup.destroyEach();

  boy.addImage(boyImg);

  score = 0;
}