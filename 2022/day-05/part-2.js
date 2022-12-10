import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-05/input.txt', 'utf-8')
  const parts = rawInput.split('\n\n')

  // Parse crates
  const crateLines = parts[0].split('\n')
  // TODO: Positions for three stacks
  // const positions = [1, 5, 9]
  // TODO: Positions for nine stacks
  const positions = [1, 5, 9, 13, 17, 21, 25, 29, 33]
  let crateStacks
  crateLines.reverse().forEach((crateLine, index) => {
    if (index === 0) {
      const numStacks = crateLine.split('  ').pop().trim()
      crateStacks = Array.from(new Array(Number(numStacks)), (_x) => [])
      return
    }

    for (let i = 0; i < positions.length; i++) {
      const value = crateLine[positions[i]]
      if (value.trim().length) {
        crateStacks[i].push(value)
      }
    }
  })
  /**
   * crateStacks
   * [[ 'X', 'X', 'X' ], [ 'X', 'X', 'X ] ...]
   */

  // Parse moves
  const moveLines = parts[1].split('\n')
  for (const moveLine of moveLines) {
    const move = moveLine
      .split(' ')
      .filter((x) => Number(x))
      .map((x) => Number(x))

    /**
     * Ex format
     * [ 1, 2, 1 ]
     * move 1 from 2 to 1
     */
    // Move crates
    const moveCount = move[0]
    const fromStack = move[1] - 1
    const toStack = move[2] - 1

    let startIndex = crateStacks[fromStack].length
    for (let i = 0; i < moveCount; i++) {
      startIndex--
    }

    const cratesToMove = crateStacks[fromStack].splice(startIndex, moveCount)
    crateStacks[toStack] = crateStacks[toStack].concat(cratesToMove)
  }

  // Get items at top of each stack
  let answer = []
  for (const stack of crateStacks) {
    if (stack.length) {
      answer.push(stack.pop())
    }
  }
  // QZFJRWHGS
  console.log(`Answer is ${answer.join('')}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
