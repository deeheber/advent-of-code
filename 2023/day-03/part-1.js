import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-03/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  let answer = 0

  function analyzeNeighbors(coords) {
    let hasSymbol = false
    const { x: row, y: col } = coords

    const directions = [
      { x: -1, y: 0 }, // top
      { x: 1, y: 0 }, // bottom
      { x: 0, y: -1 }, // left
      { x: 0, y: 1 }, // right
      { x: -1, y: -1 }, // top left
      { x: -1, y: 1 }, // top right
      { x: 1, y: -1 }, // bottom left
      { x: 1, y: 1 } // bottom right
    ]

    for (const { x, y } of directions) {
      const newX = row + x
      const newY = col + y

      // if the value exists on the 2D array
      if (
        newX >= 0 &&
        newX < lines.length &&
        newY >= 0 &&
        newY < lines[0].length
      ) {
        // if it doesn't equal '.' or a digit
        if (lines[newX][newY] !== '.' && isNaN(lines[newX][newY])) {
          hasSymbol = true
          break
        }
      }
    }

    return hasSymbol
  }

  for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[x].length; ) {
      let currentNumber = ''
      let coords = []

      while (!isNaN(lines[x][y])) {
        coords.push({ x, y })
        currentNumber += lines[x][y]
        y++
      }

      if (!coords.length) {
        // Not a number, continue
        y++
      } else {
        for (const coord of coords) {
          const hasSymbolNeighbor = analyzeNeighbors(coord)
          if (hasSymbolNeighbor) {
            answer += Number(currentNumber)
            break
          }
        }
      }
    }
  }

  console.log(`Answer is: ${answer}`)
  // 527446
} catch (err) {
  console.error(`There was an error: ${err}`)
}
