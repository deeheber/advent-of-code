import { readFile } from 'fs/promises';

try {
  const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const rawInput = await readFile('day-03/input.txt', 'utf-8');
  const rucksacks = rawInput.split('\n');
  let answer = 0;

  for (const rucksack of rucksacks) {
    const middleIndex = rucksack.length / 2;
    const beginningStr = rucksack.substring(0, middleIndex);
    const endingStr = rucksack.substring(middleIndex);

    const beginningSet = new Set(beginningStr.split(''));
    const endingSet = new Set(endingStr.split(''));
    const intersectSet = new Set([...beginningSet].filter((x) => endingSet.has(x)));

    const repeatedItem = intersectSet[Symbol.iterator]().next().value;
    answer += priorities.indexOf(repeatedItem) + 1;
  }
  // 8053
  console.log(`Answer is: ${answer}`);
} catch (err) {
  console.error(`There was an error: ${err}`);
}
