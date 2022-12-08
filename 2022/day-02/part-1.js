import { readFile } from 'fs/promises';

try {
  // Parse input
  const rawInputs = await readFile('day-02/input.txt', 'utf-8');
  const inputs = rawInputs.split('\n');
  const rounds = [];
  for (const input of inputs) {
    // [ 'oponnent', 'me' ]
    rounds.push(input.split(' '))
  }

  // Play rounds
  const choices = {
    // rock
    X: {
      itemScore: 1,
      // what opponent picked for me to win
      // scissors
      win: 'C',
      // rock
      tie: 'A'
    },
    // paper
    Y: {
      itemScore: 2,
      // rock
      win: 'A',
      // paper
      tie: 'B'
    },
    // scissors
    Z: {
      itemScore: 3,
      // paper
      win: 'B',
      // scissors
      tie: 'C'
    }
  };

  let myScore = 0;

  for (const round of rounds) {
    const [ opponentChoice, myChoice ] = round;

    if (choices[myChoice].tie === opponentChoice) {
      // tie
      myScore += 3;
    } else {
      const neededToWin = choices[myChoice].win;

      if (neededToWin === opponentChoice) {
        // win
        myScore += 6;
      }
    }

    myScore += choices[myChoice].itemScore;
  }

  // 14827
  console.log(`Answer is ${myScore}`)
} catch (err) {
  console.error(`There was an error: ${err}`);
}
