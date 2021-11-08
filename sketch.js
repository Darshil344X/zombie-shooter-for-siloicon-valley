var bg,bgImg;
var player;
var shooterImg,shooter_shooting;
var bullet,bullet_1;
var zombie,zombie_img;
var zombieGroup,bulletGroup;
var heart1,heart2,heart3;
var heart_Img3,heart_Img3,heart_Img3;
var gameState="fight";
var lose,winning;
var score=0;
var life=3;
var bullets=55;
var expo,lose,win;

function preload(){
bgImg = loadImage("assets/bg.jpg");
//shooterImg = loadImage("assets/shooter_2.png");
shooter_shooting = loadImage("assets/shooter_3.png");
bullet_1 = loadImage("assets/bullet.png");
zombie_img = loadImage("assets/zombie.png");
heart_Img1 = loadImage("assets/heart_1.jpg");
heart_Img2 = loadImage("assets/heart_2.jpg");
heart_Img3 = loadImage("assets/heart_3.jpg");
expo = loadSound("assets/explosion.mp3");
lose = loadSound("assets/lose.mp3");
win = loadSound("assets/win.mp3");
}








function setup() {
  createCanvas(windowWidth,windowHeight);
  
 bg= createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
bg.scale=2.5
//creating player
player= createSprite(displayWidth-1350,displayHeight-300,50,50);
player.addImage(shooter_shooting);
player.scale=0.5;

//creating sprite for lives
heart1=createSprite(displayWidth-150,40,20,20);
heart1.addImage("heart1",heart_Img1);
heart1.visible=false
heart1.scale=0.4;


heart2=createSprite(displayWidth-150,40,20,20);
heart2.addImage("heart2",heart_Img2);
heart2.scale=0.4;
heart2.visible=false

heart3=createSprite(displayWidth-150,40,20,20);
heart3.addImage("heart3",heart_Img3);
heart3.scale=0.4;

zombieGroup= new Group();
bulletGroup= new Group();

}


function draw() {
  background(255,255,255);  

 if(gameState=="fight"){

  //displaying heart image for life 
  if(life==3){
  heart3.visible=true;
  heart2.visible=false;
  heart1.visible=false;
  }

  if(life==2){
    heart3.visible=false;
  heart2.visible=true;
  heart1.visible=false;
  }

  if(life==1){ 
    heart3.visible=false;
  heart2.visible=false;
  heart1.visible=true;
  }

  //creating game state lost
  if(life==0){
gameState= "lost"
lose.play();

  }

  if(score==50){
    gameState= "won"
    win.play();
  }

  



  if(keyDown("UP_ARROW") || touches.length>0){
    player.y=player.y-30;
    
      }
    
      if(keyDown("DOWN_ARROW")|| touches.length>0){
    player.y=player.y+30;
      }
      
      if(keyWentDown("SPACE")){
        bullet=createSprite(displayWidth-1230,player.y-110,35,35)
        bullet.addImage(bullet_1);
        bullet.scale=0.1
        bullet.velocityX=20
        bulletGroup.add(bullet);
        player.depth=bullet.depth;
        player.depth=bullet.depth+2;
  //  player.addImage(shooter_shooting);
    bullets=bullets-1;
    expo.play();

      }
   // else if(keyWentUp("SPACE")){
    //  player.addImage(shooterImg);

 //   }
    
    if(bullets==0){
   gameState="bullet"
   lose.play();

    }



    //destroying the zombies 
    if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++)
    {
      if(zombieGroup[i].isTouching(bulletGroup)){
zombieGroup[i].destroy();

bulletGroup.destroyEach();
score=score+2;

      }
    }
    }
    
    //reduce life and destroy zombie 
    if(zombieGroup.isTouching(player)){
    for (var i = 0;i<zombieGroup.length; i++) {
     
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        life=life-1
      }
    }
    }

    enemy();
  }
      drawSprites();

      textSize(20);
      fill("blue");

      text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250); 
      text("Score = " + score,displayWidth-200,displayHeight/2-220);
       text("Lives = " + life,displayWidth-200,displayHeight/2-280);

       if(gameState=="lost"){
        console.log("lost");
        textSize(100);
        fill("red");
       text("YOU LOST",480,400);
       zombieGroup.destroyEach();
       player.destroy();
      } 
      else if(gameState=="won"){
        console.log("won");
        textSize(100);
        fill("green");
       text("YOU WON",480,400);
       zombieGroup.destroyEach();
       player.destroy();
      
      }
      else if(gameState=="bullet"){ 
        console.log("bullet");
        textSize(100);
        fill("yellow");
       text("YOU RAN OUT OF BULLET",200,400);
       zombieGroup.destroyEach();
       player.destroy();
       bulletGroup.destroyEach();
      } 
    
 }



function enemy(){
  if(frameCount%50==0){
    zombie= createSprite(random(displayWidth-100,displayWidth-1000),random(100,500),40,40)
    zombie.addImage(zombie_img);
    zombie.scale=0.5;
    zombie.velocityX=-4;
    zombie.setCollider("rectangle",0,0,400,400);
    zombie.lifetime=400;
    zombieGroup.add(zombie)
  }
}
