import { readFile } from 'fs/promises'

try {
  const input = await readFile('day-06/input.txt', 'utf-8')

  for (let start = 0, end = 4; end <= input.length; start++, end++) {
    const window = input.slice(start, end)
    const removeDuplicates = new Set(window)

    if (removeDuplicates.size === window.length) {
      // No duplicates in the current window
      // 1238
      console.log(`Answer is ${end}`)
      break
    }
  }
} catch (err) {
  console.error(`There was an error: ${err}`)
}
