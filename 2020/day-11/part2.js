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

          // floor doesn't change
          if (current === FLOOR) {
            continue;
          }

          // first visible seat in all directions
          let numOccupied = 0;
          
          // up visible direction
          let moveUp = x - 1;
          while (moveUp >= 0) {
            const itemAbove = original[moveUp][y];

            if (itemAbove === OCCUPIED) {
              numOccupied++;
              break;
            }

            if (itemAbove === EMPTY) {
              break;
            }
            moveUp--;
          }

          // down visible direction
          let moveDown = x + 1;
          while (moveDown < original.length) {
            const itemBelow = original[moveDown][y];
            
            if (itemBelow === OCCUPIED) {
              numOccupied++;
              break;
            }

            if (itemBelow === EMPTY) {
              break;
            }
            moveDown++;
          }

          // right visible direction
          let moveRight = y + 1;
          while (moveRight < original[0].length) {
            const itemRight = original[x][moveRight];
            
            if (itemRight === OCCUPIED) {
              numOccupied++;
              break;
            }

            if (itemRight === EMPTY) {
              break;
            }
            moveRight++;
          }

          // left visible direction
          let moveLeft = y - 1;
          while (moveLeft >= 0) {
            const itemLeft = original[x][moveLeft];
            
            if (itemLeft === OCCUPIED) {
              numOccupied++;
              break;
            }

            if (itemLeft === EMPTY) {
              break;
            }
            moveLeft--;
          }

          // upLeft visible direction
          moveUp = x - 1;
          moveLeft = y - 1
          while (moveUp >= 0 && moveLeft >= 0) {
            const itemUpLeft = original[moveUp][moveLeft];
            
            if (itemUpLeft === OCCUPIED) {
              numOccupied++;
              break;
            }

            if (itemUpLeft === EMPTY) {
              break;
            }
            moveUp--;
            moveLeft--;
          }

          // upRight visible direction
          moveUp = x - 1;
          moveRight = y + 1
          while (moveUp >= 0 && moveRight < original[0].length) {
            const itemUpRight = original[moveUp][moveRight];
            
            if (itemUpRight === OCCUPIED) {
              numOccupied++;
              break;
            }

            if (itemUpRight === EMPTY) {
              break;
            }
            moveUp--;
            moveRight++;
          }

          // downLeft visible direction
          moveDown = x + 1;
          moveLeft = y - 1;
          while (moveDown < original.length && moveLeft >= 0) {
            const itemDownLeft = original[moveDown][moveLeft];
            
            if (itemDownLeft === OCCUPIED) {
              numOccupied++;
              break;
            }

            if (itemDownLeft === EMPTY) {
              break;
            }
            moveDown++;
            moveLeft--;
          }

          // downRight visible direction
          moveDown = x + 1;
          moveRight = y + 1;
          while (moveDown < original.length && moveRight < original[0].length) {
            const itemDownRight = original[moveDown][moveRight];
            
            if (itemDownRight === OCCUPIED) {
              numOccupied++;
              break;
            }

            if (itemDownRight === EMPTY) {
              break;
            }
            moveDown++;
            moveRight++;
          }

          // empty seat that sees no occupied seats = occupied
          if (current === EMPTY && numOccupied === 0) {
            copy[x][y] = OCCUPIED;
            seatsChanged = true;
            continue;
          }

          // occupied seat that sees five or more visible occupied seats = empty
          if (current === OCCUPIED && numOccupied >= 5) {
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
    // Answer is 2091
  } catch (err) {
    console.error(err.message);
  }
})();