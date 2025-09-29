import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8')
  const items = rawInput.split('\n')

  const left = []
  const right = []

  for (const item of items) {
    const [first, second] = item.split('   ')
    left.push(Number(first))
    right.push(Number(second))
  }

  left.sort((a, b) => a - b)
  right.sort((a, b) => a - b)

  let result = 0
  for (let i = 0; i < left.length; i++) {
    const first = left[i]
    const second = right[i]

    result += Math.abs(first - second)
  }
  // 1580061
  console.log(`Result is ${result}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
