class Board {
  constructor({
    x,
    y,
    width,
    height,
    sq,
    color,
    borderColor, text
  }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.sq = sq
    this.color = color
    this.borderColor = borderColor
    this.board = []
    for (let j = this.y; j < this.y+this.height; j++) {
      this.board[j] = [];
      for (let i = this.x; i < this.x+this.width; i++) {
        this.board[j][i] = this.color;
      }
    }
    
  }

  drawBoard() {
    for (let j = this.y; j < this.y+this.height; j++) {
      for (let i = this.x; i < this.x+this.width; i++) {
        drawSquare(i, j, this.board[j][i], this.sq)
      }
    }
  }

  drawPiece(piece) {
    piece.x = this.x+3.5
    piece.y = this.y+2.3
    piece.sq = 12
    piece.draw()
    piece.x = 3
    piece.y = -2
    piece.sq = 25
  }

}
