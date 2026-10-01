import { Game } from "./game.js"
import { Interface } from "./interface.js"

const menu = new Interface()
menu.render()

const game = new Game()
game.startGame()
