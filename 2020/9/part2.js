const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const numbers = rawInput.split('\n').map(number => Number(number));
    let start = 0;
    let end = 24;
    let invalidNumber;

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
        invalidNumber = targetVal;
        break;
      }

      start++;
      end++;
    }

    start = 0;
    end = 1;
    let testedNums = [numbers[start]];

    while (start < numbers.length - 1) {
      testedNums.push(numbers[end]);
      const sum = testedNums.reduce((a, b) => a + b, 0);

      if (sum === invalidNumber) {
        // we found the combo
        break;
      }

      if (sum > invalidNumber) {
        // reset to find another combo
        start++;
        end = start + 1;
        testedNums = [numbers[start]];
      } else {
        end++;
      }
    }

    const largest = Math.max.apply(null, testedNums);
    const smallest = Math.min.apply(null, testedNums);

    console.log(`Answer is ${largest + smallest}`);
    // 438559930
  } catch (err) {
    console.error(err.message);
  }
})();