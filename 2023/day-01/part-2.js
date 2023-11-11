import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8')
  const items = rawInput.split('\n')

  for (const item of items) {
    console.log(item)
  }
} catch (err) {
  console.error(`There was an error: ${err}`)
}
