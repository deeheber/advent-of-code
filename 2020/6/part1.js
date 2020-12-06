const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const groups = rawInput.split('\n\n');
    let answer = 0;

    for (const group of groups) {
      const yesAnswers = new Set();
      const people = group.split('\n');

      for (const person of people) {
        for (const answer of person) {
          yesAnswers.add(answer);
        }
      }

      answer += yesAnswers.size;
    }

    console.log(`Answer is ${answer}`);
    // 6310
  } catch (err) {
    console.error(err.message);
  }
})();