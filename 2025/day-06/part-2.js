import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-06/input.txt', 'utf-8')
  const lines = rawInput.split('\n')

  const formatted = new Map()
  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      let curr = formatted.get(i)
      formatted.set(i, curr ? (curr += line[i]) : line[i])
    }
  }

  let answer = 0
  let operator
  let total
  for (const line of formatted.values()) {
    // If line is all empty chars reset
    if (line.trim().length === 0) {
      answer += total
      operator = undefined
      total = undefined
      continue
    }

    if (line.includes('+')) {
      operator = '+'
      total = 0
    }

    if (line.includes('*')) {
      operator = '*'
      total = 1
    }

    const operand = line.replace(/[ +*]+/g, '')
    total = eval(`${total}${operator}${operand}`)
  }

  answer += total
  // 9770311947567
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
