const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const numbers = rawInput.split('\n').map(number => Number(number));
    let start = 0;
    let end = 24;
    let answer;

    while (end + 1 < numbers.length) {
      const targetIndex = end + 1;
      const targetVal = numbers[targetIndex];
      const searchArea = numbers.slice(start, end + 1);
      let isValid = false;

      for (let i = 0; i < searchArea.length; i++) {
        const currentVal = searchArea[i];
        const compliment = targetVal - currentVal;
        const complimentIndex = searchArea.indexOf(compliment);

        if (complimentIndex === i) {
          // can't be the same number
          continue;
        }

        if (complimentIndex !== -1) {
          isValid = true;
          break;
        }
      }

      if (!isValid) {
        answer = targetVal;
        break;
      }

      start++;
      end++;
    }

    console.log(`Answer is ${answer}`);
    // answer is 3199139634
  } catch (err) {
    console.error(err.message);
  }
})();