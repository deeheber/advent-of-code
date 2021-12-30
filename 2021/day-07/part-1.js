import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-07/input.txt', 'utf-8');
  const crabPositions = rawInput.split(',');

  let prevFuel;
  let position = 1;

  while (true) {
    let currFuel = 0;

    for (const crabPosition of crabPositions) {
      currFuel += Math.abs(crabPosition - position);
    }

    if (prevFuel && (currFuel > prevFuel)) {
      break;
    }

    prevFuel = currFuel;
    position++;
  }

  console.log(`Answer is ${prevFuel} fuel at position ${position - 1}`);
  // 356992
} catch (err) {
  console.error(`There was an error: ${err}`);
}
