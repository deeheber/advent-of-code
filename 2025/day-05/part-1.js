/**
 * Plan
 * 1. Parse data
 * 3. Loop through IDs and check if spoiled
 *    - Spoiled = not in a range
 *    - Fresh = in a range
 * 4. Return number of fresh ingridients
 */
import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-05/input.txt', 'utf-8')
  const [rawRanges, rawIds] = rawInput.split('\n\n')
  const freshRanges = []
  let freshCount = 0

  const ranges = rawRanges.split('\n')
  for (const range of ranges) {
    const [start, end] = range.split('-').map((str) => Number(str))
    freshRanges.push({ start, end })
  }

  const ids = rawIds.split('\n')
  for (const id of ids) {
    if (
      freshRanges.some(
        (range) => Number(id) >= range.start && Number(id) <= range.end
      )
    ) {
      freshCount++
    }
  }
  // 623
  console.log(`Answer is ${freshCount}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
