import { readFile } from 'fs/promises'

function simulateWithObstruction(
  map,
  startRow,
  startCol,
  obstructionRow,
  obstructionCol
) {
  const directions = [
    { row: -1, col: 0 }, // up
    { row: 0, col: 1 }, // right
    { row: 1, col: 0 }, // down
    { row: 0, col: -1 } // left
  ]

  let row = startRow
  let col = startCol
  let direction = 0

  const visited = new Set()
  // Safety limit
  const maxSteps = map.length * map[0].length * 4
  let steps = 0

  while (steps < maxSteps) {
    // Create state key: position + direction
    const stateKey = `${row},${col},${direction}`

    // If we've seen this exact state before, it's a loop
    if (visited.has(stateKey)) {
      return true
    }
    visited.add(stateKey)

    // Get next position
    const nextRow = row + directions[direction].row
    const nextCol = col + directions[direction].col

    // Check if off grid
    if (
      nextRow < 0 ||
      nextRow >= map.length ||
      nextCol < 0 ||
      nextCol >= map[0].length
    ) {
      // Guard left the map
      return false
    }

    // Check if next position is blocked (original obstacle or new obstruction)
    const isBlocked =
      map[nextRow][nextCol] === '#' ||
      (nextRow === obstructionRow && nextCol === obstructionCol)

    if (isBlocked) {
      // Turn right
      direction = (direction + 1) % 4
    } else {
      // Move forward
      row = nextRow
      col = nextCol
    }

    steps++
  }

  return false
}

try {
  // Create map
  const rawInput = await readFile('day-06/input.txt', 'utf-8')
  const lines = rawInput.split('\n').filter((line) => line.length > 0)
  const map = []
  for (const line of lines) {
    map.push(line.split(''))
  }

  // Find starting position '^'
  let startRow, startCol
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === '^') {
        startRow = row
        startCol = col
        break
      }
    }
    if (startRow !== undefined) {
      break
    }
  }

  // Try placing obstruction at each empty position
  let answer = 0
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      // Skip if not empty or is starting position
      if (map[row][col] !== '.' || (row === startRow && col === startCol)) {
        continue
      }

      // Test if placing obstruction here creates a loop
      if (simulateWithObstruction(map, startRow, startCol, row, col)) {
        answer++
      }
    }
  }

  console.log(`Answer is: ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
