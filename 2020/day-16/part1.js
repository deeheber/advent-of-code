const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');
  // list of valid values
  const valid = new Set();
  let answer = 0 ;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.includes('or')) {
      // we know this is a rule
      // capture digit-digit
      const ranges = line.match(/(\d*-\d*)/g);

      for (const range of ranges) {
        const hyphen = range.indexOf('-');
        const low = Number(range.slice(0, hyphen));
        const high = Number(range.slice(hyphen + 1));

        for (let j = low; j <= high; j++) {
          valid.add(j);
        }
      }
    } else if (line.includes(',') && !input[i - 1].includes('your ticket:')) {
      // ticket values ignoring your ticket
      const values = line.split(',').map(num => Number(num));
      for (const value of values) {
        if (!valid.has(value)) {
          answer += value;
        }
      }
    }
  }

  console.log(`Answer is ${answer}`);
  // 26869
})();