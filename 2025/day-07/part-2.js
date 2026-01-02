import { readFile } from 'fs/promises'

try {
  // Parse input
  const rawInput = await readFile('day-07/input.txt', 'utf-8')
  const lines = rawInput.split('\n')

  const grid = []
  for (const line of lines) {
    grid.push(line.split(''))
  }

  // Init and add S location
  let particleCounts = new Map()
  particleCounts.set(grid.length / 2 - 1, 1)

  // Process rows
  for (let row = 1; row < grid.length; row++) {
    let newParticleCounts = new Map()
    for (const [col, count] of particleCounts) {
      const curr = grid[row][col]

      if (curr === '.') {
        // Extend beam
        newParticleCounts.set(col, (newParticleCounts.get(col) ?? 0) + count)
      }

      if (curr === '^') {
        // Split beam and count left and right paths
        const leftCol = col - 1
        const rightCol = col + 1

        if (leftCol >= 0) {
          newParticleCounts.set(
            leftCol,
            (newParticleCounts.get(leftCol) ?? 0) + count
          )
        }

        if (rightCol < grid[0].length) {
          newParticleCounts.set(
            rightCol,
            (newParticleCounts.get(rightCol) ?? 0) + count
          )
        }
      }
    }

    particleCounts = newParticleCounts
  }

  let answer = 0
  for (const [_key, val] of particleCounts) {
    answer += val
  }
  // 13418215871354
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
