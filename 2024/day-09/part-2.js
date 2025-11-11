import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-09/input.txt', 'utf-8')
  const diskMap = rawInput.split('\n')[0]

  let id = 0
  let freeSpace = false
  let blocks = []
  for (const digit of diskMap) {
    const count = Number(digit)
    if (freeSpace) {
      for (let i = 0; i < count; i++) {
        blocks.push('.')
      }
    } else {
      for (let i = 0; i < count; i++) {
        blocks.push(id)
      }
      id++
    }

    freeSpace = !freeSpace
  }

  let right = blocks.length - 1
  while (right > 0) {
    // Skip free space from the right
    while (right > 0 && blocks[right] === '.') {
      right--
    }

    if (right <= 0) {
      // Reached the end
      break
    }

    // Find the file: count how many blocks with this ID
    let rightVal = blocks[right]
    let rightStart = right
    let rightCount = 0
    while (right >= 0 && blocks[right] === rightVal) {
      rightCount++
      right--
    }

    // Now search from left for a free space that fits
    let left = 0
    while (left < rightStart) {
      // Skip non-free space
      if (blocks[left] !== '.') {
        left++
        continue
      }

      // Count consecutive free space
      let leftStart = left
      let leftCount = 0
      while (left < rightStart && blocks[left] === '.') {
        leftCount++
        left++
      }

      // If we found a big enough space, do the swap
      if (leftCount >= rightCount) {
        // Move file to free space
        for (let i = 0; i < rightCount; i++) {
          blocks[leftStart + i] = rightVal
        }
        // Clear old file location
        for (let i = 0; i < rightCount; i++) {
          blocks[rightStart - i] = '.'
        }
        break
      }
    }
  }

  let answer = 0
  for (let i = 0; i < blocks.length; i++) {
    const value = blocks[i]
    // Skip empty
    if (value === '.') {
      continue
    }
    let sum = Number(value) * i
    answer += sum
  }
  // 6511178035564
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
