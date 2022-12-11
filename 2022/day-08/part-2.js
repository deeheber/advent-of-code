import { readFile } from 'fs/promises'

try {
  const input = await readFile('day-08/input.txt', 'utf-8')
  const grid = input.split('\n').map((line) => [...line].map(Number))
  let maxScenicScore = 0

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const viewingDistances = []
      // Check left / right
      // left y - 1
      if (col - 1 < 0) {
        // Edge
        viewingDistances.push(0)
      } else {
        // Check left
        let moveLeft = col
        let counter = 1
        while (true) {
          moveLeft--

          if (moveLeft < 0) {
            // Edge
            viewingDistances.push(counter - 1)
            break
          }

          if (grid[row][moveLeft] >= grid[row][col]) {
            viewingDistances.push(counter)
            break
          }

          counter++
        }
      }

      // right y + 1
      if (col + 1 >= grid.length) {
        //Edge
        viewingDistances.push(0)
      } else {
        // check right
        let moveRight = col
        let counter = 1
        while (true) {
          moveRight++
          if (moveRight >= grid.length) {
            // Edge
            viewingDistances.push(counter - 1)
            break
          }
          if (grid[row][moveRight] >= grid[row][col]) {
            // Not visible
            viewingDistances.push(counter)
            break
          }

          counter++
        }
      }

      // Check up / down
      // up x - 1
      if (row - 1 < 0) {
        viewingDistances.push(0)
      } else {
        // check up
        let moveUp = row
        let counter = 1
        while (true) {
          moveUp--

          if (moveUp < 0) {
            // Edge
            viewingDistances.push(counter - 1)
            break
          }

          if (grid[moveUp][col] >= grid[row][col]) {
            // Not visible
            viewingDistances.push(counter)
            break
          }

          counter++
        }
      }

      // down x + 1
      if (row + 1 >= grid[0].length) {
        viewingDistances.push(0)
      } else {
        // check down
        let moveDown = row
        let counter = 1
        while (true) {
          moveDown++

          if (moveDown >= grid[0].length) {
            // Edge
            viewingDistances.push(counter - 1)
            break
          }

          if (grid[moveDown][col] >= grid[row][col]) {
            // Not visible
            viewingDistances.push(counter)
            break
          }

          counter++
        }
      }

      const scenicScore = viewingDistances.reduce(
        (total, curr) => (total *= curr),
        1
      )

      maxScenicScore = Math.max(scenicScore, maxScenicScore)
    }
  }
  // 517440
  console.log(`Answer is ${maxScenicScore}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
