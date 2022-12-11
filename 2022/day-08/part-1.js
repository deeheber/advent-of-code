import { readFile } from 'fs/promises'

try {
  const input = await readFile('day-08/input.txt', 'utf-8')
  const grid = input.split('\n').map((line) => [...line].map(Number))

  const visible = new Set()

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      // Check left / right
      // left y - 1
      if (col - 1 < 0) {
        // Edge
        visible.add(`${row}-${col}`)
      } else {
        // Check left
        let moveLeft = col
        while (true) {
          moveLeft--

          if (moveLeft < 0) {
            // Edge
            visible.add(`${row}-${col}`)
            break
          }

          if (grid[row][moveLeft] >= grid[row][col]) {
            // Not visible
            break
          }
        }
      }

      // right y + 1
      if (col + 1 >= grid.length) {
        //Edge
        visible.add(`${row}-${col}`)
      } else {
        // check right
        let moveRight = col
        while (true) {
          moveRight++
          if (moveRight >= grid.length) {
            // Edge
            visible.add(`${row}-${col}`)
            break
          }
          if (grid[row][moveRight] >= grid[row][col]) {
            // Not visible
            break
          }
        }
      }

      // Check up / down
      // up x - 1
      if (row - 1 < 0) {
        visible.add(`${row}-${col}`)
      } else {
        // check up
        let moveUp = row
        while (true) {
          moveUp--

          if (moveUp < 0) {
            // Edge
            visible.add(`${row}-${col}`)
            break
          }

          if (grid[moveUp][col] >= grid[row][col]) {
            // Not visible
            break
          }
        }
      }

      // down x + 1
      if (row + 1 >= grid[0].length) {
        visible.add(`${row}-${col}`)
      } else {
        // check down
        let moveDown = row
        while (true) {
          moveDown++

          if (moveDown >= grid[0].length) {
            // Edge
            visible.add(`${row}-${col}`)
            break
          }

          if (grid[moveDown][col] >= grid[row][col]) {
            // Not visible
            break
          }
        }
      }
    }
  }
  // 1870
  console.log(`Answer is ${visible.size}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
