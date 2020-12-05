const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

async function main () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const expenses = rawInput.split('\n');
    const seen = {};
    let answer;

    for (let index = 0; index < expenses.length; index++) {
      const currentExpense = expenses[index];
      const compliment = 2020 - currentExpense;

      if (seen[compliment] !== undefined) {
        answer = currentExpense * compliment;
        break;
      } else {
        seen[currentExpense] = 'seen';
      }
    }

    console.log(`Answer is ${answer}`);
  } catch (err) {
    console.error(err.message);
  }
}

main();