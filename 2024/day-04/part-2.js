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
  // Util function to find X-MAS
  function findXmas(row, col) {
    // make sure it's in the grid
    if (
      row - 1 < 0 ||
      row + 1 >= puzzle.length ||
      col - 1 < 0 ||
      col + 1 >= puzzle[0].length
    ) {
      return false
    }

    // get diagonal positions
    const topLeft = puzzle[row - 1][col - 1]
    const topRight = puzzle[row - 1][col + 1]
    const bottomRight = puzzle[row + 1][col + 1]
    const bottomLeft = puzzle[row + 1][col - 1]

    const diagonal1Valid =
      (topLeft === 'M' && bottomRight === 'S') ||
      (topLeft === 'S' && bottomRight === 'M')

    const diagonal2Valid =
      (topRight === 'M' && bottomLeft === 'S') ||
      (topRight === 'S' && bottomLeft === 'M')

    if (diagonal1Valid && diagonal2Valid) {
      answer++
    }
  }
  // Loop through all rows/cols looking for 'A'
  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[0].length; col++) {
      const current = puzzle[row][col]

      if (current === 'A') {
        // Search for MAS in an X shape
        findXmas(row, col)
      }
    }
  }
  // 1868
  console.log(`Answer is: ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
