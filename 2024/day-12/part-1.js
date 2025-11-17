import { readFile } from 'fs/promises'

try {
  // Parse input and create garden
  const rawInput = await readFile('day-12/input.txt', 'utf-8')
  const items = rawInput.split('\n')
  let answer = 0
  const garden = []
  for (const item of items) {
    garden.push(item.split(''))
  }

  // Loop through the garden
  for (let row = 0; row < garden.length; row++) {
    for (let col = 0; col < garden[0].length; col++) {
      const currFlower = garden[row][col]
      // If flower has not been seen
      if (!currFlower.endsWith('#')) {
        console.debug('currFlower ', currFlower)
        const stack = []
        stack.push({ row, col })
        // row, col
        const directions = [
          [-1, 0], // up
          [1, 0], // down
          [0, -1], // left
          [0, 1] // right
        ]
        // Add to plot
        const plot = new Set().add(`${row}#${col}`)
        // Mark as seen
        garden[row][col] = currFlower + '#'
        while (stack.length) {
          // Pull item off the stack
          const { row, col } = stack.pop()
          // Look at neighbors (up, down, left, right)
          for (let [moveRow, moveCol] of directions) {
            const currRow = moveRow + row
            const currCol = moveCol + col
            // Make sure it is on the grid
            if (
              currRow >= 0 &&
              currCol >= 0 &&
              currRow < garden.length &&
              currCol < garden[0].length
            ) {
              // If neighbor is the same flower type (and not seen)
              const neighborFlower = garden[currRow][currCol]
              if (neighborFlower === currFlower) {
                // Add to plot
                plot.add(`${currRow}#${currCol}`)
                // Mark as seen
                garden[currRow][currCol] = neighborFlower + '#'
                // Put in stack to traverse its neighbors
                stack.push({ row: currRow, col: currCol })
              }
            }
          }
        }
        console.debug('Plot ', plot)
        let perimeter = 0
        for (const flower of plot) {
          const [itemRow, itemCol] = flower.split('#')
          // See if it's an edge
          // Edge === get neighbors (up, right, left, down) if neighbor is off the board or not the same value
          for (let [moveRow, moveCol] of directions) {
            const currRow = Number(moveRow) + Number(itemRow)
            const currCol = Number(moveCol) + Number(itemCol)
            // Check if off the grid
            if (
              currRow < 0 ||
              currCol < 0 ||
              currRow >= garden.length ||
              currCol >= garden[0].length
            ) {
              perimeter += 1
              continue
            }
            // Check if same value
            if (garden[currRow][currCol] !== `${currFlower}#`) {
              perimeter += 1
            }
          }
        }
        // At the end take each area * perimeter (answer)
        const currDimensions = plot.size * perimeter
        answer += currDimensions
      }
    }
  }
  // 1456082
  console.info(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
