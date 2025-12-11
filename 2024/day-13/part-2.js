import { readFile } from 'fs/promises'

try {
  // Parse input
  const rawInput = await readFile('day-13/input.txt', 'utf-8')
  const items = rawInput.split('\n\n')
  /**
   * Format as arr of objects
   * Example:
   * {
    a_x: 69,
    a_y: 23,
    b_x: 27,
    b_y: 71,
    prize_x: 18641,
    prize_y: 10279
  }
   */
  const machines = []
  for (const item of items) {
    const machine = {}
    const regex = /(Button [AB]|Prize):\s*X[+=](\d+),?\s*Y[+=](\d+)/g

    let match
    while ((match = regex.exec(item)) !== null) {
      const [_, label, x, y] = match
      // console.log(`${label} → X: ${x}, Y: ${y}`)
      if (label.startsWith('Button')) {
        machine[`${label.charAt(7).toLowerCase()}_x`] = parseInt(x)
        machine[`${label.charAt(7).toLowerCase()}_y`] = parseInt(y)
      } else {
        machine[`prize_x`] = parseInt(x) + 10000000000000
        machine[`prize_y`] = parseInt(y) + 10000000000000
      }
    }

    machines.push(machine)
  }

  let answers = []
  // Loop through each machine
  for (const machine of machines) {
    const { a_x, a_y, b_x, b_y, prize_x, prize_y } = machine

    const det = a_x * b_y - a_y * b_x

    if (det !== 0) {
      // Craemer's rule
      // https://en.wikipedia.org/wiki/Cramer%27s_rule
      const a = (prize_x * b_y - prize_y * b_x) / det
      const b = (a_x * prize_y - a_y * prize_x) / det

      if (a >= 0 && b >= 0 && Number.isInteger(a) && Number.isInteger(b)) {
        answers.push(3 * a + b)
      }
    }
  }
  // Add up all of the answers from each machine
  // 108528956728655
  console.log(`Answer is: ${answers.reduce((a, b) => a + b, 0)}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
