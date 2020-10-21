const { promisify } = require('util');
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

async function main () {
  try {
    const rawInput = await readFilePromise('input.txt', 'utf-8');
    const input = rawInput.split('\n');
    // Cut off the last item in the array which evaluates to undefined
    const moduleMasses = input.slice(0, input.length - 1);

    const totalMass = moduleMasses.reduce((total, module) =>
      total + Math.floor(module / 3) - 2, 0);

    // Print final answer
    console.log(`Total mass is: ${totalMass}`);
  } catch (err) {
    console.error(err.message);
  }
}

main();
