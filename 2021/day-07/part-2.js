import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-07/input.txt', 'utf-8');
  const crabPositions = rawInput.split(',');

  let prevFuel;
  let position = 1;

  while (true) {
    let currFuel = 0;

    for (const crabPosition of crabPositions) {
      for (let inc = 1; inc <= Math.abs(crabPosition - position); inc++) {
        currFuel += inc;
      }
    }

    if (prevFuel && (currFuel > prevFuel)) {
      break;
    }

    prevFuel = currFuel;
    position++;
  }

  console.log(`Answer is ${prevFuel} fuel at position ${position - 1}`);
  // 101268110 position 489
} catch (err) {
  console.error(`There was an error: ${err}`);
}
