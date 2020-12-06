const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
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

    seats.sort((a, b) => a - b)
    let mySeat;

    for (let i = 1; i < seats.length; i++) {
      const prior = seats[i - 1];
      const current = seats[i];

      if (current !== prior + 1) {
        mySeat = current - 1;
        break;
      }
    }
    
    console.log(`Answer is ${mySeat}`);
    // 599
  } catch (err) {
    console.error(err.message);
  }
})();