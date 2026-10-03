import { Card } from "./card.js"
import { Render } from "./render.js"
import { WinModal } from "./win-modal.js"

class Game {
    static MAX_SHUFFLE_ATTEMPTS = 100

    constructor(leaderboard, difficulty = 8) {
        this.leaderboard = leaderboard
        this.difficulty = Math.max(1, difficulty)
        this.winModal = new WinModal({ onNewGame: () => this.startGame() })
        this.initVariables()
        this.bind()
    }

    initVariables() {
        this.stopTimer()
        this.stopTimeout()
        this.cards = []
        this.firstCard = null
        this.matches = 0
        this.moves = 0
        this.timer = 0
        this.block = false
    }

    bind() {
        this.gameContainer = document.querySelector(`.${Render.selectors.gameContainer}`)
        this.timerContainer = document.getElementById(Render.selectors.timerContainer)
        this.movesContainer = document.getElementById(Render.selectors.movesContainer)
        this.matchesContainer = document.getElementById(Render.selectors.matchesContainer)
        this.buttonStartGame = document.getElementById(Render.selectors.buttonStartGame)

        const requiredElements = [
            this.gameContainer,
            this.timerContainer,
            this.movesContainer,
            this.matchesContainer,
            this.buttonStartGame,
        ]
        this.isReady = requiredElements.every((el) => el)
        if (!this.isReady) return

        this.buttonStartGame.addEventListener("click", () => this.startGame())
        new ResizeObserver(() => this.fitGrid()).observe(this.gameContainer)
    }

    startGame() {
        if (!this.isReady) return
        this.winModal.close()
        this.initVariables()
        this.updateStats()
        this.cards = Card.createCards(this.difficulty)
        this.shuffleCards(this.fitGrid())
        this.renderCards()
        this.startTimer()
    }

    updateStats() {
        this.timerContainer.textContent = Render.labels.timer(this.timer)
        this.movesContainer.textContent = Render.labels.moves(this.moves)
        this.matchesContainer.textContent = Render.labels.matches(this.matches)
    }

    shuffleCards(columns = 1) {
        for (let attempt = 0; attempt < Game.MAX_SHUFFLE_ATTEMPTS; attempt++) {
            for (let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
            }
            if (!this.hasAdjacentPairs(columns)) return
        }
    }

    hasAdjacentPairs(columns) {
        return this.cards.some((card, i) => {
            const left = i % columns !== 0 && this.cards[i - 1]
            const top = i >= columns && this.cards[i - columns]
            return card.value === left?.value || card.value === top?.value
        })
    }

    fitGrid() {
        const count = this.cards.length
        if (!count) return 1

        const style = getComputedStyle(this.gameContainer)
        const gap = parseFloat(style.columnGap) || 0
        const width = this.gameContainer.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
        const height = this.gameContainer.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)

        const sizeFor = (columns) => {
            const rows = Math.ceil(count / columns)
            return Math.min((width - gap * (columns - 1)) / columns, (height - gap * (rows - 1)) / rows)
        }

        let best = { columns: 1, size: 0 }
        const side = Math.sqrt(count)
        if (Number.isInteger(side)) {
            best = { columns: side, size: sizeFor(side) }
        } else {
            for (let columns = 1; columns <= count; columns++) {
                const size = sizeFor(columns)
                if (size > best.size) best = { columns, size }
            }
        }

        this.columns = best.columns
        this.gameContainer.style.setProperty("--columns", best.columns)
        this.gameContainer.style.setProperty("--card-size", `${Math.max(0, Math.floor(best.size))}px`)
        return best.columns
    }

    renderCards() {
        const cards = this.cards.map((card, index) => {
            const cardElement = card.render()
            cardElement.dataset.index = index
            cardElement.addEventListener("click", () => this.flipCard(index))
            return cardElement
        })
        this.gameContainer.replaceChildren(...cards)
    }

    flipCard(index) {
        if (this.block) return

        const card = this.cards[index]
        if (!card || card.flipped || card.matched) return

        card.flip()

        if (this.firstCard === null) {
            this.firstCard = index
            return
        }

        this.block = true
        this.checkMatch(index)
    }

    checkMatch(index) {
        this.moves++

        const [card1, card2] = [this.cards[this.firstCard], this.cards[index]]
        if (card1.value === card2.value) {
            card1.match()
            card2.match()
            this.matches++
            this.updateStats()
            this.unblock()
            if (this.matches === this.difficulty) {
                this.endGame()
            }
        } else {
            this.updateStats()
            this.timeoutID = setTimeout(() => {
                this.timeoutID = null
                card1.unflip()
                card2.unflip()
                this.unblock()
            }, 1000)
        }
    }

    unblock() {
        this.firstCard = null
        this.block = false
    }

    startTimer() {
        this.timer = 0
        this.interval = setInterval(() => {
            this.timer++
            this.timerContainer.textContent = Render.labels.timer(this.timer)
        }, 1000)
    }

    endGame() {
        this.stopTimer()
        this.block = true
        this.leaderboard.add(this.moves)
        this.winModal.open(this.moves)
    }

    stopTimer() {
        clearInterval(this.interval)
        this.interval = null
    }

    stopTimeout() {
        clearTimeout(this.timeoutID)
        this.timeoutID = null
    }
}

export { Game }
