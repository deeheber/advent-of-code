import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-10/input.txt', 'utf-8');
  const lines = rawInput.split('\n');

  const openers = ['(', '[', '{', '<'];
  const isOpener = (x) => openers.includes(x);
  const openerMatch = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
  };
  const closerMatch = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
  };
  const points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  };
  const scores = [];

  for (const line of lines) {
    let isCorrupted = false;
    let stack = [];

    for (let i = 0; i < line.length; i++) {
      const current = line[i];

      if (isOpener(current)) {
        stack.push(current);
      } else {
        const top = stack.pop();

        if (openerMatch[current] !== top) {
          // Corrupted line
          isCorrupted = true;
          break;
        }
      }
    }

    // Only deal with incomplete lines
    if (!isCorrupted) {
      const completion = [];

      while (stack.length) {
        const top = stack.pop();
        completion.push(closerMatch[top]);
      }

      let answer = 0;

      for (const char of completion) {
        answer *= 5;
        answer += points[char];
      }

      scores.push(answer);
    }
  }

  scores.sort((a,b) => a - b);
  console.log(`Answer is ${scores[Math.ceil((scores.length / 2) - 1)]}`);
  // 2182912364
} catch (err) {
  console.error(`There was an error: ${err}`);
}
