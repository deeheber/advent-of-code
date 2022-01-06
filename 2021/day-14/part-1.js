import { readFile } from 'fs/promises';

try {
  // Parse input
  const rawInput = await readFile('day-14/input.txt', 'utf-8');
  const lines = rawInput.split('\n');

  let template = lines[0].split('');
  let pairs = new Map();

  for (let i = 2; i < lines.length; i++) {
    const [pair, value] = lines[i].split(' -> ');
    pairs.set(pair, value);
  }

  // Insert values over 10 steps
  let step = 1;

  while (step < 11) {
    for (let i = 0; i < (template.length - 1); i += 2) {
      const first = template[i];
      const second = template[i + 1];
      const pair = first.concat(second);
      const charToInsert = pairs.get(pair);
  
      template.splice(i + 1, 0, charToInsert);
    }

    step++;
  }

  // Count how many ocurrences of each value
  const counts = template
    .reduce((carry, val) => {
      const index = carry.findIndex(el => el[0] === val);
      if (index === -1) {
        carry.push([val, 1]);
      } else {
        carry[index][1] = carry[index][1] + 1;
      }
      return carry;
    }, [])
    .sort((a, b) => b[1] - a[1]);
  
  console.log(`Answer is ${counts[0][1] - counts[counts.length -1 ][1]}`);
  // 2621
} catch (err) {
  console.error(`There was an error: ${err}`);
}
