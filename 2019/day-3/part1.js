// starting point is (0, 0)
// draw where two wires are
// get where they intersect
// get location closest to the starting point

// Test cases
// const wire1 = ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'];
// const wire2 = ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'];
// distance = 159

// const wire1 = ['R98', 'U47', 'R26', 'D63', 'R33', 'U87', 'L62', 'D20', 'R33', 'U53', 'R51'];
// const wire2 =  ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'];
// distance = 135

const { promisify } = require('util');
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

async function main () {
  const document = await readFilePromise('input.txt', 'utf-8');
  const values = document.split('\n');

  const wire1 = values[0].split(',');
  const wire2 = values[1].split(',');

  const wire1Cords = getWireCordinates(wire1);
  const wire2Cords = getWireCordinates(wire2);

  getDistance(wire1Cords, wire2Cords);
}

main();

function getDistance (path1, path2) {
  let distance = null;
  const intersections = new Set([...path1].filter(x => path2.has(x)));
  // same starting position is a given, so this doesn't count
  intersections.delete('0#0');

  for (const intersection of intersections.keys()) {
    const [ x, y ] = intersection.split('#').map(x => Number(x));

    const currentDistance = Math.abs(x) + Math.abs(y);
    if (distance === null || currentDistance < distance) {
      distance = currentDistance;
    }
  }

  console.log('final distance ', distance);
  // 1017
}

function getWireCordinates (wire) {
  const coordinates = new Set();
  let x = 0;
  let y = 0;

  for (let i = 0; i < wire.length; i++) {
    const direction = wire[i].charAt(0);
    const distance = Number(wire[i].slice(1));

    if (direction === 'L') {
    // x subtract
      for (let counter = 0; counter <= distance; counter++) {
        const key = `${x - counter}#${y}`
        coordinates.add(key);
      }
      x -= distance;
    }

    if (direction === 'R') {
      // x add
      for (let counter = 0; counter <= distance; counter++) {
        const key = `${x + counter}#${y}`;
        coordinates.add(key);
      }
      x += distance;
    }

    if (direction === 'U') {
      // y add
      for (let counter = 0; counter <= distance; counter++) {
        const key = `${x}#${y + counter}`;
        coordinates.add(key);
      }
      y += distance;
    }

    if (direction === 'D') {
    // y subtract
      for (let counter = 0; counter <= distance; counter++) {
        const key = `${x}#${y - counter}`;
        coordinates.add(key);
      }
      y -= distance;
    }
  }
  return coordinates;
}
