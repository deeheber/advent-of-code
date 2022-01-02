import { readFile } from 'fs/promises';

try {
  const rawInput = await readFile('day-11/input.txt', 'utf-8');
  const levels = rawInput
    .split('\n')
    .map(x =>
      [ ...x].map(str => Number(str))
    );

  let step = 1;

  while (true) {
    // [[x,y], [x,y] ...]
    let flashCoords = [];
    let flashCount = 0;

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

    function getNeighbors([row, col]) {
      /**
       * [row][col]
       * 
       * up > [row - 1][col]
       * upLeft > [row - 1 ][col - 1]
       * upRight > [row - 1][col + 1]
       * left > [row][col - 1]
       * right > [row][col + 1]
       * down > [row + 1][col]
       * downLeft > [row + 1][col - 1]
       * downRight > [row + 1][col + 1]
       */

      let neighbors = [];

      function isOnGrid(val) {
        // 10 x 10 grid
        // Must be between 0 and 9
        return val >= 0 && val < 10;
      }

      // up
      if (isOnGrid(row - 1)) {
        neighbors.push([row - 1, col]);
      }

      // upLeft
      if (isOnGrid(row - 1) && isOnGrid(col - 1)) {
        neighbors.push([row - 1, col - 1]);
      }

      // upRight
      if (isOnGrid(row - 1) && isOnGrid(col + 1)) {
        neighbors.push([row - 1, col + 1]);
      }

      // left
      if (isOnGrid(col - 1)) {
        neighbors.push([row, col - 1]);
      }

      // right
      if (isOnGrid(col + 1)) {
        neighbors.push([row, col + 1]);
      }

      // down
      if (isOnGrid(row + 1)) {
        neighbors.push([row + 1, col]);
      }

      // downLeft
      if (isOnGrid(row + 1) && isOnGrid(col - 1)) {
        neighbors.push([row + 1, col - 1]);
      }

      // downRight
      if (isOnGrid(row + 1) && isOnGrid(col + 1)) {
        neighbors.push([row + 1, col + 1]);
      }

      // [[1,2], [3,4]...];
      return neighbors;
    }

    for (const coords of flashCoords) {
      const neighbors = getNeighbors(coords);
      let q = [...neighbors];

      while (q.length) {
        const [x, y] = q.shift();

        if (levels[x][y] !== 0) {
          // It hasn't been flashed yet => inc value by 1
          // Can only be flashed once per step
          const inc = levels[x][y] + 1;
          levels[x][y] = inc;

          if (inc > 9) {
            // The octopus flashes
            flashCount += 1;
            levels[x][y] = 0;
            // Add neighbors of current flashed octopus to the queue
            const flashedNeighbors = getNeighbors([x, y]);
            flashedNeighbors.forEach(n => q.push(n));
          }
        }
      }
    }

    if (flashCount === 100) {
      console.log(`Answer is step ${step}`);
      // 403
      break;
    }

    step++;
  }

} catch (err) {
  console.error(`There was an error: ${err}`);
}
