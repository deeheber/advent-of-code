const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const input = rawInput.split('\n');

    const buses = input[1]
      .split(',')
      .reduce((all, item, index) => {
        const num = Number(item);
        if (!isNaN(num)) {
          all.push([num, index])
        }
        return all;
      }, []);
    let time = 0;
    let inc = buses[0][0]
    
    for (let i = 1; i < buses.length; i++) {
      while (((time + buses[i][1]) % buses[i][0]) !== 0) {
        time += inc;
      }

      inc *= buses[i][0]
    }

    console.log(`Answer is ${time}`);
    // 404517869995362
  } catch (err) {
    console.error(err.message);
  }
})();