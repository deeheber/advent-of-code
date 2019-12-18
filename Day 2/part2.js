const { promisify } = require('util');
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

async function main () {
  // Generate all possible combinations
  const combinations = [];

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      combinations.push([i, j]);
    }
  }

  // Cycle through each noun/verb combo until address 0 has a value of 19690720
  for (let index = 0; index < combinations.length; index++) {
    const noun = combinations[index][0];
    const verb = combinations[index][1];

    try {
      const document = await readFilePromise('input.txt', 'utf-8');
      const values = document.split(',').map(number => Number(number));

      values[1] = noun;
      values[2] = verb;

      let startIndex = 0;
      let endIndex = 3;

      while (values[endIndex] !== undefined && values[startIndex] !== 99) {
        const opicode = values[startIndex];
        const val1Index = values[startIndex + 1];
        const val2Index = values[startIndex + 2];
        let result;

        if (opicode === 1) {
          result = values[val1Index] + values[val2Index];
        } else if (opicode === 2) {
          result = values[val1Index] * values[val2Index];
        } else {
          throw new Error(`Invalid opicode value: ${opicode}`);
        }

        const outputIndex = values[endIndex];
        values[outputIndex] = result;

        // Move to new position
        startIndex += 4;
        endIndex += 4;
      }

      if (values[0] === 19690720) {
        console.log(`Noun is ${noun}`);
        console.log(`Verb is ${verb}`);
        return;
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}

main();
