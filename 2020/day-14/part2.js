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

      const address = line.slice(4, line.indexOf(']'));
      const value = Number(line.slice(line.indexOf('=') + 2));

      // convert address from decimal to binary and make 36 bit
      const binary = Number(address).toString(2);
      let thirtySixBitBinary = binary.padStart(36, '0').split('');

      // apply the mask
      const floatIndexes = [];
      for (let i = 0; i < mask.length; i++) {
        const currMaskBit = mask[i];

        if (currMaskBit === '0') {
          continue;
        }

        if (currMaskBit === '1')  {
          thirtySixBitBinary[i] = '1';
        }

        if (currMaskBit === 'X')  {
          thirtySixBitBinary[i] = 'X';
          floatIndexes.push(i);
        }
      }

      // calculate floating point values
      const combos = [];
      for (let i = 0; i < 2**floatIndexes.length; i++) {
        // count from 0 to floatIndexes.length in binary
        // pad front of string with 0s to match the floatIndex.length
        combos.push(i.toString(2).padStart(floatIndexes.length, '0'));
      }

      for (const combo of combos) {
        for (let i = 0; i < combo.length; i++) {
          thirtySixBitBinary[floatIndexes[i]] = combo[i];
        }
        // convert memory address from binary to decimal and set the value
        const key = parseInt(thirtySixBitBinary.join(''), 2);
        memory[key] = value;
      }
    }

    let answer = 0;
    for (const key in memory) {
      answer += memory[key];
    }

    console.log(`Answer is ${answer}`);
    // 3608464522781
  } catch (err) {
    console.error(err.message);
  }
})();