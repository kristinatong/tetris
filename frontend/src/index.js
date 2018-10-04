const gameElement = document.getElementById("game");
const ctx = gameElement.getContext("2d");
const empty = "WHITE"; // color of an empty square
const gray = "LIGHTGRAY"
const black = "BLACK"
const darkgray = "gray"
const playButton = document.getElementById("play-button")
const audio = document.getElementById("audio")
const sigmar = "Sigmar One"
const gameBoardSpec = {
  x: 0,
  y: 0,
  width: 10,
  height: 20,
  sq: 25,
  color: empty,
  borderColor: gray
}
const nextBoardSpec = {
  x: 22,
  y: 5,
  width: 6,
  height: 6,
  sq: 13,
  color: empty,
  borderColor: gray

}
const holdBoardSpec = {
  x: 22,
  y: 15,
  width: 6,
  height: 6,
  sq: 13,
  color: empty,
  borderColor: gray
}
const scoreBoardSpec = {
  x: 20,
  y: 25,
  width: 10,
  height: 8,
  sq: 13,
  color: 'white',
  borderColor: 'white'
}

const PIECES = [
  [Z, "#FADBD8  "],
  [S, "#F5CBA7"],
  [T, "#FFF2AE"],
  [O, "#F1948A"],
  [L, "#B9EFFE"],
  [I, "#B8FEC3"],
  [J, "#A3E4D7"]
];

// draw a square
function drawSquare(x, y, color, sq, borderColor) {
  ctx.fillStyle = color;
  ctx.fillRect(x * sq, y * sq, sq, sq);
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(x * sq, y * sq, sq, sq);
}

// create the board
const gameBoard = new Board(gameBoardSpec)
gameBoard.drawBoard();
const nextBoard = new Board(nextBoardSpec)
nextBoard.drawBoard();
ctx.font = "20px Arial";
ctx.fillStyle = "gray"
ctx.fillText("NEXT", 295, 50);
const holdBoard = new Board(holdBoardSpec)
holdBoard.drawBoard();
ctx.font = "20px Arial";
ctx.fillStyle = "gray"
ctx.fillText("HOLD", 295, 185);
const scoreBoard = new Board(scoreBoardSpec)
scoreBoard.drawBoard();
ctx.fillText("SCORE:", 265, 370);
ctx.font = "14px Arial";
ctx.fillText(`0`, 330, 370);
ctx.font = "16px Arial";
ctx.fillText("LEVEL:", 265, 395);
ctx.font = "14px Arial";
ctx.fillText(`1`, 330, 395);

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
  } else if (e.keyCode == 38 && !paused && gameStart) {
    p.rotate();
    dropStart = Date.now();
  } else if (e.keyCode == 39 && !paused && gameStart) {
    p.moveRight();
    dropStart = Date.now();
  } else if (e.keyCode == 40 && !paused && gameStart) {
    p.moveDown();
    score += 1
    scoreBoard.drawBoard()
    ctx.font = "16px Arial";
    ctx.fillStyle = darkgray
    ctx.fillText("SCORE:", 265, 370);
    ctx.font = "14px Arial";
    ctx.fillText(`${score}`, 330, 370);
    if (score > 500) {
      level = Math.floor(score / 500)
    }
    ctx.font = "16px Arial";
    ctx.fillText("LEVEL:", 265, 395);
    ctx.font = "14px Arial";
    ctx.fillText(`${level}`, 330, 395);
  } else if (e.keyCode == 32 && !paused && gameStart) {
    p.fastMoveDown();
    score += 8
    scoreBoard.drawBoard()
    ctx.font = "16px Arial";
    ctx.fillStyle = darkgray
    ctx.fillText("SCORE:", 265, 370);
    ctx.font = "14px Arial";
    ctx.fillText(`${score}`, 330, 370);
    if (score > 500) {
      level = Math.floor(score / 500)
    }
    ctx.fillText("LEVEL:", 265, 395);
    ctx.font = "14px Arial";
    ctx.fillText(`${level}`, 330, 395);
  } else if (e.keyCode == 27 && gameStart && !gameOver) {
    if (paused) {
      paused = false
      playButton.firstElementChild.remove()
      audio.play()
    } else {
      paused = true
      playButton.innerHTML = `<button type="button" value="resume">RESUME</button>`
      audio.pause()
    }
  } else if (e.keyCode == 16) {
    p.hold()
  }
});

// drop the piece every 1sec
let gameStart = false;
let dropStart = Date.now();
let gameOver = false;
let paused = false;
let score = 0;
let speed = 2500;
let level = 1;
let combo = 0;
ctx.fillStyle = darkgray
ctx.fillText("SCORE:", 265, 370);
ctx.font = "14px Arial";
ctx.fillText(`${score}`, 330, 370);
ctx.font = "16px Arial";
ctx.fillText("LEVEL:", 265, 395);
ctx.font = "14px Arial";
ctx.fillText(`${level}`, 330, 395);

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
  } else {
    scoreBoard.drawBoard()
    ctx.fillText("LEVEL:",260,395);
    ctx.font = "14px Arial";
    ctx.fillText(`${level}`,330,395);
    ctx.font = "16px Arial";
    ctx.fillText("SCORE:",260,370);
    ctx.font = "14px Arial";
    ctx.fillText(`${score}`,330,370);
    fetch('http://localhost:3000/games', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        score: score,
        userId: userObj.id
      })
    })
  }
}

document.addEventListener('click', (e) => {
  if (e.target.value === "play") {
    document.getElementById('myModal').style.display = 'block'
  } else if (e.target.value === "resume") {
    paused = false
    audio.play();
    playButton.firstElementChild.remove()
  } else if (e.target.id === 'submit') {
    e.preventDefault();
    document.getElementById('myModal').style.display = 'none'
    const userForm = document.getElementById('user-form')
    const userName = userForm.name.value
    if (!User.findByName(userName)) {
      fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: userName
          })
        }).then(res => res.json())
        .then(data => {
          console.log(new User(data))
        })
    }
    drop();
    gameStart = true;
    playButton.firstElementChild.remove()
    audio.play();
    setTimeout(() => {
      userObj = User.findByName(userName)
    }, 2)
  }
})

document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(userData => {
      userData.map(function(userObj) {
        new User(userObj)
      })
    })

  fetch('http://localhost:3000/games')
    .then(response => response.json())
    .then(gameData => {
      gameData.map(function(gameObj) {
        new Game(gameObj)
      })
    })
})
