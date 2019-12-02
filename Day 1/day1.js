const { promisify } = require('util');
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

async function main () {
  try {
    const rawInput = await readFilePromise('input.txt', 'utf-8');
    const moduleMasses = rawInput.split('\n');

    const totalMass = moduleMasses.reduce((total, module) => {
      const fuelRequired = Math.floor(module / 3) - 2;
      if (module) {
        return total + fuelRequired;
      } else {
        // When splitting on \n the last item in the array is undefined
        return total;
      }
    }, 0);

    console.log(`Total mass is: ${totalMass}`);
  } catch (err) {
    console.error(err.message);
  }
}

main();
