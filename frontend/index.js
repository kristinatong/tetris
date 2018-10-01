let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = 0;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function drawSquare() {
  ctx.beginPath();
  ctx.rect(x, y, 80, 80);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquare();
  // x += dx;
  if (y < 560) {
    y -= dy;
  }

  if (rightPressed && y < 560) {
    if(x<313){
      x += 7;
    }
  } else if (leftPressed && y < 560) {
    if(x>=0){
      x -= 7;
    }
  }
}


setInterval(draw, 10);
