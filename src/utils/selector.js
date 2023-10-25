
export const selectMovie = (xPos) => {
    let coverWidth = (window.innerWidth * 75) / 100

    let currentPos = -(coverWidth / 2)
    let currentIndex = -1
    while (xPos > currentPos) {
        currentPos += coverWidth
        currentIndex++
    }

    return currentIndex
}

export const selectDayOrTime = (yPos) => {
    let dtHeigth = 30

    let currentPos = -(dtHeigth / 2)
    let currentIndex = -1
    while (yPos > currentPos) {
        currentPos += dtHeigth
        currentIndex++
    }

    return currentIndex
}

