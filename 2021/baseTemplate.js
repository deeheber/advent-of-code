import fs from 'fs/promises';

try {
  //TODO replace day number in file path
  const rawInput = await fs.readFile('day-01/input.txt', 'utf-8');
  const items = rawInput.split('\n');

  for (const item of items) {
    console.log(item);
  }
} catch (err) {
  console.error(`There was an error: ${err}`);
}