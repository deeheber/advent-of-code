import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-03/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  let answer = 0
  let map = []

  for (let index = 0; index < lines.length; index++) {
    /**
     * Example
     * [
     *  { start: 0, end: 2, number: '467' },
     *  { start: 5, end: 7, number: '114'}
     * ]
     */
    let numbers = []

    let match
    let regex = /\d+/g
    while ((match = regex.exec(lines[index])) !== null) {
      numbers.push({
        start: match.index,
        end: regex.lastIndex - 1,
        number: match[0]
      })
    }

    for (let number of numbers) {
      for (let y = index - 1; y <= index + 1; y++) {
        for (let x = number.start - 1; x <= number.end + 1; x++) {
          // It is on the grid
          if (y >= 0 && y < lines.length && x >= 0 && x < lines[index].length) {
            if (lines[y][x] == '*') {
              map.push({ x, y, number: parseInt(number.number) })
            }
          }
        }
      }
    }
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      let a = map.filter((el) => el.x == x && el.y == y)
      // Two digit neighbors
      if (a.length == 2) {
        let nums = a.map((el) => el.number)
        answer += nums[0] * nums[1]
      }
    }
  }

  console.log(`Answer is: ${answer}`)
  // 73201705
} catch (err) {
  console.error(`There was an error: ${err}`)
}
