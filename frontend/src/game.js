// const Game = (() =>{
const allGames = []

class Game {
  constructor({
    id,
    score,
    user
  }) {
    this.id = id
    this.score = score
    this.user = user
    allGames.push(this)
  }

  static getHighScores(){
    const sortedGames = allGames.sort((a,b) => b.score - a.score)
    return sortedGames.slice(0,5)
  }
}
// })()
