const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const FLOOR = '.';
    const EMPTY = 'L';
    const OCCUPIED = '#';

    const rawInput = await readFile('input.txt', 'utf-8');
    let original = rawInput.split('\n').map(row => row.split(''));
    let seatsChanged = true;
    let copy;
    let answer = 0;

    while (seatsChanged) {
      seatsChanged = false;
      copy = original.map(inner => inner.slice());

      for (let x = 0; x < original.length; x++) {
        for (let y = 0; y < original[0].length; y++) {
          const current = original[x][y];
          const up = x - 1 >= 0 ? original[x - 1][y] : '';
          const down = x + 1 < original.length ? original[x + 1][y] : '';
          const left = y - 1 >= 0 ? original[x][y - 1] : '';
          const right = y + 1 < original[0].length ? original[x][y + 1] : '';
          const upLeft = x - 1 >= 0 && y - 1 >= 0 ? original[x - 1][y - 1] : '';
          const upRight = x - 1 >= 0 && y + 1 < original[0].length ? original[x - 1][y + 1] : '';
          const downLeft = x + 1 < original.length && y - 1 >= 0 ? original[x + 1][y - 1] : '';
          const downRight = x + 1 < original.length && y + 1 < original[0].length ? original[x + 1][y + 1] : '';
          const adjacent = up + down + left + right + upLeft + upRight + downLeft + downRight;

          // floor doesn't change
          if (current === FLOOR) {
            continue;
          }

          // seat empty and no adj occuped seats = occupied
          if (current === EMPTY && !adjacent.includes(OCCUPIED)) {
            copy[x][y] = OCCUPIED;
            seatsChanged = true;
            continue;
          }

          // seat is occupied and four or more seats adjacent to it are also occupied, the seat becomes empty
          if (current === OCCUPIED &&
            (adjacent.match(/[#]/g) || []).length >= 4) {
              copy[x][y] = EMPTY;
              seatsChanged = true;
          }
        }
      }

      original = copy;
    }

    // count number of occupied seats
    for (let x = 0; x < copy.length; x++) {
      for (let y = 0; y < copy[0].length; y++) {
        if (copy[x][y] === OCCUPIED) {
          answer++;
        }
      }
    }

    console.log(`Answer is ${answer}`);
    // 2386
  } catch (err) {
    console.error(err.message);
  }
})();