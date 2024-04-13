export default {
    jump: new KeyboardEvent('keydown', {key: 'space', keyCode: 32}),
    dispatchEvent(event) {
        document.dispatchEvent(this[event]);
    }
}