import { readFile } from 'fs/promises';

try {
  const rawInput = await readFile('day-13/input.txt', 'utf-8');
  const [dots, foldDirections] = rawInput
    .split('\n\n')
    .map(str => {
      const returnVals = [];
      const lines = str.split('\n');
      for (const line of lines) {
        if (line.includes(',')) {
          // dots
          const [x, y] = line.split(',');
          returnVals.push({ x: Number(x), y: Number(y) })
        } else {
          // foldDirections
          const last = line.split(' ')[2];
          const [axis, amount] = last.split('=');
          // [axis, amt]
          returnVals.push({ axis, amount: Number(amount) });
        }
      }
      return returnVals;
    });

  for (const direction of foldDirections) {
    const { axis, amount } = direction;
    for (let j = 0; j < dots.length; j++) {
      const dot = dots[j];
      if (dot[axis] > amount) {
        dot[axis] = (dot[axis] - amount) * -1 + amount;
      }
    }
  }

  // Remove duplicates
  const deDuplicated = new Set(
    dots.map(({x, y}) => `${x}-${y}`)
  );
  const arr = [...deDuplicated].map(x => x.split('-'));
  const maxWidth = Math.max(...arr.map(item => item[0]));
  const maxHeight = Math.max(...arr.map(item => item[1]));
  
  for (let y = 0; y <= maxHeight; y++) {
    let string = '';
    for (let x = 0; x <= maxWidth; x++) {
      if (deDuplicated.has(`${x}-${y}`)) {
        string += '#';
      } else {
        string += ' ';
      }
    }
    console.log(string);
  }
  // UEFZCUCJ
} catch (err) {
  console.error(`There was an error: ${err}`);
}
