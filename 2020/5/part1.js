const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input', 'utf-8');
    const boardingPasses = rawInput.split('\n');
    const seats = [];
    
    for (const boardingPass of boardingPasses) {
      let lower = 0;
      let upper = 127;

      // find row
      for (let i = 0; i < boardingPass.length - 3; i++) {
        const current = boardingPass[i];
        const pivot = Math.floor((lower + upper) / 2);

        if (current === 'F') {
          // take the lower half
          upper = pivot;
        } else {
          // take the upper half
          lower = pivot + 1;
        }
      }

      // really it can be lower or upper since they're the same value
      const row = lower;

      // find column
      lower = 0;
      upper = 7;

      for (let i = 7; i < boardingPass.length; i++) {
        const current = boardingPass[i];
        const pivot = Math.floor((lower + upper) / 2);

        if (current === 'L') {
          // take the lower half
          upper = pivot;
        } else {
          // take the upper half
          lower = pivot + 1;
        }
      }

      // really it can be lower or upper since they're the same value
      const column = lower;
      const seat = row * 8 + column;
      seats.push(seat);
    }

    console.log(`Answer is ${Math.max.apply(null, seats)}`);
    // 850
  } catch (err) {
    console.error(err.message);
  }
})();