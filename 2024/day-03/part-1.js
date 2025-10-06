import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-03/input.txt', 'utf-8')
  const items = rawInput.split('\n')

  let result = 0
  for (const item of items) {
    const matches = item.matchAll(/mul\((\d+),(\d+)\)/g)
    for (const match of matches) {
      result += match[1] * match[2]
    }
  }
  // 183788984
  console.log(`Result is: ${result}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
