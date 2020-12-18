const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

async function getTreeCount (right, down) {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const input = rawInput.split('\n').map(row => row.split(''));
    const rowLength = input[0].length;

    let row = down;
    let column = right;
    let treeCount = 0;

    while (row < input.length) {
      if (input[row][column] === '#') {
        treeCount++;
      }

      // Move right a set number of times
      for (let i = 0; i < right; i++) {
        column++;
        // We reached the end, so restart
        if (column >= rowLength) {
          column = 0;
        }
      }

      row += down;
    }

    return treeCount;
  } catch (err) {
    console.error(err.message);
  }
};

(async function () {
  const promises = [
    getTreeCount(1, 1),
    getTreeCount(3, 1),
    getTreeCount(5, 1),
    getTreeCount(7, 1),
    getTreeCount(1, 2)
  ];

  const answers = await Promise.all(promises);
  const multiplyAnswers = answers.reduce((acc, curr) => acc * curr, 1);
  console.log(`Answer is ${multiplyAnswers}`);
  // 8336352024
})();