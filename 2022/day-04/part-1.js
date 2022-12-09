import { readFile } from 'fs/promises';

try {
  const rawInput = await readFile('day-04/input.txt', 'utf-8');
  const lines = rawInput.split('\n');
  let answer = 0;

  for (const line of lines) {
    const [ pair1, pair2 ] = line.split(',');
    const [ pair1Start, pair1End ] = pair1.split('-');
    const [ pair2Start, pair2End ] = pair2.split('-');

    // check if pair1 is in pair2
    if ((Number(pair1Start) >= Number(pair2Start)) && (Number(pair1End) <= Number(pair2End))) {
      answer++;
      continue;
    }

    // check if pair2 is in pair1
    if ((Number(pair2Start) >= Number(pair1Start)) && (Number(pair2End) <= Number(pair1End))) {
      answer++;
    }
  }
  // 503
  console.log(`Answer is: ${answer}`);
} catch (err) {
  console.error(`There was an error: ${err}`);
}
