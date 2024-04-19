export default {
    jump: new KeyboardEvent('keydown', {key: 'space', keyCode: 32}),
    crouch: new KeyboardEvent('keydown', {key: 'ArrowDown', keyCode: 40}),
    dispatchEvent(event) {
        document.dispatchEvent(this[event]);
    }
}