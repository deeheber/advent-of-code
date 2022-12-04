import { readFile } from 'fs/promises';

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8');
  const calorieList = rawInput.split('\n\n');
  let max = 0;

  for (const elf of calorieList) {
    const calories = elf
      .split('\n')
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0);
    
    if (calories > max) {
      max = calories;
    }
  }

  // 66719
  console.log(`Answer is ${max}`);
} catch (err) {
  console.error(`There was an error: ${err}`);
}
