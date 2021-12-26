import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-02/input.txt', 'utf-8');
  const moves = rawInput.split('\n');

  let x = 0;
  let y = 0;

  for (const move of moves) {
    const [ direction, amount ] = move.split(' ');
    
    switch(direction) {
      case 'forward':
        x += Number(amount);
        break;
      case 'down':
        y += Number(amount);
        break;
      case 'up':
        y -= Number(amount);
        break;
      default:
        throw new Error(`Invalid direction, ${direction}`);
    }
  }

  console.log(`Answer is: ${x*y}`);
} catch (err) {
  console.error(`There was an error: ${err}`);
}
