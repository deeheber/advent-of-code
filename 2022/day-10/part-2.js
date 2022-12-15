import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-10/input.txt', 'utf-8')
  const inputs = rawInput.split('\n').map((line) => {
    const [instruction, amount] = line.split(' ')
    return {
      instruction,
      amount: Number(amount) ? Number(amount) : null
    }
  })
  // start a new line before these cycles
  const interestingCycles = [41, 81, 121, 161, 201]
  const lines = []
  let currentLine = ''
  let cycle = 1
  let x = 1
  for (const input of inputs) {
    const { instruction, amount } = input

    if (instruction === 'noop') {
      // during
      // prettier-ignore
      const pixelToDraw = (currentLine.length >= x-1 && currentLine.length <= x+1) ? '#' : '.'
      currentLine += pixelToDraw
      cycle++
      if (interestingCycles.includes(cycle)) {
        lines.push(currentLine)
        currentLine = ''
      }
    }

    if (instruction === 'addx') {
      // do nothing on first cycle
      // prettier-ignore
      const pixelToDraw = (currentLine.length >= x-1 && currentLine.length <= x+1) ? '#' : '.'
      currentLine += pixelToDraw
      cycle++
      if (interestingCycles.includes(cycle)) {
        lines.push(currentLine)
        currentLine = ''
      }
      // add amount on second cycle
      // prettier-ignore
      const toDraw = (currentLine.length >= x-1 && currentLine.length <= x+1) ? '#' : '.'
      currentLine += toDraw
      cycle++
      //console.log('amount ', amount)
      x += amount
      if (interestingCycles.includes(cycle)) {
        lines.push(currentLine)
        currentLine = ''
      }
    }
  }
  lines.push(currentLine)

  // print final result
  // EALGULPG
  for (const line of lines) {
    console.log(line)
  }
} catch (err) {
  console.error(`There was an error: ${err}`)
}
