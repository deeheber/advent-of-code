import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-01/input.txt', 'utf-8');
  const depths = rawInput.split('\n').map(x => Number(x));

  let previous;
  let increases = 0;

  for (const depth of depths) {
    // Skip the first item
    if (!previous) {
      previous = depth;
      continue;
    }

    // Did it increase???
    if (depth > previous) {
      increases += 1;
    }

    previous = depth;
  }

  console.log(`Answer is: ${increases}`)
} catch (err) {
  console.error(`There was an error: ${err}`);
}
