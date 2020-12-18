const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const input = rawInput.split('\n');
    const memory =  {};
    let mask;

    for (const line of input) {
      if (line.startsWith('mask')) {
        mask = line.slice(7);
        continue;
      }

      // parse out values from the input
      const memoryAddress = line.slice(4, line.indexOf(']'));
      const decimal = line.slice(line.indexOf('=') + 2);

      const binary = Number(decimal).toString(2);
      let thirtySixBitBinary = ('0'.repeat(36 - binary.length) + binary).split('');

      for (let i = 0; i < mask.length; i++) {
        const currMaskBit = mask[i];

        if (currMaskBit === 'X') {
          continue;
        }

        if (currMaskBit === '1')  {
          thirtySixBitBinary[i] = '1';
        }

        if (currMaskBit === '0')  {
          thirtySixBitBinary[i] = '0';
        }
      }

      thirtySixBitBinary = thirtySixBitBinary.join('');
      memory[memoryAddress] = parseInt(thirtySixBitBinary, 2);
    }

    let answer = 0;
    for (const key in memory) {
      answer += memory[key];
    }

    console.log(`Answer is ${answer}`);
    // 12610010960049
  } catch (err) {
    console.error(err.message);
  }
})();