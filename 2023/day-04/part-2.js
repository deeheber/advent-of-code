import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-04/input.txt', 'utf-8')
  const items = rawInput.split('\n')
  // cardNum: count
  const cardCounts = new Map()
  // Init cardCounts
  for (let i = 0; i < items.length; i++) {
    const cardNum = i + 1
    cardCounts.set(cardNum, 1)
  }

  for (let i = 0; i < items.length; i++) {
    const cardNum = i + 1
    const roundMatches = []
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
        roundMatches.push(num)
      }
    }

    if (roundMatches.length) {
      const numCardsToAdd = cardCounts.get(cardNum)
      let currCardNum = cardNum + 1
      let counter = roundMatches.length

      while (currCardNum <= items.length && counter > 0) {
        cardCounts.set(currCardNum, cardCounts.get(currCardNum) + numCardsToAdd)
        currCardNum++
        counter--
      }
    }
  }

  let answer = 0
  for (const [_cardNum, cardCount] of cardCounts) {
    answer += cardCount
  }

  console.log(`Answer is: ${answer}`)
  // 9997537
} catch (err) {
  console.error(`There was an error: ${err}`)
}
