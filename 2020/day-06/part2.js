const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const groups = rawInput.split('\n\n');
    let solution = 0;

    for (const group of groups) {
      const yesAnswers = {};
      const people = group.split('\n');

      for (const person of people) {
        for (const answer of person) {
          if (yesAnswers[answer] === undefined) {
            yesAnswers[answer] = 1;
          } else {
            yesAnswers[answer]++;
          }
        }
      }

      for (const answer in yesAnswers) {
        const count = yesAnswers[answer];

        if (count === people.length) {
          solution++;
        }
      }
    }

    console.log(`Answer is ${solution}`);
    // 3193
  } catch (err) {
    console.error(err.message);
  }
})();