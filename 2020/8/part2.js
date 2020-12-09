const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const steps = rawInput.split('\n');
    let accumulator;

    for (let i = 0; i < steps.length; i++)  {
      const action = steps[i].slice(0, 3);

      if (action !== 'acc') {
        // nop or jmp
        const reachedEnd = await runProgram(action, i);

        if (reachedEnd) {
          break;
        }
      }
    }

    async function runProgram (originalAction, originalIndex) {
      const stepsClone = [...steps];
      // swap the value
      if (originalAction === 'nop') {
        // switch to jmp
        stepsClone[originalIndex] = `jmp ${steps[originalIndex].slice(4)}`;
      } else {
        // switch to nop
        stepsClone[originalIndex] = `nop ${steps[originalIndex].slice(4)}`;
      }

      accumulator = 0;
      let currentIndex = 0;

      // the current item hasn't been visited or we're at the end
      while (currentIndex < stepsClone.length && !stepsClone[currentIndex].startsWith('***')) {
        const item = stepsClone[currentIndex];
        const action = item.slice(0, 3);
        const direction = item[4];
        const amount = Number(item.slice(5));

        if (action === 'acc') {
          direction === '-'
            ? accumulator -= amount
            : accumulator += amount;

            stepsClone[currentIndex] = item.replace('acc', '***');
          currentIndex++;
        } else if (action === 'jmp') {
          stepsClone[currentIndex] = item.replace('jmp', '***');;

          currentIndex = direction === '-'
            ? currentIndex -= amount
            : currentIndex += amount;
        } else {
          // assuming nop
          stepsClone[currentIndex] = item.replace('nop', '***');
          currentIndex++;
        }
      }

      if (currentIndex >= stepsClone.length) {
        return true;
      }

      return false;
    }

    console.log(`Answer is ${accumulator}`);
    // 1375
  } catch (err) {
    console.error(err.message);
  }
})();