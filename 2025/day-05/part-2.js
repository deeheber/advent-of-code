/**
 * Plan
 * 1. Parse data (just ranges)
 * 2. Sort ranges by start position
 * 3. Merge overlapping/adjacent ranges
 * 4. Add count of numbers in each deduped range to the answer
 */
import { readFile } from 'fs/promises'

try {
  // Parse
  const rawInput = await readFile('day-05/input.txt', 'utf-8')
  const [rawRanges] = rawInput.split('\n\n')

  const freshRanges = []
  for (const range of rawRanges.split('\n')) {
    const [start, end] = range.split('-').map((str) => Number(str))
    freshRanges.push({ start, end })
  }

  // Sort by start
  freshRanges.sort((a, b) => a.start - b.start)

  // Merge
  let counter = 1
  while (counter < freshRanges.length) {
    const current = freshRanges[`${counter}`]
    const previous = freshRanges[`${counter - 1}`]

    // Are they adjacent or do they overlap
    if (current.start <= previous.end + 1) {
      // They overlap or are adjacent => merge
      const newStart = Math.min(current.start, previous.start)
      const newEnd = Math.max(current.end, previous.end)
      // Update current
      freshRanges[`${counter}`] = { start: newStart, end: newEnd }
      // Delete previous
      freshRanges.splice(counter - 1, 1)
      continue
    }

    counter++
  }

  let answer = 0
  for (const freshRange of freshRanges) {
    const { start, end } = freshRange
    const numInRange = end - start + 1
    answer += numInRange
  }

  // 353507173555373
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
