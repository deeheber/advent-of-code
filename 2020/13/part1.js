const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const input = rawInput.split('\n');
    const departureTime = Number(input[0]);
    const buses = input[1]
      .split(',')
      .reduce((all, item) => {
        if (item !== 'x') {
          all.push(Number(item));
        }
        return all;
      }, []);

    const bestTimes = [];
    for (const bus of buses) {
      let currentTime = 0;

      while (currentTime <= departureTime) {
        currentTime += bus;
      }

      bestTimes.push(currentTime);
    }
    
    // find index for lowest time
    const index = bestTimes.indexOf(Math.min.apply(null, bestTimes));
    const closestBus = buses[index];
    const closestTime = bestTimes[index];

    console.log(`Answer is ${(closestTime - departureTime) * closestBus}`);
    // 156
  } catch (err) {
    console.error(err.message);
  }
})();