import { match } from 'assert';
import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-05/input.txt', 'utf-8');
  const items = rawInput.split('\n');
  const lines = [];

  for (const item of items) {
    const [ first, second ] = item.split(' -> ');
    const [ x1, y1 ] = first.split(',').map(num => Number(num));
    const [ x2, y2 ] = second.split(',').map(num => Number(num));

    lines.push({ start: [x1, y1], end: [x2, y2] });
  }

  // Mark the lines on our "grid"
  const grid = {};
  // key is 'x,y' => val is num of times a line drawn there
  // Ex. { '1,2': 1, '1,3': 2 }

  function drawHorzontalLine (x, lowY, highY) {
    for (let i = lowY; i <= highY; i++) {
      if (grid[`${x},${i}`] === undefined) {
        grid[`${x},${i}`] = 1;
      } else {
        grid[`${x},${i}`]++;
      }
    }
  }

  function drawVerticalLine (y, lowX, highX) {
    for (let i = lowX; i <= highX; i++) {
      if (grid[`${i},${y}`] === undefined) {
        grid[`${i},${y}`] = 1;
      } else {
        grid[`${i},${y}`]++;
      }
    }
  }

  function drawDiagonalLine (low, high) {
    const [x1, y1] = low;
    const [x2, y2] = high;
    
    if ((x1 < x2) && (y1 < y2)) {
      // Forward diagonal
      let counter = 0;

      while (counter <= (x2 - x1)) {
        if (grid[`${x1 + counter},${y1 + counter}`] === undefined) {
          grid[`${x1 + counter},${y1 + counter}`] = 1;
        } else {
          grid[`${x1 + counter},${y1 + counter}`]++;
        }

        counter++;
      }
    } else {
      // Backward diagonal
      let counter = 0;

      while (counter <= (x2 - x1)) {
        if (grid[`${x1 + counter},${y1 - counter}`] === undefined) {
          grid[`${x1 + counter},${y1 - counter}`] = 1;
        } else {
          grid[`${x1 + counter},${y1 - counter}`]++;
        }

        counter++;
      }
    }
  }

  for (const line of lines) {
    const [x1, y1] = line.start;
    const [x2, y2] = line.end;
    
    if (x1 === x2) {
      // Horizontal line
      // x1 === x2
      const low = y1 < y2 ? y1 : y2;
      const high = y1 > y2 ? y1 : y2;
      drawHorzontalLine(x2, low, high);
    } else if (y1 === y2) {
      // Vertical line
      // y1 === y2
      const low = x1 < x2 ? x1 : x2;
      const high = x1 > x2 ? x1 : x2;
      drawVerticalLine(y2, low, high);
    } else {
      // Diagonal line
      const low = x1 < x2 ? line.start : line.end;
      const high = x1 > x2 ? line.start : line.end;
      drawDiagonalLine(low, high);
    }
  }

  // Count how many x,y coords count is > 1
  let answer = 0;

  for (const count of Object.values(grid)) {
    if (count > 1) {
      answer++;
    }
  }

  console.log(`Answer is: ${answer}`);
  // 20271
} catch (err) {
  console.error(`There was an error: ${err}`);
}
