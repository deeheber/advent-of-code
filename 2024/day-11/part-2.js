import { readFile } from 'fs/promises'

try {
  // Format input
  const rawInput = await readFile('day-11/input.txt', 'utf-8')
  const input = rawInput.split('\n')[0].split(' ')

  // key: the number | value: the count
  let stones = new Map()
  for (const item of input) {
    stones.set(item, (stones.get(item) ?? 0) + 1)
  }

  const blinks = 75
  let counter = 0
  while (counter < blinks) {
    let next = new Map()
    for (const [stone, count] of stones) {
      if (stone === '0') {
        next.set('1', (next.get('1') ?? 0) + count)
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

        next.set(left, (next.get(left) ?? 0) + count)
        next.set(right, (next.get(right) ?? 0) + count)
      } else {
        const product = String(Number(stone) * 2024)

        next.set(product, (next.get(product) ?? 0) + count)
      }
    }

    stones = next
    counter++
  }

  // Sum
  let answer = 0
  for (const count of stones.values()) {
    answer += count
  }
  // 233007586663131
  console.info(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
