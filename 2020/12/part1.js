const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const actions = rawInput.split('\n');

    const dirs = ['E', 'S', 'W', 'N'];
    // start facing East
    let currentDir = 0;
    let x = 0;
    let y = 0;
    for (const action of actions) {
      const direction = action[0];
      const value = Number(action.slice(1));
      // N S W E => move
      switch (direction) {
        case 'N':
          y += value;
          break;
        case 'S':
          y -= value;
          break;
        case 'E':
          x += value;
          break;
        case 'W':
          x -= value;
          break;
        default:
          break;
      }

      // L R => alter direction
      if (direction === 'L') {
        let numMoves = value / 90;
        // negative
        while (numMoves > 0) {
          if (currentDir - 1 < 0) {
            currentDir = dirs.length - 1;
          } else {
            currentDir--;
          }
          numMoves--;
        }
      }

      if (direction === 'R') {
        let numMoves = value / 90;
        // positive
        while (numMoves > 0) {
          if (currentDir + 1 === dirs.length) {
            currentDir = 0;
          } else {
            currentDir++;
          }
          numMoves--;
        }
      }

      // F move in the direction currently facing
      if (direction === 'F') {
        const directionFacing = dirs[currentDir];
        switch (directionFacing) {
          case 'N':
            y += value;
            break;
          case 'S':
            y -= value;
            break;
          case 'E':
            x += value;
            break;
          case 'W':
            x -= value;
            break;
          default:
            break;
        }
      }
    }

    const answer = Math.abs(x) + Math.abs(y);
    console.log(`Answer is ${answer}`);
    // 636
  } catch (err) {
    console.error(err.message);
  }
})();