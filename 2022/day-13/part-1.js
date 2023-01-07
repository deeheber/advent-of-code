import { readFile } from 'fs/promises'

try {
  // Get inputs
  const rawInput = await readFile('day-13/input.txt', 'utf-8')
  const inputs = rawInput.split('\n\n').map((group) => {
    const [left, right] = group.split('\n').map((line) => JSON.parse(line))
    return { left, right }
  })

  // Helper compare function
  function compare(left, right, result) {
    const leftIsNumber = typeof left === 'number'
    const rightIsNumber = typeof right === 'number'

    if (leftIsNumber && rightIsNumber) {
      if (left < right) {
        result.correctOrder = true
        return
      }

      if (left > right) {
        result.correctOrder = false
        return
      }
    } else if (!leftIsNumber && !rightIsNumber) {
      // both are lists
      let index = 0
      while (true) {
        if (index > left.length - 1 && index <= right.length - 1) {
          // left ran out of items => in order
          result.correctOrder = true
          return
        }

        if (index > right.length - 1 && index <= left.length - 1) {
          // right ran out of items => not in order
          result.correctOrder = false
          return
        }

        if (index > left.length - 1 && index > right.length - 1) {
          // same length => no decision
          return
        }

        // continue checking next part of input
        compare(left[index], right[index], result)

        // stop bc we set correctOrder
        if (typeof result.correctOrder !== 'undefined') {
          return
        }

        index++
      }
    } else {
      // exactly one is a number, convert it to list
      if (leftIsNumber) {
        compare([left], right, result)
      } else {
        compare(left, [right], result)
      }
    }
  }

  let answer = []
  // Loop through inputs
  for (let i = 0; i < inputs.length; i++) {
    const { left, right } = inputs[i]

    const result = {}
    compare(left, right, result)

    if (result.correctOrder === true) {
      // record the 1 based index
      answer.push(i + 1)
    }
  }

  console.log(`Answer is ${answer.reduce((total, curr) => (total += curr), 0)}`)
  // 5208
} catch (err) {
  console.error(`There was an error: ${err}`)
}
