import { Modal } from "./modal.js"
import { Render } from "./render.js"

class LeaderboardModal {
    classes = {
        title: "modal-title",
        text: "modal-text",
        table: "leaderboard-table",
        buttons: "modal-buttons",
        button: "modal-button",
    }

    constructor(leaderboard) {
        this.leaderboard = leaderboard
        this.modal = new Modal()
    }

    open() {
        this.modal.open(...this.createContent())
    }

    close() {
        this.modal.close()
    }

    createContent() {
        const results = this.leaderboard.getAll()
        return [
            this.createTitle(),
            results.length ? this.createTable(results) : this.createEmptyMessage(),
            this.createButtons(),
        ]
    }

    createTitle() {
        const title = document.createElement("h2")
        title.className = this.classes.title
        title.textContent = Render.labels.leaderboardTitle
        return title
    }

    createEmptyMessage() {
        return Render.createElementDiv(this.classes.text, Render.labels.leaderboardEmpty)
    }

    createTable(results) {
        const table = document.createElement("table")
        table.className = this.classes.table

        const thead = document.createElement("thead")
        const head = document.createElement("tr")
        for (const label of Render.labels.leaderboardColumns) {
            const th = document.createElement("th")
            th.scope = "col"
            th.textContent = label
            head.appendChild(th)
        }
        thead.appendChild(head)

        const tbody = document.createElement("tbody")
        for (const { place, moves, date } of results) {
            const row = document.createElement("tr")
            for (const value of [place, moves, date]) {
                const td = document.createElement("td")
                td.textContent = value
                row.appendChild(td)
            }
            tbody.appendChild(row)
        }
        table.append(thead, tbody)
        return table
    }

    createButtons() {
        const buttons = Render.createElementDiv(this.classes.buttons)
        const buttonClose = Render.createElementButton(
            this.classes.button,
            Render.labels.close,
            Render.selectors.buttonLeaderboardClose,
        )
        buttonClose.addEventListener("click", () => this.close())
        buttons.appendChild(buttonClose)
        return buttons
    }
}

export { LeaderboardModal }
