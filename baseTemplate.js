// Just a starter base to begin each challenge
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const input = rawInput.split('\n');
    let answer;

    // answer here

    console.log(`Answer is ${answer}`);
  } catch (err) {
    console.error(err.message);
  }
})();