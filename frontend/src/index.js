const gameElement = document.getElementById("game");
const ctx = gameElement.getContext("2d");
const empty = "WHITE"; // color of an empty square
const gray = "LIGHTGRAY"
const black = "BLACK"
const playButton = document.getElementById("play-button")
const gameBoardSpec = {
  x: 0,
  y: 0,
  width: 10,
  height: 20,
  sq: 25,
  color: empty,
  borderColor: 'lightgray'
}
const nextBoardSpec = {
  x: 22,
  y: 5,
  width: 6,
  height: 6,
  sq: 13,
  color: 'white',
  borderColor: 'lightgray'
}
const holdBoardSpec = {
  x: 22,
  y: 13,
  width: 6,
  height: 6,
  sq: 13,
  color: 'white',
  borderColor: 'lightgray'
}

const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"]
];

// draw a square
function drawSquare(x, y, color, sq) {
  ctx.fillStyle = color;
  ctx.fillRect(x * sq, y * sq, sq, sq);
  ctx.strokeStyle = gray;
  ctx.strokeRect(x * sq, y * sq, sq, sq);
}

// create the board
const gameBoard = new Board(gameBoardSpec)
gameBoard.drawBoard();
const nextBoard = new Board(nextBoardSpec)
nextBoard.drawBoard();
const holdBoard = new Board(holdBoardSpec)
holdBoard.drawBoard();

function randomPiece() {
  let random = Math.floor(Math.random() * PIECES.length) // 0 -> 6
  return new Piece(PIECES[random][0], PIECES[random][1], 25);
}

let p = randomPiece()
let nextPiece = randomPiece();
let holdPiece;

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 37 && !paused) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (e.keyCode == 38 && !paused) {
    p.rotate();
    dropStart = Date.now();
  } else if (e.keyCode == 39 && !paused) {
    p.moveRight();
    dropStart = Date.now();
  } else if (e.keyCode == 40 && !paused) {
    p.moveDown();
  } else if (e.keyCode == 32 && !paused) {
    p.fastMoveDown();
  } else if (e.keyCode == 27) {
    if (paused) {
      paused = false
      playButton.firstElementChild.remove()
    } else {
      paused = true
      playButton.innerHTML = `<button type="button" value="resume">RESUME</button>`
    }
  } else if (e.keyCode == 16) {
    p.hold()
  }
});

// drop the piece every 1sec
let dropStart = Date.now();
let gameOver = false;
let paused = false;
let score = 0;
let speed = 2000;
let level;

function drop() {
  nextBoard.drawBoard()
  nextBoard.drawPiece(nextPiece)
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > speed) {
    if (!paused) {
      p.moveDown();
    }
    dropStart = Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

document.addEventListener('click', (e) => {
  if (e.target.value === "play") {
    drop();
    playButton.firstElementChild.remove()
  } else if (e.target.value === "resume") {
    paused = false
    playButton.firstElementChild.remove()
  }
})
