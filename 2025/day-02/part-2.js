import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-02/input.txt', 'utf-8')
  const ranges = rawInput.split(',')
  const invalidIDs = []

  for (const range of ranges) {
    const [start, end] = range.split('-').map((str) => Number(str))
    // Count through the range
    for (let current = start; current <= end; current++) {
      // Check if invalid ID
      const currentStr = current.toString()
      const length = currentStr.length
      for (let seqLen = 1; seqLen <= length / 2; seqLen++) {
        if (length % seqLen !== 0) {
          // Doesn't evenly divide
          continue
        }

        const pattern = currentStr.substring(0, seqLen)
        const repeatedPattern = pattern.repeat(length / seqLen)

        if (currentStr === repeatedPattern) {
          invalidIDs.push(current)
          break
        }
      }
    }
  }
  // 45814076230
  console.log(`Answer is: ${invalidIDs.reduce((a, b) => a + b, 0)}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
