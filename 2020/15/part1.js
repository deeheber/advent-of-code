const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const input = rawInput.split(',').map(num => Number(num));
    // number: [ ...rounds spoken]
    const history = {};
    let round = 1;
    let lastSpoken;
    let answer;

    // load input
    while (round <= input.length) {
      const spoken = input[round - 1];

      if (history[spoken] === undefined) {
        history[spoken] = [ round ];
      } else {
        history[spoken].push(round);
      }

      lastSpoken = spoken;
      round++;
    }

    // start game
    while (round <= 2020) {
      if (history[lastSpoken].length === 1) {
        // first time spoken
        lastSpoken = 0;
        // add  to history
        if (history[lastSpoken] === undefined) {
          history[lastSpoken] = [ round ];
        } else {
          history[lastSpoken].push(round);
        }
      } else {
        // not the first time spoken
        let timesSpoken = history[lastSpoken];
        lastSpoken = timesSpoken[timesSpoken.length - 1] - timesSpoken[timesSpoken.length - 2];
        // add  to history
        if (history[lastSpoken] === undefined) {
          history[lastSpoken] = [ round ];
        } else {
          history[lastSpoken].push(round);
        }
      }
      round++;
    }

    console.log(`Answer is ${lastSpoken}`);
    // 981
  } catch (err) {
    console.error(err.message);
  }
})();