import { readFile } from 'fs/promises'

try {
  // Parse Input
  const rawInput = await readFile('day-05/input.txt', 'utf-8')

  const [rulesSection, updatesSection] = rawInput.trim().split('\n\n')

  const rules = new Set()
  rulesSection.split('\n').map((item) => {
    const [first, second] = item.split('|')
    rules.add(`${first}#${second}`)
  })

  const updates = updatesSection
    .split('\n')
    .map((line) => line.split(',').map((num) => Number(num)))

  let answer = 0
  // Loop through updates and check if valid
  for (const update of updates) {
    let validUpdate = true

    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        // Swap order
        if (rules.has(`${update[j]}#${update[i]}`)) {
          validUpdate = false
          break
        }
      }
      if (!validUpdate) {
        break
      }
    }

    if (validUpdate) {
      // Find middle page
      const middleIndex = Math.floor(update.length / 2)
      answer += update[middleIndex]
    }
  }
  // 5391
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
