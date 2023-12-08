import { readFile } from 'fs/promises'

const limits = {
  red: 12,
  green: 13,
  blue: 14
}

try {
  const rawInput = await readFile('day-02/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  let result = 0

  for (let i = 0; i < lines.length; i++) {
    const gameNum = i + 1
    let isValid = true
    const rounds = lines[i].split(': ')[1]
    const cubes = rounds.split('; ').map((round) => round.split(', '))

    for (let j = 0; j < cubes.length; j++) {
      for (let k = 0; k < cubes[j].length; k++) {
        const [num, color] = cubes[j][k].split(' ')

        if (limits[color] < Number(num)) {
          isValid = false
          break
        }
      }

      if (!isValid) {
        break
      }
    }

    if (isValid) {
      result += gameNum
    }
  }

  console.log(`Result is: ${result}`)
  // 3059
} catch (err) {
  console.error(`There was an error: ${err}`)
}
