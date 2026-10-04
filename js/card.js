import { Render } from "./render.js"

class Card {
    selectors = {
        card: "card",
        cardFace: "card-face",
        cardFront: "card-front",
        cardBack: "card-back",
        flipped: "flipped",
        matched: "matched",
    }

    attributes = {
        ariaLabel: "aria-label",
        ariaHidden: "aria-hidden",
    }

    labels = {
        cardFaceDown: "Card, face down",
        cardFaceUp: (imageNumber) => `Card with picture ${imageNumber}, face up`,
        cardMatched: (imageNumber) => `Card with picture ${imageNumber}, matched`,
    }

    imagesBasePath = "assets/images/"
    static IMAGE_COUNT = 8

    constructor(value) {
        this.value = value
        this.flipped = false
        this.matched = false
    }

    render() {
        this.cardElement = this.createElement()
        this.update()
        return this.cardElement
    }

    createElement() {
        const cardElement = Render.createElementButton(this.selectors.card)

        const back = Render.createElementImg(
            `${this.selectors.cardFace} ${this.selectors.cardBack}`,
            `${this.imagesBasePath}card-back.svg`,
            "",
        )
        back.setAttribute(this.attributes.ariaHidden, "true")

        const image = (this.value % Card.IMAGE_COUNT) + 1
        this.frontElement = Render.createElementImg(
            `${this.selectors.cardFace} ${this.selectors.cardFront}`,
            `${this.imagesBasePath}card-${image}.svg`,
            "",
        )
        this.frontElement.setAttribute(this.attributes.ariaHidden, "true")

        cardElement.append(back)
        return cardElement
    }

    flip() {
        this.flipped = true
        this.update()
    }

    unflip() {
        this.flipped = false
        this.update()
    }

    match() {
        this.matched = true
        this.update()
    }

    update() {
        if (this.flipped || this.matched) {
            this.addFront()
        } else if (this.frontElement.isConnected) {
            this.cardElement.addEventListener("transitionend", () => this.removeFront(), { once: true })
        }

        this.cardElement.classList.remove(this.selectors.flipped, this.selectors.matched)
        if (this.flipped) {
            this.cardElement.classList.add(this.selectors.flipped)
        }
        if (this.matched) {
            this.cardElement.classList.add(this.selectors.matched)
        }

        this.updateAccessibility()
    }

    addFront() {
        if (this.frontElement.isConnected) return
        this.cardElement.append(this.frontElement)

        void this.cardElement.offsetWidth
    }

    removeFront() {
        if (this.flipped || this.matched) return
        this.frontElement.remove()
    }

    updateAccessibility() {
        const image = (this.value % Card.IMAGE_COUNT) + 1
        let label = this.labels.cardFaceDown
        if (this.matched) {
            label = this.labels.cardMatched(image)
        } else if (this.flipped) {
            label = this.labels.cardFaceUp(image)
        }
        this.cardElement.setAttribute(this.attributes.ariaLabel, label)
        this.cardElement.disabled = this.matched
    }

    static createCards(count) {
        const cards = []
        for (let i = 1; i <= count; i++) {
            cards.push(new Card(i))
            cards.push(new Card(i))
        }
        return cards
    }
}

export { Card }
