import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-09/input.txt', 'utf-8');
  /**
  * Parse the map into a 2d array
  * ex:
  * [[1,2,3], [4,5,6], [7,8,9]]
  */
  const map = rawInput
    .split('\n')
    .reduce((allItems, currItem) =>
      [...allItems, currItem.split('').map(str => Number(str))]
    , []);

  // Arr of [[x, y, val], [x, y, val] ...]
  // Low points are where each basin starts
  let lowPoints = [];

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      // current height
      const height = map[row][col];

      // Up
      if ((row - 1) >= 0) {
        // neighbor above is on the grid
        if (height >= map[row - 1][col]) {
          // height is more than neighbor
          // move to next spot
          continue;
        }
      }

      // Down
      if ((row + 1) < map.length) {
        // neighbor is on the grid
        if (height >= map[row + 1][col]) {
          // height is more than neighbor
          // move to next spot
          continue;
        }
      }

      // Left
      if ((col - 1) >= 0) {
        // neighbor is on the grid
        if (height >= map[row][col - 1]) {
          // height is more than neighbor
          // move to next spot
          continue;
        }
      }

      // Right
      if ((col + 1) < map[0].length) {
        // neighbor is on the grid
        if (height >= map[row][col + 1]) {
          // height is more than neighbor
          // move to next spot
          continue;
        }
      }

      lowPoints.push([row, col, map[row][col]]);
    }
  }

  const basinSizes = [];

  for (const lowPoint of lowPoints) {
    const [row, col, val] = lowPoint;
    let basinSizeCounter = 1;
    let q = [];

    // Mark as visited
    map[row][col] = '*';
    q.push([row, col, val]);

    while (q.length) {
      const [x, y, value] = q.shift();

      // Up
      const up = x - 1;
      // Does neighbor exist and is it unvisited
      if ((up >= 0) && (map[up][y] !== '*')) {
        const neighborVal = map[up][y];
        // Is the neighbor value greater and not 9
        if ((neighborVal !== 9) && (neighborVal > value)) {
          q.push([up, y, neighborVal]);
          basinSizeCounter++;
          // Mark visited
          map[up][y] = '*';
        }
      }

      // Down
      const down = x + 1;
      // Does neighbor exist and is it unvisited
      if ((down < map.length) && (map[down][y] !== '*')) {
        const neighborVal = map[down][y];
        // Is the neighbor value greater and not 9
        if ((neighborVal !== 9) && (neighborVal > value)) {
          q.push([down, y, neighborVal]);
          basinSizeCounter++;
          // Mark visited
          map[down][y] = '*';
        }
      }

      // Left
      const left = y - 1;
      // Does neighbor exist and is it unvisited
      if ((left >= 0) && (map[x][left] !== '*')) {
        const neighborVal = map[x][left];
        // Is the neighbor value greater and not 9
        if ((neighborVal !== 9) && (neighborVal > value)) {
          q.push([x, left, neighborVal]);
          basinSizeCounter++;
          // Mark visited
          map[x][left] = '*';
        }
      }

      // Right
      const right = y + 1;
      // Does neighbor exist and is it unvisited
      if ((right < map[0].length) && (map[x][right] !== '*')) {
        const neighborVal = map[x][right];
        // Is the neighbor value greater and not 9
        if ((neighborVal !== 9) && (neighborVal > value)) {
          q.push([x, right, neighborVal]);
          basinSizeCounter++;
          // Mark visited
          map[x][right] = '*';
        }
      }
    }

    // Current basinSize to all basinSizes
    basinSizes.push(basinSizeCounter);
  }

  // Sort hightest => lowest
  // Take top three positions
  // Multiply top three positions for answer
  console.log(
    basinSizes
      .sort((a,b) => b - a)
      .slice(0, 3)
      .reduce((prior, curr) => prior *= curr, 1)
  );
  // 856716
} catch (err) {
  console.error(`There was an error: ${err}`);
}