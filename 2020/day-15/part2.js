const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const input = rawInput.split(',').map(num => Number(num));
    // number: last round spoken
    const history = new Map();
    let round = input.length;
    let lastNum = input[input.length - 1];

    // load input
    input.forEach((num, i) => history.set(num, i));

    // start game
    while (round < 30000000) {
      let newNum = 0;

      if (history.has(lastNum)) {
        // already said
        newNum = (round - 1) - history.get(lastNum);
      }

      history.set(lastNum, round - 1);
      lastNum = newNum;
      round++;
    }

    console.log(`Answer is ${lastNum}`);
    // 164878
  } catch (err) {
    console.error(err.message);
  }
})();