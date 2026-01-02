import { readFile } from 'fs/promises'

try {
  // Helper for debugging
  function printGrid(input) {
    for (const line of input) {
      console.log(line.join(''))
    }
  }
  // Parse input
  const rawInput = await readFile('day-07/input.txt', 'utf-8')
  const lines = rawInput.split('\n')

  const grid = []
  for (const line of lines) {
    grid.push(line.split(''))
  }

  // Init and add S location
  let beamSplitCount = 0
  const beams = new Set().add(grid.length / 2 - 1)

  // Draw lines
  for (let row = 1; row < grid.length; row++) {
    for (const beam of beams) {
      const curr = grid[row][beam]

      if (curr === '.') {
        // Extend beam
        grid[row][beam] = '|'
        continue
      }

      if (curr === '^') {
        // Split beam
        grid[row][beam - 1] = '|'
        grid[row][beam + 1] = '|'

        beams.add(beam + 1)
        beams.add(beam - 1)
        beams.delete(beam)

        beamSplitCount += 1
      }
    }
    // Debugging help
    // printGrid(grid)
    // console.log('----------------------')
  }

  // 1579
  console.log(`Answer is ${beamSplitCount}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
