let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

const row = 40;
const col = column = 10;
const SQ = squaresize = 40
const vacant = "white" // color of empty square

//draw square
function drawSquare(x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
  ctx.strokeStyle = "gray";
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ)
}


//create board

let board = [];
for (r = 0; r < row; r++) {
  board[r] = [];
  for (c = 0; c < col; c++) {
    board[r][c] = vacant
  }
}

//draw the board
function drawBoard() {
  for (r = 0; r < row; r++) {
    for (c = 0; c < col; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }

}

drawBoard();


const pieces = [
  [Z, "#FFB9B9"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"]
];

//initiate the piece

let p = new Piece(pieces[0][0], pieces[0][1])

// The object Piece
function Piece(tetromino, color) {
  this.tetromino = tetromino
  this.color = color

  this.tetrominoN = 0 // we start from the first pattern
  this.activeTetromino = this.tetromino[this.tetrominoN]

  // we need to contol the pieces
  this.x = 4;
  this.y = 0;
}

//draw a piece to the board
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

//undraw piece

Piece.prototype.unDraw = function() {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      //we want to only draw the occupied squares
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, vacant)
      }
    }
  }
}

//move the piece down
Piece.prototype.moveDown = function() {
  this.unDraw()
  this.y++
  this.draw()
}

//move the piece right
Piece.prototype.moveRight = function() {
  this.unDraw()
  this.x++
  this.draw()
}


//move the piece left
Piece.prototype.moveLeft= function() {
  this.unDraw()
  this.x--
  this.draw()
}

//rotate the piece
Piece.prototype.rotate = function() {
  this.unDraw()
  this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length //(0+1)%4=>1
  this.activeTetromino = this.tetromino[this.tetrominoN]
  this.draw()
}

//control piece
document.addEventListener('keydown',control)
function control(event){
  if(event.keyCode == 37){
    p.moveLeft();
  }else if(event.keyCode == 38){
    p.rotate();
  }else if(event.keyCode == 39){
    p.moveRight();
  }else if(event.keyCode == 40){
    p.moveDown();

  }

}

//drop the peice every 10sec
let dropStart = Date.now()

function drop() {
  let now = Date.now()
  let delta = now - dropStart
  if (delta > 1000) {
    p.moveDown()
    dropStart = Date.now()
  }
  requestAnimationFrame(drop)

}

drop()
