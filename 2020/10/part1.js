const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const adapters = rawInput
      .split('\n')
      .map(item => Number(item))
      .sort((a, b) => a - b);

    let currentJoltage = 0;
    let diff1 = 0;
    let diff3 = 0;

    for (const adapter of adapters) {
      const diff = adapter - currentJoltage;

      if (diff === 3) {
        diff3++;
      }

      if (diff === 1) {
        diff1++;
      }

      currentJoltage += diff;
    }
    // device's built-in adapter is always 3 higher
    diff3++;

    console.log(`Answer is ${diff1} differences of 1 and ${diff3} differences of 3.`);
    // 71 differences of 1
    // 34 differences of 3
  } catch (err) {
    console.error(err.message);
  }
})();