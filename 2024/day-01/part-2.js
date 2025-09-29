import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8')
  const items = rawInput.split('\n')

  const left = []
  // Map number:ocurrencesOfTheNumber
  const right = new Map()

  for (const item of items) {
    const [first, second] = item.split('   ')
    left.push(Number(first))

    const parsedNum = Number(second)
    right.set(parsedNum, !!right.get(parsedNum) ? right.get(parsedNum) + 1 : 1)
  }

  let result = 0
  for (const item of left) {
    const count = right.get(item)
    if (count !== undefined) {
      result += item * count
    }
  }
  // 23046913
  console.log(`Result is ${result}`)
} catch (err) {
  console.error(err.stack)
}
