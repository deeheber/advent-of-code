import { readFile } from 'fs/promises'

try {
  // Format input
  const rawInput = await readFile('day-11/input.txt', 'utf-8')
  const input = rawInput.split('\n')
  let stones = input[0].split(' ')

  const blinks = 25
  let counter = 0
  while (counter < blinks) {
    const next = []
    for (const stone of stones) {
      if (stone === '0') {
        next.push('1')
      } else if (stone.length % 2 === 0) {
        // Even number of digits
        const middle = stone.length / 2
        const left = stone.slice(0, middle)
        // Strip leading zeroes
        let right = stone.slice(middle)
        if (right.match(/^0+$/)) {
          right = '0'
        } else {
          // Remove leading zeros.
          right = right.replace(/^0+/, '')
        }

        next.push(left)
        next.push(right)
      } else {
        const product = String(Number(stone) * 2024)
        next.push(product)
      }
    }
    stones = next
    counter++
  }
  // 194782
  console.log(`Answer is ${stones.length}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
