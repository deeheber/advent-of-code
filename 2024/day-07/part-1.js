import { readFile } from 'fs/promises'

try {
  // Util helper function
  function findCombination(numbers, target, operators = ['+', '*']) {
    function recurse(index, currentValue, ops) {
      if (index === numbers.length) {
        if (currentValue === target) {
          // Return the winning combo
          return ops
        }
        return null
      }

      for (const op of operators) {
        const nextValue =
          op === '+'
            ? currentValue + numbers[index]
            : currentValue * numbers[index]

        const result = recurse(index + 1, nextValue, [...ops, op])
        if (result) {
          return result
        }
      }

      return null
    }

    return recurse(1, numbers[0], [])
  }

  const rawInput = await readFile('day-07/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  let answer = 0
  for (const line of lines) {
    // Parse input
    const [testValue, rawNumbers] = line.split(': ')
    const numbers = rawNumbers.split(' ').map((num) => Number(num))
    const combo = findCombination(numbers, Number(testValue))
    // ['+', '*'] or null if not found
    if (combo) {
      answer += Number(testValue)
    }
  }
  // 10741443549536
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
