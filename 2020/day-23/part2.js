// NOTE: this is a brute force solution
// This solution is still is very much a work in progress
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const cups = rawInput.split('').map(num => Number(num));
  const length = cups.length;
  let current = cups[0];
  let counter = 0;

  // create original cups arr
  let currentNum = Math.max.apply(null, cups) + 1; // 10
  while (cups.length < 1000000) {
    cups.push(currentNum);
    currentNum++;
  }

  while (counter < 10000000) {
    // pick up three cups clockwise from current cup
    let currentIndex = cups.indexOf(current);
    let pickedUp = [];
    while (pickedUp.length < 3) {
      let indexToPickUp = currentIndex + 1;
      if (indexToPickUp >= cups.length) {
        indexToPickUp = 0;
      }

      pickedUp = [ ...pickedUp, ...cups.splice(indexToPickUp, 1) ];
    }

    // find destination cup
    let destination = current - 1;

    if (destination < 1) {
      destination = 1000000;
    }

    while (cups.indexOf(destination) < 0) {
      destination--;

      if (destination < 1) {
        destination = 1000000;
      }
    }

    // place picked up cups immediatly clockwise of destination cup
    const destinationIndex = cups.indexOf(destination);
    cups.splice(destinationIndex + 1, 0, ...pickedUp);

    // select a new current cup => cup clockwise of current cup
    currentIndex = cups.indexOf(current);
    currentIndex++;

    if (currentIndex >= length) {
      currentIndex = 0;
    }
    
    current = cups[currentIndex];

    counter++;
    // TODO remove this
    console.log(counter)
  }
  
  const indexOfOne = cups.indexOf(1);
  const first = cups[(indexOfOne + 1) % length];
  const second = cups[(indexOfOne + 2) % length];
  console.log(first);
  console.log(second);
  console.log(`Answer is ${first * second}`);
})();