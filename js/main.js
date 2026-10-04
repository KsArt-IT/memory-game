import { Game } from "./game.js"
import { Interface } from "./interface.js"
import { Leaderboard } from "./leaderboard.js"

const leaderboard = new Leaderboard()

const menu = new Interface(leaderboard)
menu.render()

const game = new Game(leaderboard)
game.startGame()
