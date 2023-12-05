import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  const calibrationValues = []

  for (const line of lines) {
    let nums = []
    for (const char of line) {
      if (!isNaN(char)) {
        // It is a number
        nums.push(char)
      }
    }

    const lineCalibrationValue = nums.at(0) + nums.at(nums.length - 1)
    calibrationValues.push(Number(lineCalibrationValue))
  }

  console.log(calibrationValues.reduce((a, b) => a + b, 0))
  // 55029
} catch (err) {
  console.error(`There was an error: ${err}`)
}
