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
    // x = west/east y = south/north
    let waypoint = { x: 10, y: 1 };
    let ship = { x: 0, y: 0 };

    for (const action of actions) {
      const direction = action[0];
      const value = Number(action.slice(1));
      
      switch (direction) {
        case 'N':
          waypoint.y += value;
          break;
        case 'S':
          waypoint.y -= value;
          break;
        case 'E':
          waypoint.x += value;
          break;
        case 'W':
          waypoint.x -= value;
          break;
        case 'L':
          for (let i = 0; i < value; i+= 90) {
            const copy = waypoint.x;
            waypoint.x = waypoint.y * -1;
            waypoint.y = copy;
          }
          break;
        case 'R':
          for (let i = 0; i < value; i+= 90) {
            const copy = waypoint.x * -1;
            waypoint.x = waypoint.y;
            waypoint.y = copy;
          }
          break;
        case 'F':
          ship.x += (waypoint.x * value);
          ship.y += (waypoint.y * value);
          break;
        default:
          break;
      }
    }

    const answer = Math.abs(ship.x) + Math.abs(ship.y);
    console.log(`Answer is ${answer}`);
    // 26841
  } catch (err) {
    console.error(err.message);
  }
})();