const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const adapters = rawInput
      .split('\n')
      .map(item => Number(item));

    // add beginning and end numbers
    adapters.push(0, Math.max(...adapters) + 3)
    adapters.sort((a, b) => a - b);
    
    function countCombos (nums, memo = {}) {
      const key = nums.join(',');
      if (key in memo) {
        return memo[key];
      }

      let result = 1;
      for (let i = 1; i < nums.length - 1; i++) {
        if (nums[i + 1] - nums[i - 1] <= 3) {
          // ok to remove the number
          const removed = [ nums[i - 1], ...nums.slice(i + 1) ];
          result += countCombos(removed, memo);
        }
      }

      memo[key] = result;
      return result;
    }

    console.log(countCombos(adapters));
    // answer is 21156911906816
  } catch (err) {
    console.error(err.message);
  }
})();