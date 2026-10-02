class Render {
    static selectors = Object.freeze({
        buttonStartGame: "button-start",
        buttonLeaderboard: "button-leaderboard",
        timerContainer: "timer-container",
        movesContainer: "moves-container",
        matchesContainer: "matches-container",
        gameContainer: "game-container",
        buttonModalNewGame: "button-modal-new-game",
        buttonModalClose: "button-modal-close",
        buttonLeaderboardClose: "button-leaderboard-close",
    })

    static labels = {
        timer: (value) => {
            const minutes = Math.floor(value / 60)
            const seconds = value % 60
            return `Time: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        },
        moves: (value) => `Moves: ${value}`,
        matches: (value) => `Matches: ${value}`,
        newGame: "New Game",
        close: "Close",
        winTitle: "You win!",
        winMoves: (value) => `Moves: ${value}`,
        leaderboardTitle: "Leaderboard",
        leaderboardEmpty: "No results yet",
        leaderboardColumns: ["Place", "Moves", "Date"],
    }

    constructor() {
        throw new Error("Render is a static class and cannot be instantiated")
    }

    static createElementDiv(className, textContent, id) {
        const div = document.createElement("div")
        div.className = className
        if (textContent) div.textContent = textContent
        if (id) div.id = id
        return div
    }

    static createElementButton(className, textContent, id) {
        const button = document.createElement("button")
        button.type = "button"
        button.className = className
        if (textContent) button.textContent = textContent
        if (id) button.id = id
        return button
    }

    static createElementImg(className, src, alt) {
        const img = document.createElement("img")
        img.className = className
        img.src = src
        img.alt = alt || ""
        return img
    }
}

export { Render }
