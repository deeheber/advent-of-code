const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const passwords = rawInput.split('\n');
    let validPasswordCount = 0;

    for (let i = 0; i < passwords.length; i++) {
      const parts = passwords[i].split(' ');
      const position1 = parts[0].split('-')[0];
      const position2 = parts[0].split('-')[1];
      const letter = parts[1][0];
      const password = parts[2];

      const matchesPos1 = password[position1 - 1] === letter;
      const matchesPos2 = password[position2 - 1] === letter;

      if (matchesPos1 && matchesPos2) {
        continue;
      }

      if (matchesPos1 || matchesPos2) {
        validPasswordCount++;
      }
    }

    console.log(`Answer is ${validPasswordCount}`);
    // 352
  } catch (err) {
    console.error(err.message);
  }
})();