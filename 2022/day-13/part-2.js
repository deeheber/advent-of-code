import { readFile } from 'fs/promises'

try {
  // Get inputs
  const rawInput = await readFile('day-13/input.txt', 'utf-8')
  const inputs = rawInput
    .split('\n')
    .reduce((acc, curr) => {
      if (curr !== '') {
        acc.push(JSON.parse(curr))
      }
      return acc
    }, [])
    .concat([[[2]], [[6]]])

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

  // get lines with [[2]] and [[6]] and sort
  const lines = inputs
    .sort((a, b) => {
      const result = {}
      compare(a, b, result)
      return result.correctOrder ? -1 : 1
    })
    .map((line) => JSON.stringify(line))

  // get index for [[2]] and [[6]]
  const firstDivider = lines.indexOf('[[2]]') + 1
  const secondDivider = lines.indexOf('[[6]]') + 1

  // multiply
  console.log(`Answer is ${firstDivider * secondDivider}`)
  // 25792
} catch (err) {
  console.error(`There was an error: ${err}`)
}
