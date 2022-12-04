import { readFile } from 'fs/promises';

try {
  const rawInput = await readFile('day-01/input.txt', 'utf-8');
  const calorieList = rawInput.split('\n\n');
  const totals = [];

  for (const elf of calorieList) {
    const calories = elf
      .split('\n')
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0);
    
    totals.push(calories);
  }

  const topThree = totals
    .sort((a, b) => b -a)
    .slice(0, 3)
    .reduce((total, curr) => total + curr, 0);

  // 198551
  console.log(`Answer is ${topThree}`);
} catch (err) {
  console.error(`There was an error: ${err}`);
}
