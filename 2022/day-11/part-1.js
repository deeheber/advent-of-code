import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-11/input.txt', 'utf-8')
  const monkeys = rawInput.split('\n\n').map((monkey, index) => {
    const lines = monkey.split('\n')
    const findNumbers = /\d+/g

    const parsedMonkey = {
      id: index,
      totalInspected: 0,
      items: lines[1].match(findNumbers).map((num) => Number(num)),
      operation: (old) => {
        const originalStr = lines[2].split(' = ')[1]
        const replaced = originalStr.replaceAll('old', old)
        return eval(replaced)
      },
      test: (newWorryLevel) => {
        // return monkey num to throw to
        if (newWorryLevel % Number(lines[3].match(findNumbers)[0]) === 0) {
          return lines[4].match(findNumbers).map((num) => Number(num))[0]
        }
        return lines[5].match(findNumbers).map((num) => Number(num))[0]
      }
    }

    return parsedMonkey
  })

  let round = 20

  while (round > 0) {
    for (const monkey of monkeys) {
      let currItem = monkey.items.shift()
      while (currItem) {
        const newWorryLevel = monkey.operation(currItem)
        const boredWorryLevel = Math.floor(newWorryLevel / 3)
        const monkeyToThrowTo = monkey.test(boredWorryLevel)
        monkeys[monkeyToThrowTo].items.push(boredWorryLevel)
        monkey.totalInspected++
        currItem = monkey.items.shift()
      }
    }

    round--
  }
  // 76728
  console.log(`Answer is:
    ${monkeys
      .sort((a, b) => b.totalInspected - a.totalInspected)
      .slice(0, 2)
      .reduce((acc, curr) => acc * curr.totalInspected, 1)}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
