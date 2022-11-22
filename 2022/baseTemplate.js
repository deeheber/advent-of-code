import { readFile } from 'fs/promises';

try {
  //TODO add day number in place of xx in the file path
  const rawInput = await readFile('day-xx/input.txt', 'utf-8');
  const items = rawInput.split('\n');

  for (const item of items) {
    console.log(item);
  }
} catch (err) {
  console.error(`There was an error: ${err}`);
}
