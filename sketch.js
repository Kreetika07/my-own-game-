var human,humanroll,humanrun,humanjump;
var virus11,virus2,virusImg1,virusImg2,virusImg3,virusGrp;
var backgroundImg,backGround;
var humanHealth=5;
var block1,block2,block3,block4,block5;
var gameState= "play";
var invisibleGround;
var log,log1,log2,log3,log4,log5,logGroup;
var vaccine,vaccineImg,vaccineGrp;
var score = 0;
var coinCount = 0;

function preload(){
  humanrun = loadAnimation("images/run/pc2.png","images/run/pc3.png","images/run/pc4.png","images/run/pc5.png","images/run/pc6.png","images/run/pc7.png");
  virusImg1 = loadImage("images/virus/1.png");
  virusImg2 = loadImage("images/virus/2.png");
  virusImg3 = loadImage("images/virus/3.png");
  backgroundImg = loadImage("images/background.png");
  log1 = loadImage("images/block/block1.png");
  log2 = loadImage("images/block/block2.png");
  log3 = loadImage("images/block/block3.png");
  log4 = loadImage("images/block/block4.png");
  log5 = loadImage("images/block/block5.png");
  vaccineImg = loadImage("images/injection1.png")
}

function setup(){
createCanvas(windowWidth,windowHeight);
backGround = createSprite(100,180,400,20);
backGround.addImage("backGround",backgroundImg);
backGround.x = backGround.width/3-30;
backGround.velocityX = -(6 + 3*score/100);
backGround.scale=0.7;
human = createSprite(100,height-250,100,100);
human.addAnimation("run",humanrun);
human.scale= 1;
virusGroup = new Group();
vaccineGrp = new Group();
block1 = createSprite(width/2,height-30,80,20);
block2 = createSprite(width/2+80,height-30,80,20);
block3 = createSprite(width/2+160,height-30,80,20);
block4 = createSprite(width/2+240,height-30,80,20);
block5 = createSprite(width/2+320,height-30,80,20);
invisibleGround = createSprite(width/2,height-160,1500,10);
invisibleGround.visible = false;

score = 0;
coinCount = 0;
}

function draw(){
  background(255);
backgroundImg.velocityX += 5;
text("Score: "+ score, 500,50);
textSize(15)
fill("white");
text("Human Health : ",width/2-150,height-30);
if(gameState==="play"){
  score = score + Math.round(getFrameRate()/60);
  background.velocityX = -(6 + 3*score/100);
  if(keyDown(UP_ARROW)&& human.y >= 100) {
    human.velocityY = -12;
    //jumpSound.play();
}
human.velocityY = human.velocityY + 0.8
if (backGround.x < 0){
  backGround.x = backGround.width/3;
}
if(virusGroup.isTouching(human)){
for(var i=0; i<virusGroup.length; i++){
  if(virusGroup.get(i).isTouching(human)){
    virusGroup.get(i).destroy();
    humanHealth=humanHealth-1;
    if(humanHealth===4){
      block5.destroy();
    }
    if(humanHealth===3){
      block4.destroy();
    }
    if(humanHealth===2){
      block3.destroy();
      
    }
    if(humanHealth===1){
      block2.destroy();
    }
    if(humanHealth===0){
      block1.destroy();
      gameState="end"
    }
  }
}
}
human.collide(invisibleGround)
spwanVirus();
spwanVaccine();
}
drawSprites();
if(gameState==="end"){
  
}
}

function spwanVirus(){
  if (frameCount % 150 === 0) {
    var virus = createSprite(width,50,40,10);
    virus.y = Math.round(random(30,500));
    virus.addImage(virusImg1);
    virus.scale = 0.5;
    virus.velocityX = -10;
    
    virus.lifetime = width/3;
    
    virus.depth = human.depth;
    human.depth = human.depth + 1;

    virusGroup.add(virus);
  }
}
function spwanVaccine(){
  if (frameCount % 150 === 0) {
    var vaccine = createSprite(width,50,40,10);
    vaccine.y = Math.round(random(30,500));
    vaccine.addImage(vaccineImg);
    vaccine.scale = 0.2;
    vaccine.velocityX = -8;
    
    vaccine.lifetime = width/3;
    
    vaccine.depth = human.depth;
    human.depth = human.depth + 1;

    vaccineGrp.add(vaccine);
  }
}
