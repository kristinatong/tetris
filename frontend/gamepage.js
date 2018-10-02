var canvas1 = document.getElementById("myCanvas1");
var ctx1 = canvas1.getContext("2d");
ctx1.font = "30px Notable";
ctx1.fillStyle = "gray";
ctx1.fillText("LEVEL:",10,80);
ctx1.fillText("SCORE:",10,130);
ctx1.fillText("LINES:",10,180);



var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");
const row1 = 40;
const col1 = column = 10;
const SQ1 = squaresize = 40
const vacant1 = "white" // color of empty square

function drawSquare(x, y, color) {
  ctx2.fillStyle = color
  ctx2.fillRect(x * SQ1, y * SQ1, SQ1, SQ1);
  ctx2.strokeStyle = "gray";
  ctx2.strokeRect(x * SQ1, y * SQ1, SQ1, SQ1)
}
drawSquare(0,0, "red")


Piece.prototype.draw = function() {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      //we want to only draw the occupied squares
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, this.color)
      }
    }
  }
}
