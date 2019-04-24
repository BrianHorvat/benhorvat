const states = Object.freeze({
    IDLE: 1,
    ENTER: 2,
    LEAVE: 3,
    ANIMATING: 4,
    DRAGGING: 5,
})

const animTypes = Object.freeze({
    PAGE_RESET: 1,
    PAGE_LEFT: 2,
    PAGE_RIGHT: 3,
})

const durations = Object.freeze({
    enter: 300,
    exit: 300,
    page: 300,
    pagePartial: 150,
})

const easing = 'cubic-bezier(0.4, 0.0, 0.2, 1)'

function matrixToString(matrix) {
    const matrixRegex = /^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i

    let parsed = matrix.match(matrixRegex)

    return {
        a: parseFloat(parsed[1]),
        b: parseFloat(parsed[2]),
        c: parseFloat(parsed[3]),
        d: parseFloat(parsed[4]),
        e: parseFloat(parsed[5]),
        f: parseFloat(parsed[6])
    }
}
export {
    states,
    animTypes,
    durations,
    easing,
    matrixToString
}