const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');

  // set up dict for rules
  // ruleNum: value
  const rules = {};
  for (const line of input) {
    if (line.includes(':')) {
      const seperator = line.indexOf(':');
      const key = line.slice(0, seperator);
      const value = line.slice(seperator + 2);
      rules[key] = value;
    } else {
      // we don't care about the line input yet
      break;
    }
  }

  // generate large regex
  // value : regex
  const cache = {};
  function computeRegex (value, rules) {
    // memoize results
    if (value in cache) {
      return cache[value];
    }

    let result = '';
    if (/^".*"$/.test(value)) {
      // just a string value
      result = value.replace(/"/g, '');
    } else if (/\|/.test(value)) {
      // there's a |
      const options = value.split(' | ')
      result = `(${computeRegex(options[0], rules)}|${computeRegex(options[1], rules)})`;
    } else {
      const keys = value.split(' ');
      result = keys.map(key => computeRegex(rules[key], rules)).join('');
    }

    cache[value] = result;
    return result;
  }

  computeRegex(rules[0], rules);
  const mainRegex = new RegExp(`^${cache[rules[0]]}$`);

  // apply regex to each line => count num messages that match
  let answer = 0;
  for (const line of input) {
    // skip rules
    if (line.includes(':')) {
      continue;
    } else {
      if (mainRegex.test(line)) {
        answer++;
      }
    }
  }
  console.log(`Answer is ${answer}`);
  // 124
})();