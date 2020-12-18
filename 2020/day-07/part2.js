const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const rules = rawInput.split('\n');
    const bags = {};

    // build bags lookup dictionary
    for (const rule of rules) {
      const rootRegex = /^([a-z]+ [a-z]+) bags/;
      const childrenRegex = /(\d) ([a-z]+ [a-z]+) bags?/g;

      const root = rootRegex.exec(rule)[1]
      const children = {};
      let match = childrenRegex.exec(rule);

      while (match) {
        const color = match[2];
        const count = Number(match[1]);

        children[color] = count;
        match = childrenRegex.exec(rule);
      }

      bags[root] = children;
    }

    const answer = countBags('shiny gold');

    function countBags(color) {
      let total = 0;
      const innerBags = bags[color];

      for (const color in innerBags) {
        const count = innerBags[color];

        total += innerBags[color];
        total += countBags(color) * count;
      }

      return total;
    }

    console.log(`Answer is ${answer}`);
    // 20189
  } catch (err) {
    console.error(err.message);
  }
})();
