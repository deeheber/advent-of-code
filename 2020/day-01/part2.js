const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

async function main () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const expenses = rawInput.split('\n').map(item => Number(item)).sort((a, b) => a - b);
    let answer;

    for (let index = 0; index < expenses.length; index++) {
      const currentExpense = expenses[index];
      const compliment = 2020 - currentExpense;

      const foundAnswer = findCompliment(expenses, index, compliment);

      if (foundAnswer) {
        answer = foundAnswer[0] * foundAnswer[1] * currentExpense;
        break;
      }
    }

    console.log(`Answer is ${answer}`);
    // 130933530
  } catch (err) {
    console.error(err.message);
  }
}

function findCompliment (nums, i, target) {
  const seen = {};

  for (let index = 0; index < nums.length; index++) {
    if (index === i) {
      continue;
    }

    const currentExpense = nums[index];
    const compliment = target - currentExpense;

    if (seen[compliment] !== undefined) {
      return [ compliment, currentExpense ];
    } else {
      seen[currentExpense] = 'seen';
    }
  }

  return false;
}

main();