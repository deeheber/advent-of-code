import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-02/input.txt', 'utf-8')
  const ranges = rawInput.split(',')
  const invalidIDs = []

  for (const range of ranges) {
    // get first
    // get last
    // loop between the two counting up
    // check if invalid
    // even number && split in middle / see if both sides match (s.length / 2)
    const [start, end] = range.split('-').map((str) => Number(str))

    for (let current = start; current <= end; current++) {
      const currentStr = current.toString()
      // Check if invalid ID
      if (currentStr.length % 2 === 0) {
        // Even number of letters
        const middle = currentStr.length / 2
        const beginning = currentStr.slice(0, middle)
        const ending = currentStr.slice(middle)

        if (beginning === ending) {
          invalidIDs.push(current)
        }
      }
    }
  }
  // 35367539282
  console.log(`Answer is: ${invalidIDs.reduce((a, b) => a + b, 0)}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
