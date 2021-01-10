const fs = require('fs');

const rawInput = fs.readFileSync('input.txt', 'utf-8');
const moves = rawInput.split('\n');
let blackTiles = new Set(); // x#y

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

  const tile = `${x}#${y}`;
  if (blackTiles.has(tile)) {
    // flip to white
    blackTiles.delete(tile);
  } else {
    // flip to black
    blackTiles.add(tile);
  }
});

// end of part 1

function getNeighbors (x, y) {
  let neighbors = [];

  for (const dir in moveTile) {
    const { dx, dy } = moveTile[dir];
    neighbors.push({ x: x + dx, y: y + dy });
  }

  return neighbors;
}

function getId (item) {
  return `${item.x}#${item.y}`
}

for (let i = 1; i <= 100; i++) {
  let newBlackTiles = new Set();

  for (const blackTile of blackTiles.keys()) {
    const [x, y] = blackTile.split('#').map(num => Number(num));
    const immediateNeighbors = getNeighbors(x, y);
    // add current tile to neighbors array
    immediateNeighbors.push({ x, y });

    for (const neighbor of immediateNeighbors) {
      const currId = getId(neighbor);
      const neighborNeighbors = getNeighbors(neighbor.x, neighbor.y);
      const totalBlackTiles = neighborNeighbors.filter(item => blackTiles.has(getId(item))).length;

      if (blackTiles.has(currId)) {
        // black tile
        if (totalBlackTiles === 0 || totalBlackTiles > 2) {
          // flips to white
          newBlackTiles.delete(currId);
        } else {
          // stays black
          newBlackTiles.add(currId);
        }
      } else {
        // white tile
        if (totalBlackTiles === 2) {
          // flips to black
          newBlackTiles.add(currId);
        }
      }
    }
  }

  blackTiles = newBlackTiles;
  console.log(`day ${i}`, blackTiles.size);
  // answer is 3537
}
