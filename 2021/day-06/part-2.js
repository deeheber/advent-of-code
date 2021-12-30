import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-06/input.txt', 'utf-8');
  let fish = rawInput.split(',').map(x => Number(x));

  /**
   * Create a queue (array)
   * Allowed numbers 0 - 8, so we need 9 slots
   * Each index is how many times that number ocurred
   * 
   * Ex [0,1,1,2,1,0,0,0]
   * Number 1 ocurred once
   * Number 2 ocurred once
   * Number three ocurred twice
   * Number four ocurred once
   */
  const queue = Array(9).fill(0);

  for (const f of fish) {
    queue[f]++;
  }

  let day = 0;
  while (day < 256) {
    // Pull the current item from the front of the queue
    const current = queue.shift();

    // Push it at the end, since we're creating a new fish with value 8
    // Add the current item to spot 6, since 0 turns into 6
    queue.push(current);
    queue[6] += current;

    day++;
  }
  
  // Add up all the fish counts
  console.log(`Answer is ${queue.reduce((a, b) => a + b, 0)}`);
  // 1682576647495
} catch (err) {
  console.error(`There was an error: ${err}`);
}
