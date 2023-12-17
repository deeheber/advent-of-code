import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-04/input.txt', 'utf-8')
  const items = rawInput.split('\n')
  const answer = []

  for (let i = 0; i < items.length; i++) {
    const roundAnswer = []
    const [left, right] = items[i].split(' | ')
    const winning = left
      .split(': ')[1]
      .split(/\s/)
      .filter((item) => item.length)
      .map((item) => Number(item))

    const have = right
      .split(/\s/)
      .filter((item) => item.length)
      .map((item) => Number(item))

    for (const num of winning) {
      const hasCard = have.includes(num)
      if (hasCard) {
        roundAnswer.push(num)
      }
    }

    if (roundAnswer.length) {
      answer.push(roundAnswer)
    }
  }

  let total = 0
  for (let roundAnswer of answer) {
    const calculatedRound = roundAnswer.reduce((acc, _currVal, index) => {
      if (index === 0) {
        return (acc += 1)
      }
      return (acc += acc)
    }, 0)

    total += calculatedRound
  }

  // 26218
  console.log(`Answer is: ${total}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
