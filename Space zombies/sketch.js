var bg,bgImg;
var player, shooterImg, shooter_shooting;
var invisibleGround;
var zombiesGroup,zombiesImage;
var bullet,bulletImg;
var zombie;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombiesImage = loadImage("assets/zombie.png")
  bgImg = loadImage("./assets/space_background.png")
  bulletImg = loadImage("./assets/bullet.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 2
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   invisibleGround = createSprite(200,650,displayWidth+800,10);
   invisibleGround.visible = false;
   zombiesGroup = new Group();
}

function draw() {
  background(0); 

//console.log(player.y);


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
 player.x = player.x+30
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyDown("UP_ARROW") ) {
  player.velocityY = -12;
}
player.velocityY = player.velocityY + 0.8

player.collide(invisibleGround);
if(keyWentUp(32)){
 player.addImage(shooter_shooting)
 bullet = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
 
bullet.x=player.x;
bullet.y=player.y-25;
bullet.addImage(bulletImg)
bullet.velocityX=12;
bullet.scale=0.05;
}

spawnZombies();

if(zombiesGroup.isTouching(bullet)){
  //bullet.destroy();
  zombiesGroup.destroyEach();
}
zombiesGroup.setLifetimeEach(-1);



drawSprites();

}

function spawnZombies(){
  if (frameCount % 200 === 0) {
     zombie = createSprite(displayWidth-200,610,40,10);
    zombie.x = Math.round(random(displayWidth/2,displayWidth));
    zombie.y= Math.round(random(displayHeight/2-300,610));
    zombie.addImage(zombiesImage);
    zombie.scale = 0.2;
    zombie.velocityX = -1;
    zombie.depth = player.depth;
    player.depth = player.depth + 1;
    zombiesGroup.add(zombie);
  } 

}
