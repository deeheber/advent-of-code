const { promisify } = require('util');
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

async function main () {
  try {
    const rawInput = await readFilePromise('input.txt', 'utf-8');
    const input = rawInput.split('\n');
    // Cut off the last item in the array which evaluates to undefined
    const moduleMasses = input.slice(0, input.length - 1);
    const fuelRequired = [];

    for (let index = 0; index < moduleMasses.length; index++) {
      let current = Math.floor(moduleMasses[index] / 3) - 2;

      while (current > 0) {
        fuelRequired.push(current);
        current = Math.floor(current / 3) - 2;
      }
    }

    // Print final answer
    console.log(
      'Total fuel required is: ',
      fuelRequired.reduce((total, requirement) => total + requirement, 0)
    );
  } catch (err) {
    console.error(err.message);
  }
}

main();
