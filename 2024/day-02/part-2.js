import { readFile } from 'fs/promises'

try {
  // Helper function
  function isSafe(levels) {
    // 0: unknown, 1: increasing, -1: decreasing
    let direction = 0
    for (let i = 0; i < levels.length - 1; i++) {
      const diff = levels[i + 1] - levels[i]
      if (diff === 0 || Math.abs(diff) > 3) {
        return false // Invalid difference
      }
      if (direction === 0) {
        direction = Math.sign(diff)
      } else if (Math.sign(diff) !== direction) {
        return false
      }
    }
    return true
  }

  const rawInput = await readFile('day-02/input.txt', 'utf-8')
  const reports = rawInput.split('\n')

  let safeCount = 0

  for (const report of reports) {
    const levels = report.split(' ').map((str) => Number(str))

    if (isSafe(levels)) {
      // Safe without removal
      safeCount++
      continue
    }

    for (let i = 0; i < levels.length; i++) {
      const levelsCopy = [...levels]
      // Remove one level
      levelsCopy.splice(i, 1)
      if (isSafe(levelsCopy)) {
        safeCount++
        // Move to next report
        break
      }
    }
  }
  // 436
  console.log(`Number of safe reports is ${safeCount}.`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
