import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-03/input.txt', 'utf-8');
  const items = rawInput.split('\n');

  // Initialize counts
  const counts = [];
  items[0].split('').map(val => counts.push([0, 0]));
  // [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ]

  for (const item of items) {
    const numbers = item.split('');
    
    for (let i = 0; i < numbers.length; i++) {
      const currNumber = Number(numbers[i]);

      counts[i][`${currNumber}`] += 1;
    }
  }

  // Most common
  const gammaArr = [];
  // Least common
  const epsilonArr = [];

  for (const count of counts) {
    const [zeroCount, oneCount] = count;

    if (zeroCount > oneCount) {
      gammaArr.push(0);
      epsilonArr.push(1);
    } else {
      gammaArr.push(1);
      epsilonArr.push(0);
    }
  }

  const gamma = parseInt(gammaArr.join(''), 2);
  const epsilon = parseInt(epsilonArr.join(''), 2);

  console.log(`Answer is: ${gamma * epsilon}`)
  // 4191876
} catch (err) {
  console.error(`There was an error: ${err}`);
}
