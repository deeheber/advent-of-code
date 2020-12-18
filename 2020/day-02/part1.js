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
      const low = parts[0].split('-')[0];
      const high = parts[0].split('-')[1];
      const letter = parts[1][0];
      const password = parts[2];
      let count = 0;

      for (const character of password) {
        if (character === letter) {
          count++;
        }
      }

      if (count >= low && count <= high) {
        validPasswordCount++;
      }
    }

    console.log(`Answer is ${validPasswordCount}`);
    // 586
  } catch (err) {
    console.error(err.message);
  }
})();