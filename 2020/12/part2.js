// Note: this part is not complete
// If you run it you'll get an incorrect answer
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const actions = rawInput.split('\n');

    // waypoint starts 10 east and 1 north
    // [ west/east, south/north ] -/+
    let waypoint = [10, 1];
    let ship = [0, 0];
    // x, y pos or neg
    const quadrants = [['+', '+'], ['+', '-'], ['-', '-'], ['-', '+']];
    let currentQuad = 0;
    for (const action of actions) {
      const direction = action[0];
      const value = Number(action.slice(1));

      // N S W E => move waypoint
      switch (direction) {
        case 'N':
          waypoint[1] += value;
          break;
        case 'S':
          waypoint[1] -= value;
          break;
        case 'W':
          waypoint[0] -= value;
          break;
        case 'E':
          waypoint[0] += value;
          break;
        default:
          break;
      }

      // L => rotate waypoint left (counter clockwise)
      if (direction === 'L') {
        let numMoves = value / 90;
        // negative
        while (numMoves > 0) {
          if (currentQuad - 1 < 0) {
            currentQuad = quadrants.length - 1;
          } else {
            currentQuad--;
          }
          numMoves--;
        }

        const [we, sn] = quadrants[currentQuad];
        const copy = [ ...waypoint];

        if (we === '-') {
          waypoint[0] = -Math.abs(copy[1]);
        } else if (we === '+') {
          waypoint[0] = Math.abs(copy[1]);
        }

        if (sn === '-') {
          waypoint[1] = -Math.abs(copy[0]);
        } else if (sn === '+') {
          waypoint[1] = Math.abs(copy[0]);
        }
      }

      // R => rotate waypoint right (clockwise)
      if (direction === 'R') {
        let numMoves = value / 90;
        // positive
        while (numMoves > 0) {
          if (currentQuad + 1 === quadrants.length) {
            currentQuad = 0;
          } else {
            currentQuad++;
          }
          numMoves--;
        }

        const [we, sn] = quadrants[currentQuad];
        const copy = [ ...waypoint];

        if (we === '-') {
          waypoint[0] = -Math.abs(copy[1]);
        } else if (we === '+') {
          waypoint[0] = Math.abs(copy[1]);
        }

        if (sn === '-') {
          waypoint[1] = -Math.abs(copy[0]);
        } else if (sn === '+') {
          waypoint[1] = Math.abs(copy[0]);
        }
      }

      // F => move forward to the waypoint a # of times equal to the value
      if (direction === 'F') {
        // west/east south/north
        const sums = [ (waypoint[0] * value), (waypoint[1] * value) ];
        ship = [(ship[0] + sums[0]), (ship[1] + sums[1])];
      }
      console.log(action);
      console.log('Ship ', ship);
      console.log('Waypoint ', waypoint);
      console.log('-------------------');
    }

    const answer = Math.abs(ship[0]) + Math.abs(ship[1]);
    console.log(`Answer is ${answer}`);
    // 15611 is too low
  } catch (err) {
    console.error(err.message);
  }
})();