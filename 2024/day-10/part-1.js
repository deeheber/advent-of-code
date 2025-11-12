import { readFile } from 'fs/promises'

try {
  // Parse input
  const rawInput = await readFile('day-10/input.txt', 'utf-8')
  const items = rawInput.split('\n')
  const map = []
  for (const item of items) {
    map.push(item.split('').map((num) => Number(num)))
  }

  const trailScores = []
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      const value = map[row][col]
      // Found a "trailhead"
      if (value === 0) {
        const endsReached = new Set()
        const stack = []
        stack.push({ row, col, value })

        while (stack.length) {
          // Take item off the top of the stack
          const { row, col, value } = stack.pop()
          // Check if we reach the end
          if (value === 9) {
            endsReached.add(`${row}#${col}`)
            continue
          }
          // Continue down the trail if end not reached
          const targetValue = value + 1
          // Look up, down, left, right
          // row, col
          const directions = [
            [-1, 0], // up
            [1, 0], // down
            [0, -1], // left
            [0, 1] // right
          ]
          for (let [moveRow, moveCol] of directions) {
            const currRow = moveRow + row
            const currCol = moveCol + col
            // Make sure it is on the map
            if (
              currRow >= 0 &&
              currCol >= 0 &&
              currRow < map.length &&
              currCol < map[0].length
            ) {
              if (map[currRow][currCol] === targetValue) {
                // Target value found: push on stack
                stack.push({ row: currRow, col: currCol, value: targetValue })
              }
            }
          }
        }
        trailScores.push(endsReached.size)
      }
    }
  }

  // Add up all trail scores
  const total = trailScores.reduce((total, score) => (total += score), 0)
  // 674
  console.log(`Answer is ${total}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
