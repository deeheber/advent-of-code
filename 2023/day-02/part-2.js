import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-02/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  let answer = 0

  for (let i = 0; i < lines.length; i++) {
    const rounds = lines[i].split(': ')[1]
    const cubes = rounds.split('; ').map((round) => round.split(', '))

    const max = {
      green: 0,
      red: 0,
      blue: 0
    }

    for (let j = 0; j < cubes.length; j++) {
      for (let k = 0; k < cubes[j].length; k++) {
        const [num, color] = cubes[j][k].split(' ')

        if (max[color] < Number(num)) {
          max[color] = Number(num)
        }
      }
    }

    const cube = max['green'] * max['red'] * max['blue']
    answer += cube
  }

  console.log(`Answer is: ${answer}`)
  // 65371
} catch (err) {
  console.error(`There was an error: ${err}`)
}
