import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-02/input.txt', 'utf-8');
  const moves = rawInput.split('\n');

  let x = 0;
  let y = 0;
  let aim = 0;

  for (const move of moves) {
    const [ direction, amount ] = move.split(' ');
    
    switch(direction) {
      case 'forward':
        y += (aim * Number(amount));
        x += Number(amount);
        break;
      case 'down':
        aim += Number(amount);
        break;
      case 'up':
        aim -= Number(amount);
        break;
      default:
        throw new Error(`Invalid direction, ${direction}`);
    }
  }

  console.log(`Answer is: ${x*y}`);
} catch (err) {
  console.error(`There was an error: ${err}`);
}
