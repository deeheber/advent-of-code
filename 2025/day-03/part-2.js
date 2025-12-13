import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-03/input.txt', 'utf-8')
  let answer = 0
  const banks = rawInput.split('\n')

  for (const bank of banks) {
    const bankArr = bank.split('').map((n) => Number(n))
    let maxJoltage = []

    let counter = 12
    let nextNum = bankArr[0]
    let nextNumIdx = 0
    while (counter > 0) {
      for (let i = nextNumIdx + 1; i <= bankArr.length - counter; i++) {
        if (
          nextNum !== bankArr[i] &&
          Math.max(nextNum, bankArr[i]) === bankArr[i]
        ) {
          nextNum = bankArr[i]
          nextNumIdx = i
        }
      }
      maxJoltage.push(nextNum)

      nextNumIdx++
      nextNum = bankArr[`${nextNumIdx}`]
      counter--
    }

    // Add to answer
    answer += Number(maxJoltage.join(''))
  }

  // 171518260283767
  console.log(`Answer is: ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
