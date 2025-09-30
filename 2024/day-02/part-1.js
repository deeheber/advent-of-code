import { readFile } from 'fs/promises'

try {
  // Helper functions
  function isIncreasing(arr) {
    if (arr.length < 1) return false
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false
      }
    }
    return true
  }

  function isDecreasing(arr) {
    if (arr.length < 1) return false
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < arr[i + 1]) {
        return false
      }
    }
    return true
  }

  function oneToThreeDifference(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      const difference = Math.abs(arr[i + 1] - arr[i])
      if (difference < 1 || difference > 3) {
        return false
      }
    }
    return true
  }

  const rawInput = await readFile('day-02/input.txt', 'utf-8')
  const reports = rawInput.split('\n')

  let safeCount = 0

  for (const report of reports) {
    const reportArr = report.split(' ').map((str) => Number(str))
    // The levels are either all increasing or all decreasing.
    if (!isIncreasing(reportArr)) {
      if (!isDecreasing(reportArr)) {
        continue
      }
    }
    // Any two adjacent levels differ by at least one and at most three.
    if (oneToThreeDifference(reportArr)) {
      safeCount++
    }
  }
  // 383
  console.log(`Number of safe reports is ${safeCount}.`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
