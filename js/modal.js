import { Render } from "./render.js"

class Modal {
    classes = {
        dialog: "modal",
        content: "modal-content",
        noScroll: "no-scroll",
    }

    constructor({ onClose } = {}) {
        this.onClose = onClose
        this.previousFocus = null
        this.dialog = this.createDialog()
    }

    createDialog() {
        const dialog = document.createElement("dialog")
        dialog.className = this.classes.dialog
        this.content = Render.createElementDiv(this.classes.content)
        dialog.appendChild(this.content)

        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) this.close()
        })

        dialog.addEventListener("close", () => this.handleClose())

        document.body.appendChild(dialog)
        return dialog
    }

    get isOpen() {
        return this.dialog.open
    }

    open(...nodes) {
        if (this.isOpen) return
        this.previousFocus = document.activeElement
        this.content.replaceChildren(...nodes)
        document.body.classList.add(this.classes.noScroll)
        this.dialog.showModal()
    }

    close() {
        if (!this.isOpen) return
        this.dialog.close()
    }

    handleClose() {
        document.body.classList.remove(this.classes.noScroll)
        this.content.replaceChildren()
        this.previousFocus?.focus?.()
        this.previousFocus = null
        this.onClose?.()
    }
}

export { Modal }
