import { readFile } from 'fs/promises';

try {
  const rawInput = await readFile('day-11/input.txt', 'utf-8');
  const levels = rawInput
    .split('\n')
    .map(x =>
      [ ...x].map(str => Number(str))
    );

  let flashCount = 0;
  let step = 1;

  while (step < 4) {
    console.log(`after STEP ${step - 1} -----------`)
    console.log(levels);
    // [[x,y], [x,y] ...]
    let flashCoords = [];

    for (let row = 0; row < levels.length; row++) {
      for (let col = 0; col < levels[0].length; col++) {
        // Increment each spot by 1
        const inc = levels[row][col] + 1;
        levels[row][col] = inc;

        if (inc > 9) {
          // The octopus flashes
          flashCount += 1;
          levels[row][col] = 0;
          flashCoords.push([row, col]);
        }
      }
    }

    // console.log(flashCoords);
    // TODO after step 2
    // Loop through flashCoords
      // init a queue
      // add current coords neighbors (8 at most) to the queue
      // while there's items in the queue
        // pull from the front q.shift()
          // if it hasn't been flashed yet (value !== 0)
            // inc the value by 1
            // if new value after inc > 9
              // flashCount++
              // add neighbors (8 at most) to the queue
    step++;
  }

  // console.log(`Flash count ${flashCount}`);
  // console.log(levels)
} catch (err) {
  console.error(`There was an error: ${err}`);
}