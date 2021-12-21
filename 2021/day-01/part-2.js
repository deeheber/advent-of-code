import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-01/input.txt', 'utf-8');
  const depths = rawInput.split('\n').map(x => Number(x));

  let previous;
  let increases = 0;

  for (let i = 0; i < depths.length; i++) {
      const first = depths[i];
      const second = depths[i + 1];
      const third = depths[i + 2];
      const current = first + second + third;

      // We are at the end
      if (!second || !third) {
          break;
      }

      // First item
      if (!previous) {
          previous = current;
          continue;
      }

      if (current > previous) {
        increases += 1;
      }

      previous = current;
  }

  console.log(`Answer is: ${increases}`)
} catch (err) {
  console.error(`There was an error: ${err}`);
}