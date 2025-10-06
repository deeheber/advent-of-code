import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-03/input.txt', 'utf-8')
  const items = rawInput.split('\n')

  let result = 0
  // do() to start
  let apply = true
  for (const item of items) {
    const matches = item.matchAll(/do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g)
    for (const match of matches) {
      switch (match[0]) {
        case 'do()':
          apply = true
          break
        case "don't()":
          apply = false
          break
        default:
          // assuming mul(digit,digit)
          if (apply === true) {
            result += match[1] * match[2]
          }
          break
      }
    }
  }
  // 62098619
  console.log(`Result is: ${result}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
