const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const steps = rawInput.split('\n');

    for (let i = 0; i < steps.length; i++)  {
      const action = steps[i].slice(0, 3);

      if (action !== 'acc') {
        // nop or jmp
        const accumulator = await runProgram(action, i, steps);

        if (accumulator) {
          console.log(`Answer is ${accumulator}`);
          // 1375
          return;
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  }
})();

async function runProgram (originalAction, originalIndex, steps) {
  let accumulator = 0;
  let currentIndex = 0;
  let visited = new Set();

  // swap the value
  if (originalAction === 'nop') {
    // switch to jmp
    steps[originalIndex] = `jmp ${steps[originalIndex].slice(4)}`;
  } else {
    // switch to nop
    steps[originalIndex] = `nop ${steps[originalIndex].slice(4)}`;
  }

  while (currentIndex < steps.length) {
    const item = steps[currentIndex];
    const action = item.slice(0, 3);
    const direction = item[4];
    const amount = Number(item.slice(5));

    if (visited.has(currentIndex)) {
      // put values back to try another combo
      if (originalAction === 'nop') {
        steps[originalIndex] = `nop ${steps[originalIndex].slice(4)}`;
      } else {
        steps[originalIndex] = `jmp ${steps[originalIndex].slice(4)}`;
      }

      // this is an infinite loop
      return false;
    }

    if (action === 'acc') {
      direction === '-'
        ? accumulator -= amount
        : accumulator += amount;

      visited.add(currentIndex);
      currentIndex++;
    } else if (action === 'jmp') {
      visited.add(currentIndex);

      currentIndex = direction === '-'
        ? currentIndex -= amount
        : currentIndex += amount;
    } else {
      // assuming nop
      visited.add(currentIndex);
      currentIndex++;
    }
  }

  // reached the end
  return accumulator;
}
