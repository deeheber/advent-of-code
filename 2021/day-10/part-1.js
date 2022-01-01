import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-10/input.txt', 'utf-8');
  const lines = rawInput.split('\n');

  const openers = ['(', '[', '{', '<'];
  const isOpener = (x) => openers.includes(x);
  const matches = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
  };
  const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  };
  let answer = 0;

  // Find the corrupted lines
  for (const line of lines) {
    let q = [];

    for (let i = 0; i < line.length; i++) {
      const current = line[i];

      if (isOpener(current)) {
        q.push(current);
      } else {
        const top = q.pop();

        if (matches[current] !== top) {
          // Corrupted line
          answer += points[current];
          break;
        }
      }
    }
  }

  console.log(`Answer is ${answer}`);
  // 316851
} catch (err) {
  console.error(`There was an error: ${err}`);
}

// Loop through each line
  // Loop through each char on the line
  // Init a queue
    // If opener > push on queue
    // If closer > pop first item off end of q
      // If it doesn't match -> count and break to next line
      // i.e. counter = { char: count }
// Loop through counter
  // multiply the num of ocurrences by pts
  // Add up all the values