class Piece {
  constructor(matrices, color, sq) {
    this.matrices = matrices;
    this.color = color;
    this.sq = sq
    this.pattern = 0;
    this.activePattern = this.matrices[this.pattern];
    this.x = 3;
    this.y = -2;
  }

  draw(){
    for(let r = 0; r < this.activePattern.length; r++){
        for(let c = 0; c < this.activePattern.length; c++){
            if( this.activePattern[r][c]){
                drawSquare(this.x + c,this.y + r, this.color,this.sq,gray);
            }
        }
    }
  }

  // undraw a piece
  undraw(){
    for(let r = 0; r < this.activePattern.length; r++){
        for(let c = 0; c < this.activePattern.length; c++){
            if( this.activePattern[r][c]){
                drawSquare(this.x + c,this.y + r, empty,this.sq,gray);
            }
        }
    }
  }

  collision(x, y, piece) {
    for (let j = 0; j < piece.length; j++) {
      for (let i = 0; i < piece.length; i++) {
        // if the square is empty, we skip it
        if (!piece[j][i]) {
          continue;
        }
        // coordinates of the piece after movement
        let newX = this.x + i + x;
        let newY = this.y + j + y;

        // conditions
        if (newX < 0 || newX >= gameBoard.width || newY >= gameBoard.height) {
          return true;
        }
        // skip newY < 0; board[-1] will crush our game
        if (newY < 0) {
          continue;
        }
        // check if there is a locked piece alrady in place
        if (gameBoard.board[newY][newX] != empty) {
          return true;
        }
      }
    }
    return false;
  }


  moveDown() {
    if (!this.collision(0, 1, this.activePattern)) {
      this.undraw()
      this.y++
      this.draw()
    } else {
      this.lock();
      p = nextPiece
      nextPiece = randomPiece()
    }
  }

  moveRight() {
    if (!this.collision(1, 0, this.activePattern)) {
      this.undraw()
      this.x++
      this.draw()
    }
    this.moveDown()
  }

  moveLeft() {
    if (!this.collision(-1, 0, this.activePattern)) {
      this.undraw()
      this.x--
      this.draw()
    }
    this.moveDown()
  }

  //rotate
  rotate() {
    let nextPattern = this.matrices[(this.pattern + 1) % this.matrices.length];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) {
      if (this.x > gameBoard.width / 2) {
        // it's the right wall
        kick = -1; // we need to move the piece to the left
      } else {
        // it's the left wall
        kick = 1; // we need to move the piece to the right
      }
    }

    if (!this.collision(kick, 0, nextPattern)) {
      this.undraw()
      this.x += kick;
      this.pattern = (this.pattern + 1) % this.matrices.length; // (0+1)%4 => 1
      this.activePattern = this.matrices[this.pattern];
      this.draw();
    }
    this.moveDown()
  }

  fastMoveDown(n) {
    while (!this.collision(0, 1, this.activePattern)) {
      this.undraw()
      this.y++
      this.draw()
    }
    this.lock();
    p = nextPiece
    nextPiece = randomPiece()
  }

  hold(){
    if(!holdPiece){
      holdBoard.drawBoard()
      holdPiece = p
      p = nextPiece
      nextPiece = randomPiece()
      gameBoard.drawBoard();
      holdBoard.drawPiece(holdPiece)
    }else{
      p = [holdPiece, holdPiece = p][0];
      holdBoard.drawBoard()
      holdBoard.drawPiece(holdPiece)
      gameBoard.drawBoard();
    }
  }

  lock() {
    for(let j = 0; j < this.activePattern.length; j++){
        for(let i = 0; i < this.activePattern.length; i++){
            // we skip the vacant squares
            if( !this.activePattern[j][i]){
                continue;
            }
            // pieces to lock on top = game over
            if(this.y + j < 0){
                alert("Game Over");
                // stop request animation frame
                gameOver = true;
                break;
            }
            // we lock the piece
            gameBoard.board[this.y+j][this.x+i] = this.color;
        }
    }
    // remove full rows
    for(let j = 0; j < gameBoard.height; j++){
        let isRowFull = true;
        for(let i = 0; i < gameBoard.width; i++){
            isRowFull = isRowFull && (gameBoard.board[j][i] != empty);
        }
        if(isRowFull){
            // if the row is full
            // we move down all the rows above it
            for(let y = j; y > 1; y--){
                for(let i = 0; i < gameBoard.width; i++){
                    gameBoard.board[y][i] = gameBoard.board[y-1][i];
                }
            }
            // the top row board[0][..] has no row above it
            for(let i = 0; i < gameBoard.width; i++){
                gameBoard.board[0][i] = empty;
            }
            // increment the score
            combo += 1
        }
    }

    // update the board
    if(combo==1){
      score += level*100
    }else if(combo==2){
      score += level*300;
    }else if(combo==3){
      score += level*500
    }else if(combo==4){
      score += level*800
    }
    combo = 0;
    if(score > 500){
      level = Math.floor(score/500)+1
    }
    ctx.fillStyle=darkgray
    ctx.fillText("LEVEL:",260,395);
    ctx.fillText(`${level}`,350,395);
    scoreBoard.drawBoard()
    ctx.fillText("SCORE:",260,370);
    ctx.fillText(`${score}`,350,370);
    gameBoard.drawBoard();
    nextBoard.drawBoard();
  }

}
