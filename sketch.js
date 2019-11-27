var size = 500;
var x = 100;
var y = 300;

var gameStart = false;

var score = 1;

var foodX = (Math.floor(Math.random() * 30) + 5) * 10;
var foodY = (Math.floor(Math.random() * 30) + 5) * 10;

var snakeColor;
var foodColor;

var prevX = [];
var prevY = [];

var direction = "right";
var move = 10;

function setup() {
  foodColor = color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
  snakeColor = color(255, 255, 255);
  frameRate(15);
  createCanvas(size,size);
}

function draw() {
  background(220);
  if(gameStart){
    fill(0, 0, 0);
    textSize(15);
  	text("Score: " + (score-1), 10, 20);
    fill(snakeColor);
    for (var i = 1; i <= score; i++) {
      ellipse(prevX[prevX.length - i], prevY[prevY.length - i], 10, 10);
    }
    fill(foodColor);
    ellipse(foodX, foodY, 10, 10);
    updateSnake();
  }
  else{
    textSize(30);
  	text("Welcome to Snake!", size/5, size/2 - 20);
    textSize(15);
    text("Use arrow keys to move, press any key to start!",size/5-20,size/2+10);
  }
}

function updateSnake() {
  if (direction == "up") {
    y -= move;
  } else if (direction == "down") {
    y += move;
  } else if (direction == "left") {
    x -= move;
  } else if (direction == "right") {
    x += move;
  }
  if (checkCollision()) {
    textSize(30);
    fill(0, 0, 0);
    text("Game Over!", size/4, 150);
    text("Your score: " + (score-1), size/4,200);
    noLoop();
  }
  prevX.push(x);
  prevY.push(y);
  if (prevX.length > score) {
    prevX.shift();
    prevY.shift();
  }
  if (Math.abs(x - foodX) <= 5 && Math.abs(y - foodY) <= 5) {
    score+=5;
    foodX = (Math.floor(Math.random() * 30) + 5) * 10;
    foodY = (Math.floor(Math.random() * 30) + 5) * 10;
    snakeColor = foodColor;
    foodColor = color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
  }
}

function checkCollision() {
  if (x == 0 || y == 0 || x == size || y == size) {
    return true;
  }
  for(var i = prevX.length-2; i >= prevX.length-score; i--){
    if(prevX[i] == x && prevY[i] == y){
      return true;
    }
  }
  return false;
}

function keyPressed() {
  gameStart = true;
  if (keyCode === LEFT_ARROW && direction != "right") {
    direction = "left";
  } else if (keyCode === RIGHT_ARROW && direction != "left") {
    direction = "right";
  } else if (keyCode === DOWN_ARROW && direction != "up") {
    direction = "down";
  } else if (keyCode === UP_ARROW && direction != "down") {
    direction = "up";
  }
}
