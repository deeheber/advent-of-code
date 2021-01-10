const fs = require('fs');

const rawInput = fs.readFileSync('input.txt', 'utf-8');
const moves = rawInput.split('\n');
const blackTiles = new Set(); // x#y

// https://www.redblobgames.com/grids/hexagons/#map-storage
const moveTile = {
  'e': { dx: 1, dy: 0 },
  'se': { dx: 0, dy: 1 },
  'sw': { dx: -1, dy: 1 },
  'w': { dx: -1, dy: 0 },
  'nw': { dx: 0, dy: -1 },
  'ne': { dx: 1, dy: -1 }
};

moves.forEach(move => {
  // parse out directions for each move
  const directions = [];
  for (let i = 0; i < move.length; i++) {
    const current = move[i];

    if (current === 's' || current === 'n') {
      // nw ne sw se
      directions.push(current.concat(move[i + 1]));
      i++;
    } else {
      // w or e
      directions.push(current);
    }
  }

  // move to tile
  let x = 0;
  let y = 0;
  for (const direction of directions) {
    const { dx, dy } = moveTile[direction];

    x += dx;
    y += dy
  }

  const tile = `${x}-${y}`;
  if (blackTiles.has(tile)) {
    // flip to white
    blackTiles.delete(tile);
  } else {
    // flip to black
    blackTiles.add(tile);
  }
});

console.log(`Answer is ${blackTiles.size}`);
// 275