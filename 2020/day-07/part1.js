const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const rules = rawInput.split('\n');
    const bags = {};
    let answer = 0;

    // build bags lookup dictionary
    for (const rule of rules) {
      const rootRegex = /^([a-z]+ [a-z]+) bags/;
      const childrenRegex = /(\d) ([a-z]+ [a-z]+) bags?/g;

      const root = rootRegex.exec(rule)[1]
      const children = [];
      let match = childrenRegex.exec(rule);

      while (match) {
        // push the color in
        children.push(match[2]);
        match = childrenRegex.exec(rule);
      }

      bags[root] = children;
    }

    // count shiny gold bags
    for (const bag in bags) {
      answer += containsGold(bag) ? 1 : 0;
    }

    function containsGold (bag) {
      const innerBags = bags[bag];

      if (!innerBags) {
        return false;
      }

      if (innerBags.includes('shiny gold')) {
        return true;
      }

      for (const innerBag of innerBags) {
        if (containsGold(innerBag)) {
          return true;
        }
      }
    }

    console.log(`Answer is ${answer}`);
    // answer is 128
  } catch (err) {
    console.error(err.message);
  }
})();
