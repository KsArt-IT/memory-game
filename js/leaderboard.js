class Leaderboard {
    static STORAGE_KEY = "memory-game:leaderboard"
    static MAX_RESULTS = 10

    constructor() {
        this.results = this.load()
    }

    load() {
        try {
            const data = JSON.parse(localStorage.getItem(Leaderboard.STORAGE_KEY))
            if (!Array.isArray(data)) return []
            return this.normalize(data.filter((item) => this.isValid(item)))
        } catch {
            return []
        }
    }

    isValid(item) {
        return (
            item !== null &&
            typeof item === "object" &&
            Number.isInteger(item.moves) &&
            item.moves >= 0 &&
            Number.isFinite(Date.parse(item.date))
        )
    }

    // fewer moves first, on a tie the earlier game ranks higher
    normalize(results) {
        return results
            .sort((a, b) => a.moves - b.moves || Date.parse(a.date) - Date.parse(b.date))
            .slice(0, Leaderboard.MAX_RESULTS)
    }

    save() {
        try {
            localStorage.setItem(Leaderboard.STORAGE_KEY, JSON.stringify(this.results))
        } catch {
            // storage unavailable or full: keep results in memory for this session
        }
    }

    add(moves, date = new Date()) {
        this.results = this.normalize([...this.results, { moves, date: date.toISOString() }])
        this.save()
    }

    getAll() {
        return this.results.map(({ moves, date }, index) => ({
            place: index + 1,
            moves,
            date: Leaderboard.formatDate(date),
        }))
    }

    static formatDate(isoDate) {
        const date = new Date(isoDate)
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        return `${day}.${month}.${date.getFullYear()}`
    }
}

export { Leaderboard }
