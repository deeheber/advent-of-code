import { readFile } from 'fs/promises'

try {
  // Format input
  const rawInput = await readFile('day-04/input.txt', 'utf-8')
  const lines = rawInput.split('\n')

  const grid = []
  for (const line of lines) {
    grid.push(line.split(''))
  }

  let answer = 0
  let removed = false
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]
  do {
    removed = false

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] === '@') {
          let numAdjPaperRolls = 0
          neighbors.forEach(([deltaX, deltaY]) => {
            const candidateX = deltaX + row
            const candidateY = deltaY + col

            if (
              candidateX < grid.length &&
              candidateX >= 0 &&
              candidateY < grid[0].length &&
              candidateY >= 0
            ) {
              // It's on the grid
              if (grid[candidateX][candidateY] === '@') {
                numAdjPaperRolls += 1
              }
            }
          })

          if (numAdjPaperRolls < 4) {
            answer += 1
            grid[row][col] = 'x'
            removed = true
          }
        }
      }
    }
  } while (removed === true)

  // 8277
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
