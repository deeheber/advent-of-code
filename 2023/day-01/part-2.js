import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8')
  const input = rawInput.split('\n\n')

  console.log(`Input is ${input}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
