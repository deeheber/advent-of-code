const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const steps = rawInput.split('\n');
    let accumulator = 0;
    let currentIndex = 0;

    while (steps[currentIndex] !== 'visited') {
      const item = steps[currentIndex];
      const action = item.slice(0, 3);
      const direction = item[4];
      const amount = Number(item.slice(5));

      if (action === 'acc') {
        direction === '-'
          ? accumulator -= amount
          : accumulator += amount;

        steps[currentIndex] = 'visited';
        currentIndex++;
      } else if (action === 'jmp') {
        steps[currentIndex] = 'visited';

        currentIndex = direction === '-'
          ? currentIndex -= amount
          : currentIndex += amount;
      } else {
        // assuming nop
        steps[currentIndex] = 'visited';
        currentIndex++;
      }
    }

    console.log(`Answer is ${accumulator}`);
    // 1548
  } catch (err) {
    console.error(err.message);
  }
})();