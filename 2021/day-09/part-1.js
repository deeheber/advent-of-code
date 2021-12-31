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

  let answer = 0;

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

      const riskLevel = 1 + height;
      answer += riskLevel;
    }
  }

  console.log(`Answer is ${answer}`);
  // 580
} catch (err) {
  console.error(`There was an error: ${err}`);
}
