import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-03/input.txt', 'utf-8')
  let answer = 0
  const banks = rawInput.split('\n')

  for (const bank of banks) {
    const num = bank.split('').map((n) => Number(n))
    // Find first battery
    // Largest number that's not the last index
    let firstNum = num[0]
    let firstNumIdx = 0
    for (let i = 1; i <= num.length - 2; i++) {
      if (firstNum !== num[i] && Math.max(firstNum, num[i]) === num[i]) {
        firstNum = num[i]
        firstNumIdx = i
      }
    }

    // Find second battery
    // Start at first battery index and find the largest number
    let secondNum = num[`${firstNumIdx + 1}`]
    for (let i = firstNumIdx + 1; i < num.length; i++) {
      if (Math.max(secondNum, num[i]) === num[i]) {
        secondNum = num[i]
      }
    }

    // Format the number
    const maxJoltage = Number(`${firstNum}${secondNum}`)

    // Add to answer
    answer += maxJoltage
  }
  // 17330
  console.log(`Answer is: ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
