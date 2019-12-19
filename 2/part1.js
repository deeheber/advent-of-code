const { promisify } = require('util');
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

async function main () {
  try {
    const document = await readFilePromise('input.txt', 'utf-8');
    const values = document.split(',').map(number => Number(number));

    // Changes specified by the puzzle
    values[1] = 12;
    values[2] = 2;

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
    console.log(`Final result: ${values}`);
  } catch (err) {
    console.error(err.message);
  }
}

main();
