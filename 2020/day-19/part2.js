const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');

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

  rules['0'] = '8 11';
  rules['8'] = '42 | 42 8'; // 42 at least once
  rules['11'] = '42 31 | 42 11 31'; // 42{n}31{n}

  computeRegex(rules[42], rules);
  computeRegex(rules[31], rules);

  const rule = new RegExp(`^(?<group42>(${cache[rules[42]]}+)+)(?<group31>(${cache[rules[31]]}+)+)$`);

  let answer = 0;
  for (const line of input) {
    // skip rules
    if (line.includes(':')) {
      continue;
    } else {
      const matches = rule.exec(line);

      if(matches) {
        const { groups } = matches;
        const matches42 = groups.group42.match(new RegExp(cache[rules[42]], 'g')).length;
        const matches31 = groups.group31.match(new RegExp(cache[rules[31]], 'g')).length;
        if(matches42 > matches31) {
            answer++;
        }
    }
    }
  }
  console.log(`Answer is ${answer}`);
  // 228
})();