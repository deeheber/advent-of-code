const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const cups = rawInput.split('').map(num => Number(num));
  const length = cups.length;
  let current = cups[0];
  let counter = 0;

  while (counter < 100) {
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
      destination = 9;
    }

    while (cups.indexOf(destination) < 0) {
      destination--;

      if (destination < 1) {
        destination = 9;
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
  }
  
  const indexOfOne = cups.indexOf(1);
  let i = (indexOfOne + 1) % length;
  const answer = [];
  while(i != indexOfOne) {
      answer.push(cups[i]);
      i = (i + 1) % length;
  }
  console.log(`Answer is ${answer.join('')}`);
  // 45798623
})();