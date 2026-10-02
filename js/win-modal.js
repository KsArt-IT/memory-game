import { Modal } from "./modal.js"
import { Render } from "./render.js"

class WinModal {
    classes = {
        title: "modal-title",
        text: "modal-text",
        buttons: "modal-buttons",
        button: "modal-button",
    }

    constructor({ onNewGame } = {}) {
        this.onNewGame = onNewGame
        this.modal = new Modal()
    }

    open(moves) {
        this.modal.open(this.createContent(moves))
    }

    close() {
        this.modal.close()
    }

    createContent(moves) {
        const fragment = document.createDocumentFragment()
        fragment.append(
            this.createTitle(),
            Render.createElementDiv(this.classes.text, Render.labels.winMoves(moves)),
            this.createButtons(),
        )
        return fragment
    }

    createTitle() {
        const title = document.createElement("h2")
        title.className = this.classes.title
        title.textContent = Render.labels.winTitle
        return title
    }

    createButtons() {
        const buttons = Render.createElementDiv(this.classes.buttons)

        const buttonNewGame = Render.createElementButton(
            this.classes.button,
            Render.labels.newGame,
            Render.selectors.buttonModalNewGame,
        )
        buttonNewGame.addEventListener("click", () => {
            this.close()
            this.onNewGame?.()
        })

        const buttonClose = Render.createElementButton(
            this.classes.button,
            Render.labels.close,
            Render.selectors.buttonModalClose,
        )
        buttonClose.addEventListener("click", () => this.close())

        buttons.append(buttonNewGame, buttonClose)
        return buttons
    }
}

export { WinModal }
