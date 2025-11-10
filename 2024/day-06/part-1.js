import { readFile } from 'fs/promises'

try {
  // Create map
  const rawInput = await readFile('day-06/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  const map = []
  for (const line of lines) {
    map.push(line.split(''))
  }

  const current = {}
  let direction = 0
  const directions = [
    { row: -1, col: 0 }, // up
    { row: 0, col: 1 }, // right
    { row: 1, col: 0 }, // down
    { row: 0, col: -1 } // left
  ]
  // Find starting position '^'
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === '^') {
        current.row = row
        current.col = col
        break
      }
    }
    if (current.row && current.col) {
      break
    }
  }

  map[current.row][current.col] = 'X'

  let counter = 0
  while (true) {
    // Get next step
    const nextRow = current.row + directions[direction].row
    const nextCol = current.col + directions[direction].col

    // Check if off grid
    if (
      nextRow < 0 ||
      nextRow >= map.length ||
      nextCol < 0 ||
      nextCol >= map[0].length
    ) {
      break
    }

    // Get next value
    const stepVal = map[nextRow][nextCol]

    // Check if open
    if (stepVal === '.' || stepVal === 'X') {
      // Mark as visited
      map[nextRow][nextCol] = 'X'
      // Take step
      current.row = nextRow
      current.col = nextCol
    } else if (stepVal === '#') {
      // Blocked - turn right
      direction += 1
      if (direction > directions.length - 1) {
        // Move back to starting (up) position
        direction = 0
      }
    } else {
      // Invalid value
      throw new Error('Invalid value in map')
    }
    counter++
  }
  // Debugging
  // const printGrid = (grid) =>
  //   console.log('\n' + grid.map((row) => row.join('')).join('\n') + '\n')
  // printGrid(map)

  // Count
  let answer = 0
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === 'X') {
        answer += 1
      }
    }
  }
  // 4663
  console.log(`Answer is: ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
