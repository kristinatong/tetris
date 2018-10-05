const gameElement = document.getElementById("game");
const ctx = gameElement.getContext("2d");
const empty = "WHITE"; // color of an empty square
const gray = "LIGHTGRAY"
const black = "BLACK"
const darkgray = "gray"
const playButton = document.getElementById("play-button")
const audio = document.getElementById("audio")
const sadTrombone = document.getElementById('sad-trombone')
const sigmar = "Sigmar One"

const gameBoardSpec = {
  x: 0,
  y: 0,
  width: 10,
  height: 20,
  sq: 25,
  color: empty,
  borderColor: "#F5F5F5"
}
const nextBoardSpec = {
  x: 22,
  y: 5,
  width: 6,
  height: 6,
  sq: 13,
  color: empty,
  borderColor: '#F5F5F5'
}
const holdBoardSpec = {
  x: 22,
  y: 15,
  width: 6,
  height: 6,
  sq: 13,
  color: empty,
  borderColor: '#F5F5F5'
}
const scoreBoardSpec = {
  x: 20,
  y: 26,
  width: 10,
  height: 6,
  sq: 13,
  color: 'white',
  borderColor: '#F5F5F5'
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

function drawSquare(x, y, color, sq, borderColor) {
  ctx.fillStyle = color;
  ctx.fillRect(x * sq, y * sq, sq, sq);
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(x * sq, y * sq, sq, sq);
}

const gameBoard = new Board(gameBoardSpec)
gameBoard.drawBoard();
const nextBoard = new Board(nextBoardSpec)
nextBoard.drawBoard()
const holdBoard = new Board(holdBoardSpec)
holdBoard.drawBoard();
const scoreBoard = new Board(scoreBoardSpec)

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
    if (score > 500) {
      level = Math.floor(score / 1000) + 1
    }
    scoreBoard.getScore(score, level)
  } else if (e.keyCode == 32 && !paused && gameStart) {
    p.fastMoveDown();
    score += 8
    if (score > 500) {
      level = Math.floor(score / 1000) + 1
    }
    scoreBoard.getScore(score, level)
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


let gameStart = false;
let dropStart = Date.now();
let gameOver = false;
let paused = false;
let score = 0;
let speed = 2500;
let level = 1;
let combo = 0;
setTimeout(() => {
  scoreBoard.getScore(score, level)
  ctx.font = "20px Sigmar One";
  ctx.fillStyle = "gray"
  ctx.fillText("NEXT", 292, 57);
  ctx.fillText("HOLD", 292, 185);
}, 100)


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
    scoreBoard.getScore(score, level)
    fetch('http://localhost:3000/games', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        score: score,
        user: userObj
      })
    }).then(res => res.json()).then(data => new Game(data))
  }
}

document.addEventListener('click', (e) => {
  if (e.target.value === "play") {
    const highScores = document.getElementById('high-scores')
    const sortedArray = Game.getHighScores()
    sortedArray.forEach(game => {
      highScores.innerHTML += `<tr><td>${sortedArray.indexOf(game)+1}</td><td>${game.user.name}</td><td>${game.score}</td></tr>`
    })
    document.getElementById('myModal').style.display = 'block'
  } else if (e.target.value === "resume") {
    paused = false
    audio.play();
    playButton.firstElementChild.remove()
  } else if (e.target.id === 'submit') {
    e.preventDefault();
    document.getElementById('myModal').style.display = 'none'
    const userName = document.getElementById('user-form').name.value
    if (userName !== "") {
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
            new User(data)
          })
      }
      setTimeout(() => {
        userObj = User.findByName(userName)
      }, 100)
      drop();
      gameStart = true;
      playButton.firstElementChild.remove()
      audio.play();
    } else {
      alert("Please enter a name");
    }
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
