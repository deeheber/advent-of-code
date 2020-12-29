const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');

  // build up card hands
  const hands = {};
  let counter = 0;
  input.forEach(line => {
    if (line.startsWith('Player')) {
      counter++;
      return;
    }

    if (!isNaN(line) && line.length) {
      const currentPlayer = `player${counter}`;
      
      if (hands[currentPlayer]) {
        hands[currentPlayer].push(Number(line));
      } else {
        hands[currentPlayer] = [ Number(line)];
      }
    }
  });

  // play game
  let { player1, player2 } = hands;
  while (player1.length && player2.length) {
    const player1Play = player1.shift();
    const player2Play = player2.shift();

    if (player1Play > player2Play) {
      // player 1 wins
      player1.push(player1Play);
      player1.push(player2Play);
    } else {
      // player 2 wins
      player2.push(player2Play);
      player2.push(player1Play);
    }
  }

  const winningHand = player1.length ? player1 : player2;
  let answer = 0;
  for (let index = 0, counter = winningHand.length; index < winningHand.length; index++, counter--) {
    answer += (winningHand[index] * counter);
  }
  
  console.log(`Answer is ${answer}`);
  // 34005
})();