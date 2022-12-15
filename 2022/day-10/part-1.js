import { readFile } from 'fs/promises'

try {
  const input = await readFile('day-10/input.txt', 'utf-8')
  const lines = input.split('\n').map((line) => {
    const [instruction, amount] = line.split(' ')
    return {
      instruction,
      amount: Number(amount) ? Number(amount) : null
    }
  })
  const interestingCycles = [20, 60, 100, 140, 180, 220]
  let answer = 0
  let cycle = 1
  let X = 1
  for (const line of lines) {
    const { instruction, amount } = line

    if (instruction === 'noop') {
      // during
      // get value
      if (interestingCycles.includes(cycle)) {
        console.log(`Cycle ${cycle}, X ${X}`)
        answer += cycle * X
      }
      cycle++
    }

    if (instruction === 'addx') {
      // do nothing on first cycle
      // get value
      if (interestingCycles.includes(cycle)) {
        console.log(`Cycle ${cycle}, X ${X}`)
        answer += cycle * X
      }
      cycle++
      // add amount on second cycle
      // get value
      if (interestingCycles.includes(cycle)) {
        console.log(`Cycle ${cycle}, X ${X}`)
        answer += cycle * X
      }
      cycle++
      X += amount
    }
  }
  // 17840
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
