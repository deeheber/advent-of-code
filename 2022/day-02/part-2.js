import { readFile } from 'fs/promises'

try {
  // Parse input
  const rawInputs = await readFile('day-02/input.txt', 'utf-8')
  const inputs = rawInputs.split('\n')
  const rounds = []
  for (const input of inputs) {
    // [ 'oponnent', 'me' ]
    rounds.push(input.split(' '))
  }

  // Play rounds
  const choices = {
    // rock
    A: {
      // scissors
      X: 'C',
      // rock
      Y: 'A',
      // paper
      Z: 'B'
    },
    // paper
    B: {
      // rock
      X: 'A',
      // paper
      Y: 'B',
      // scissors
      Z: 'C'
    },
    // scissors
    C: {
      // paper
      X: 'B',
      // scissors
      Y: 'C',
      // rock
      Z: 'A'
    }
  }

  const outcomeScore = {
    // lose
    X: 0,
    // draw
    Y: 3,
    // win
    Z: 6
  }

  const itemScore = {
    A: 1,
    B: 2,
    C: 3
  }

  let myScore = 0

  for (const round of rounds) {
    const [opponentChoice, desiredOutcome] = round
    const myChoice = choices[opponentChoice][desiredOutcome]

    myScore += outcomeScore[desiredOutcome]
    myScore += itemScore[myChoice]
  }

  // 13889
  console.log(`Answer is ${myScore}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
