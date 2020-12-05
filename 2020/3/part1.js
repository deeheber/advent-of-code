const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const input = rawInput.split('\n');
    const rowLength = input[0].length;
    let current = 0;
    let treeCount = 0;

    for (let i = 0; i < input.length; i++) {
      const row = input[i];

      if (i > 0 && row[current] === '#') {
        treeCount++;
        // console.log(row.substr(0, current) + 'X' + row.substr(current + 1));
      } else {
        // console.log(row.substr(0, current) + 'O' + row.substr(current + 1));
      }

      // Move right three
      for (let i = 0; i < 3; i++) {
        current++;
        // We reached the end, so restart
        if (current >= rowLength) {
          current = 0;
        }
      }
    }

    console.log(`Answer is ${treeCount}`);
    // 214 trees
  } catch (err) {
    console.error(err.message);
  }
})();