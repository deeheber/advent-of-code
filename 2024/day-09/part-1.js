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

  let left = 0
  let right = blocks.length - 1
  while (left < right) {
    // Find next non-empy on left
    while (left < right && blocks[left] !== '.') {
      left++
    }
    // Find next empy on right
    while (left < right && blocks[right] === '.') {
      right--
    }

    if (left < right) {
      blocks[left] = blocks[right]
      blocks[right] = '.'
      left++
      right--
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

  // 6471961544878
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
