import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-02/input.txt', 'utf-8')
  const lines = rawInput.split('\n')

  for (const line of lines) {
    console.log(line)
  }
} catch (err) {
  console.error(`There was an error: ${err}`)
}
