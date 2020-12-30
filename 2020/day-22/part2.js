const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');

  // parse and init player1 and player2's hands
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
  const { winningHand } = playGame(hands.player1, hands.player2);

  let answer = 0;
  for (let index = 0, counter = winningHand.length; index < winningHand.length; index++, counter--) {
    answer += (winningHand[index] * counter);
  }
  
  console.log(`Answer is ${answer}`);
  // 32731
})();

function playGame (player1, player2) {
  const rounds = new Set();
  let winner;

  while (player1.length && player2.length) {
    const state = `${player1.join(',')}${player2.join(',')}`;

    if (rounds.has(state)) {
      // same cards played before player 1 wins
      return { winningHand: player1, winner: 1 };
    }

    rounds.add(state);

    const player1Play = player1.shift();
    const player2Play = player2.shift();

    if (player1.length >= player1Play && player2.length >= player2Play) {
      // play another round of recursive combat
      // num of cards in each deck = the number on the card drawn
      const { winner: result } = playGame(player1.slice(0, player1Play), player2.slice(0, player2Play));
      winner = result;
    } else {
      // winner is player with highest value card
      if (player1Play > player2Play) {
        // player 1 wins
        winner = 1;
      } else {
        // player 2 wins
        winner = 2;
      }
    }

    // add cards to winner's pile
    // winner card first then loser card
    if (winner === 1) {
      player1.push(player1Play);
      player1.push(player2Play);
    } else {
      player2.push(player2Play);
      player2.push(player1Play);
    }
  }

  return { winningHand: player1.length ? player1 : player2, winner };;
}