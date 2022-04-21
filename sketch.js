var space,alien,drink,bar,blue,asteroid;
var spaceImg,alienImg,drinkImg,barImg,blueImg,asteroidImg;
var Energy_Left = 40;
var drinkG,barG,blueG,asteroidGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;
function preload(){

  spaceImg = loadImage("background.jpeg");
  alienImg = loadImage("UFO.png");
  drinkImg = loadImage("drink.png");
  barImg = loadImage("bar.png");
  blueImg = loadImage("blue.png");
  asteroidImg = loadImage("asteroid.png");
  endImg =loadImage("gameover.png.png");
}

function setup(){
  
//create a canvas

createCanvas(windowWidth,windowHeight);

// Moving background

spaces=createSprite(width/2,200);
space.addImage(spaceImg);
space.velocityY = 4;


//creating alien running
alien = createSprite(width/2,height-20,20,20);
alien.addImage("UFO.png");
alien.scale=0.08;
  
  
drinkG=new Group();
barG=new Group();
blueG=new Group();
asteroidGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  alien.x = World.mouseX;
  
  edges= createEdgeSprites();
  alien.collide(edges);

  setInterval(energy(), 10000)

  
  //code to reset the background

  if(space.y > height ){
    space.y = height/2;
   }
  
    createdrink();
    createbar();
    createblue();
    createasteroid();

    if (drinkG.isTouching(alien)) {
      drinkG.destroyEach();
      Energy_Left = Energy_Left + 50;
    }
    else if (barG.isTouching(alien)) {
      barG.destroyEach();
      Energy_Left=Energy_Left + 100;
      
    }else if(blueG.isTouching(alien)) {
      blueG.destroyEach();
      Energy_Left= Energy_Left + 150;
      
    }else{
      if(asteroidGroup.isTouching(alien)) {
        gameState=END;
        
        alien.addImage("UFO",endImg);
        alien.x=width/2;
        alien.y=height/2;
        alien.scale=0.6;
        
        drinkG.destroyEach();
        barG.destroyEach();
        blueG.destroyEach();
        asteroidGroup.destroyEach();
        
        drinkG.setVelocityYEach(0);
        barG.setVelocityYEach(0);
        blueG.setVelocityYEach(0);
        asteroidGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Energy Left: "+ Energy_Left,width-150,30);
  }

}

function energy() {
    Energy_Left -= 10
}

function createdrink() {
  if (World.frameCount % 200 == 0) {
  var drink = createSprite(Math.round(random(50, width-50),40, 10, 10));
  drink.addImage(drinkImg);
  drink.scale=0.12;
  drink.velocityY = 5;
  drink.lifetime = 200;
  drinkG.add(drink);
  }
}

function createbar() {
  if (World.frameCount % 320 == 0) {
  var bar = createSprite(Math.round(random(50, width-50),40, 10, 10));
  bar.addImage(barImg);
  bar.scale=0.03;
  bar.velocityY = 5;
  bar.lifetime = 200;
  barG.add(bar);
}
}

function createblue() {
  if (World.frameCount % 410 == 0) {
  var blue = createSprite(Math.round(random(50, width-50),40, 10, 10));
  blue.addImage(blueImg);
  blue.scale=0.13;
  blue.velocityY = 5;
  blue.lifetime = 200;
  blueG.add(blue);
  }
}

function createasteroid(){
  if (World.frameCount % 530 == 0) {
  var asteroid = createSprite(Math.round(random(50, width-50),40, 10, 10));
  asteroid.addImage(asteroidImg);
  asteroid.scale=0.1;
  asteroid.velocityY = 4;
  asteroid.lifetime = 200;
  asteroidGroup.add(asteroid);
  }
}