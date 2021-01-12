const { promisify } = require('util');
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

(async function () {
  const document = await readFilePromise('input.txt', 'utf-8');
  const values = document.split('\n');

  const wire1 = values[0].split(',');
  const wire2 = values[1].split(',');

  const wire1Info = getWireInfo(wire1);
  const wire2Info = getWireInfo(wire2);

  getDistance(wire1Info, wire2Info);
})();

function getWireInfo (wire) {
  const coordsToDist = new Map(); // x#y => 1234
  let traveledSoFar = 0;
  let x = 0;
  let y = 0;

  for (let i = 0; i < wire.length; i++) {
    const direction = wire[i].charAt(0);
    const distance = Number(wire[i].slice(1));

    if (direction === 'L') {
    // x subtract
      for (let counter = 0; counter <= distance; counter++) {
        coordsToDist.set(`${x - counter}#${y}`, traveledSoFar);
        if (counter !== distance) {
          traveledSoFar++;
        }
      }
      x -= distance;
    }

    if (direction === 'R') {
      // x add
      for (let counter = 0; counter <= distance; counter++) {
        coordsToDist.set(`${x + counter}#${y}`, traveledSoFar);

        if (counter !== distance) {
          traveledSoFar++;
        }
      }
      x += distance;
    }

    if (direction === 'U') {
      // y add
      for (let counter = 0; counter <= distance; counter++) {
        coordsToDist.set(`${x}#${y + counter}`, traveledSoFar);

        if (counter !== distance) {
          traveledSoFar++;
        }
      }
      y += distance;
    }

    if (direction === 'D') {
    // y subtract
      for (let counter = 0; counter <= distance; counter++) {
        coordsToDist.set(`${x}#${y - counter}`, traveledSoFar);

        if (counter !== distance) {
          traveledSoFar++;
        }
      }
      y -= distance;
    }
  }

  return coordsToDist;
}

function getDistance (wire1, wire2) {
  let answer = null;
  const intersections = new Set([...wire1.keys()].filter(x => wire2.has(x)));
  intersections.delete('0#0');

  for (const intersection of intersections.keys()) {
    const possibleAnswer = wire1.get(intersection) + wire2.get(intersection);
    if (answer === null || answer > possibleAnswer) {
      answer = possibleAnswer;
    }
  }

  console.log(`Answer is ${answer}`);
  // 11432
}
