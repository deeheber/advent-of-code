import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8')
  const rotations = rawInput.split('\n')

  let answer = 0
  let location = 50
  for (const rotation of rotations) {
    const direction = rotation[0]
    let amount = parseInt(rotation.slice(1))
    // L -
    // R +
    while (amount > 0) {
      amount--
      // Move left or right one
      if (direction === 'L') {
        location--
      } else {
        // R
        location++
      }

      // Reset if overflow
      if (location > 99) {
        location = 0
      }
      if (location < 0) {
        location = 99
      }
    }

    console.debug(`Location is ${location}`)

    if (location === 0) {
      answer++
    }
  }
  // 1029
  console.log(`Answer is: ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
