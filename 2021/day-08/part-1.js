import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-08/input.txt', 'utf-8');
  const items = rawInput.split('\n');
  let answer = 0;

  for (const item of items) {
    const outputs = item.split(' ').slice(11);

    for (const output of outputs) {
      const count = output.length;

      // 1 -> two digits
      // 4 -> four digits
      // 7 -> three digits
      // 8 -> seven digits
      switch (count) {
        case 2:
        case 4:
        case 3:
        case 7:
          answer++;
          break;
        
        default:
          break;
      }
    }
  }

  console.log(`Answer is ${answer}`);
  // 440
} catch (err) {
  console.error(`There was an error: ${err}`);
}
