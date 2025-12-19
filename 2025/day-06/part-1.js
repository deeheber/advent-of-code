import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-06/input.txt', 'utf-8')
  const items = rawInput.split('\n')
  const lists = []
  for (const item of items) {
    const formatted = item.split(' ').reduce((acc, value) => {
      if (value.length >= 1) {
        acc.push(value)
      }

      return acc
    }, [])
    lists.push(formatted)
  }

  const totals = new Map()
  for (let row = lists.length - 1; row >= 0; row--) {
    for (let col = 0; col < lists[0].length; col++) {
      // Operand and initial setup
      if (row === lists.length - 1) {
        const item = lists[row][col]
        if (item === '*') {
          totals.set(col, { operand: item, count: '1' })
        } else {
          // '+'
          totals.set(col, { operand: item, count: '0' })
        }
      } else {
        const { operand, count } = totals.get(col)
        const newVal = eval(`${count}${operand}${lists[row][col]}`)

        totals.set(col, { operand, count: String(newVal) })
      }
    }
  }

  let answer = 0
  for (const { _operand, count } of totals.values()) {
    answer += Number(count)
  }
  // 6891729672676
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
