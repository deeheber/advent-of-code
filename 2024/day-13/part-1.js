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
        machine[`prize_x`] = parseInt(x)
        machine[`prize_y`] = parseInt(y)
      }
    }

    machines.push(machine)
  }

  let answers = []
  // Loop through each machine
  for (const machine of machines) {
    let minTokens = Infinity
    // Loop through all combos of 0 - 100 for both A and B
    // Could probably do something more efficient like binary search here
    const { a_x, a_y, b_x, b_y, prize_x, prize_y } = machine
    for (let a = 0; a <= 100; a++) {
      for (let b = 0; b <= 100; b++) {
        // Each combo => is there a path to the prize?
        // a × A_x + b × B_x = P_x
        // a × A_y + b × B_y = P_y
        if (a * a_x + b * b_x === prize_x && a * a_y + b * b_y === prize_y) {
          // Yes => calculate tokens 3a + b
          // Set min tokens (cheapest) => answer
          minTokens = Math.min(minTokens, 3 * a + b)
        }
        // No => go to next combo
      }
    }

    if (minTokens < Infinity) {
      answers.push(minTokens)
    }
  }
  // Add up all of the answers from each machine
  // 25751
  console.log(`Answer is: ${answers.reduce((a, b) => a + b, 0)}`)
} catch (err) {
  console.error(`There was an error: ${err.stack}`)
}
