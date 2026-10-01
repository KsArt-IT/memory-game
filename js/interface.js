import { Render } from "./render.js"

class Interface {
    selectors = {
        header: "header",
        main: "main",
        footer: "footer",
    }

    classes = {
        header: "header",
        footer: "footer",
        buttons: "header-buttons-wrapper",
        button: "header-button",
        gameInfoContainer: "game-info-container",
        gameInfo: "game-info",
    }

    constructor() {}

    render() {
        const header = this.createHeader()
        document.body.appendChild(header)

        const gameContainer = this.createGameContainer()
        document.body.appendChild(gameContainer)

        const footer = this.createFooter()
        document.body.appendChild(footer)
    }

    createHeader() {
        const header = document.createElement(this.selectors.header)
        header.className = this.classes.header

        const buttons = this.createButtons()
        header.appendChild(buttons)

        const gameInfo = this.createGameInfo()
        header.appendChild(gameInfo)

        return header
    }

    createButtons() {
        const buttonsContainer = Render.createElementDiv(this.classes.buttons)

        const buttonStart = Render.createElementButton(
            this.classes.button,
            "New Game",
            Render.selectors.buttonStartGame,
        )
        buttonsContainer.appendChild(buttonStart)

        const buttonLeaderboard = Render.createElementButton(
            this.classes.button,
            "Leaderboard",
            Render.selectors.buttonLeaderboard,
        )
        buttonLeaderboard.addEventListener("click", () => this.openLeaderboard())
        buttonsContainer.appendChild(buttonLeaderboard)

        return buttonsContainer
    }

    createGameInfo() {
        const gameInfoContainer = Render.createElementDiv(this.classes.gameInfoContainer)

        const timerContainer = Render.createElementDiv(
            this.classes.gameInfo,
            "Time: --:--",
            Render.selectors.timerContainer,
        )
        gameInfoContainer.appendChild(timerContainer)

        const movesContainer = Render.createElementDiv(
            this.classes.gameInfo,
            "Moves: --",
            Render.selectors.movesContainer,
        )
        gameInfoContainer.appendChild(movesContainer)

        const matchesContainer = Render.createElementDiv(
            this.classes.gameInfo,
            "Matches: --",
            Render.selectors.matchesContainer,
        )
        gameInfoContainer.appendChild(matchesContainer)

        return gameInfoContainer
    }

    createGameContainer() {
        const main = document.createElement(this.selectors.main)
        main.className = Render.selectors.gameContainer
        return main
    }

    createFooter() {
        const footer = document.createElement(this.selectors.footer)
        footer.className = this.classes.footer
        return footer
    }

    openLeaderboard() {
        console.log("openLeaderboard")
    }
}

export { Interface }
