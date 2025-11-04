import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-04/input.txt', 'utf-8')
  const items = rawInput.split('\n')

  // Create 2d array
  const puzzle = []
  for (const item of items) {
    puzzle.push(item.split(''))
  }

  let answer = 0
  // Util function to find XMAS
  function findXmas({ row, col, incRow, incCol, decRow, decCol }) {
    const letters = ['M', 'A', 'S']
    let increaseAnswer = true

    for (const letter of letters) {
      // Move to proper x, y
      if (incCol) col++
      if (incRow) row++
      if (decCol) col--
      if (decRow) row--

      // Exit if out of bounds
      if (
        col >= puzzle[0].length ||
        row >= puzzle.length ||
        row < 0 ||
        col < 0
      ) {
        increaseAnswer = false
        break
      }

      // Exit if next letter does not match
      if (puzzle[row][col] !== letter) {
        increaseAnswer = false
        break
      }
    }

    if (increaseAnswer) {
      answer++
    }
  }
  // Loop through all rows/cols looking for 'X'
  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[0].length; col++) {
      const current = puzzle[row][col]

      if (current === 'X') {
        // Look in all directions for 'XMAS'
        // right
        findXmas({ row, col, incCol: true })
        // right down
        findXmas({ row, col, incRow: true, incCol: true })
        // down
        findXmas({ row, col, incRow: true })
        // left down
        findXmas({ row, col, decCol: true, incRow: true })
        // left
        findXmas({ row, col, decCol: true })
        // left up
        findXmas({ row, col, decCol: true, decRow: true })
        // up
        findXmas({ row, col, decRow: true })
        // right up
        findXmas({ row, col, decRow: true, incCol: true })
      }
    }
  }
  // 2447
  console.log(`Answer is: ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
