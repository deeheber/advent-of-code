import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  const calibrationValues = []

  for (const line of lines) {
    let nums = []

    for (let i = 0; i < line.length; i++) {
      if (!isNaN(line[i])) {
        // It is a digit number
        nums.push(line[i])
      }

      // Check for spelled out nums
      const spelledOutNums = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine'
      ]
      const substring = line.substring(i)
      for (let j = 0; j < spelledOutNums.length; j++) {
        const currNum = spelledOutNums[j]
        if (substring.startsWith(currNum)) {
          // Zero indexed + 1 to get the digit
          nums.push(j + 1)
          break
        }
      }
    }

    const lineCalibrationValue = `${nums.at(0)}${nums.at(nums.length - 1)}`
    calibrationValues.push(Number(lineCalibrationValue))
  }

  console.log(calibrationValues.reduce((a, b) => a + b, 0))
  // 55686
} catch (err) {
  console.error(`There was an error: ${err}`)
}
