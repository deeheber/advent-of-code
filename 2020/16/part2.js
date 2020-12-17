const { promisify } = require('util');
const fs = require('fs');
const { userInfo } = require('os');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');
  // list of valid values
  const valid = new Set();
  const validTickets  = [];
  const rules = {};
  let myTicket;
  let answer = 1;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.includes('or')) {
      // we know this is a rule
      // capture digit-digit
      const ranges = line.match(/(\d*-\d*)/g);
      const name = line.slice(0, line.indexOf(':'));

      rules[name] = ranges;

      for (const range of ranges) {
        const hyphen = range.indexOf('-');
        const low = Number(range.slice(0, hyphen));
        const high = Number(range.slice(hyphen + 1));

        for (let j = low; j <= high; j++) {
          valid.add(j);
        }
      }
    } else if (line.includes(',') && !input[i - 1].includes('your ticket:')) {
      // ticket values ignoring your ticket
      const values = line.split(',').map(num => Number(num));
      let isValid = true;

      for (const value of values) {
        if (!valid.has(value)) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        validTickets.push(line);
      }
    } else if (line.includes(',') && input[i - 1].includes('your ticket:')) {
      // capture my ticket value
      myTicket = line;
    }
  }

  const labels = [];
  for (const name in rules) {
    labels.push(new Set([ ...Object.keys(rules)]));
  }

  validTickets.push(myTicket);

  validTickets.forEach(ticket => {
    const nums = ticket.split(',').map(num => Number(num));
    for (let i = 0; i < nums.length; i++) {
      const val = nums[i];

      for (const rule in rules) {
        // if the value does not match the rule
        // remove from the set
        const [ first, second ] = rules[rule];

        const hyphen = first.indexOf('-');
        const low = Number(first.slice(0, hyphen));
        const high = Number(first.slice(hyphen + 1));

        const hyphen2 = second.indexOf('-');
        const low2 = Number(second.slice(0, hyphen2));
        const high2 = Number(second.slice(hyphen2 + 1));

        let remove;
        if ((val >= low && val <= high) || (val >= low2 && val <= high2)) {
          remove = false;
        } else {
          remove = true;
        }

        if (remove) {
          labels[i].delete(rule);
        }
      }
    }
  });

  let itemToRemove = 'foobarbaz';
  while (itemToRemove) {
    let nextItemToRemove = false;

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];

      if (typeof label === 'object') {
        label.delete(itemToRemove);
      }

      if (label.size === 1) {
        nextItemToRemove = label.values().next().value;
        // change set to a single string
        labels[i] = nextItemToRemove;
      }
    }

    itemToRemove = nextItemToRemove;
  }


  const myTicketNums = myTicket.split(',').map(num => Number(num));
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];

    if (label.startsWith('departure')) {
      answer *= myTicketNums[i];
    }
  }

  console.log(`Answer is ${answer}`);
  // 855275529001
})();