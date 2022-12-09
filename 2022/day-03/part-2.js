import { readFile } from 'fs/promises';

try {
  const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const rawInput = await readFile('day-03/input.txt', 'utf-8');
  const rucksacks = rawInput.split('\n');
  let answer = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const first = rucksacks[i];
    const second = rucksacks[i + 1];
    const third = rucksacks[i + 2];

    const firstSet = new Set(first.split(''));
    const secondSet = new Set(second.split(''));
    const thirdSet = new Set(third.split(''));

    const firstSecondIntersect = new Set([...firstSet].filter((x) => secondSet.has(x)));
    const secondThirdIntersect = new Set([...secondSet].filter((x) => thirdSet.has(x)));
    const finalIntersect = new Set([...firstSecondIntersect].filter((x) => secondThirdIntersect.has(x)));
    const repeatedItem = finalIntersect[Symbol.iterator]().next().value;

    answer += priorities.indexOf(repeatedItem) + 1;
  }
  // 2425
  console.log(`Answer is: ${answer}`);
} catch (err) {
  console.error(`There was an error: ${err}`);
}
