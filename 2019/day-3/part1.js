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
