const fs = require('fs/promises');

(async function () {
  const rawInput = await fs.readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');
  let answer;

  // answer here

  console.log(`Answer is ${answer}`);
})();