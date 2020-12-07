//Create variables here
var doggy, dog, happyDog, database, foodS, foodStock;
var database;
var hr,response,rjson,datetime;
var feed, plusFood;
var feedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  milkImage = loadImage("Milk.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",function(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  });
  foodObj =  new Food();
  doggy = createSprite(700,250,20,20);
  doggy.addImage(dog);
  doggy.scale = 0.3;

  
  /*
  milk = createSprite(x,y);
  milk.addImage(milkImage);
  milk.scale = 0.1;
  milk.visible = false;
  */
  feed = createButton("Feed the Dog");
  feed.position(600,75);
  feed.mousePressed(feedDog);

  plusFood = createButton("Increase Food");
  plusFood.position(700,75);
  plusFood.mousePressed(addFood);
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  
  feedTime = database.ref("fedTime");
  feedTime.on("value",function(data){
    lastFed = data.val();
  })
  drawSprites();
  
  //add styles here
  fill("white");
  textSize(20);
  if(lastFed>=12){
    text("Last Fed at : "+ lastFed%12 +"PM",50,100)
  }
  else if(lastFed===0){
    text("Last Fed at : 12 AM",50,100);
  }
  else{
    text("Last Fed at : "+ lastFed +"AM",50,100);
  }
}
function feedDog(){
  doggy.addImage(happyDog);
  //milk.visible = false;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}
function addFood(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
  //milk.visible = true;
}
/*
async function getTime(){
  response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  rjson = await response.json();
  datetime = rjson.datetime;
  hr = datetime.slice(11,13);
}
*/