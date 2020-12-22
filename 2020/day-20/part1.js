const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const tiles = rawInput.split('\n\n')
    .filter(x => x)
    .map(line => {
      const body = line.split('\n');
      const id = Number(body[0].match(/\d+/)[0]);

      body.shift();

      return {
        id,
        body,
        edges: getEdges(body),
        matches: []
      }
    });

  function reverseString (str) {
    return str.split('').reverse().join('');
  }

  function getEdges (tile) {
    const result = [
      tile[0], 
      tile[tile.length - 1], 
      tile.map(char => char[0]).join(''), 
      tile.map(char => char[char.length - 1]).join('')
    ];

    return result.concat(result.map(edge => reverseString(edge)));
  }

  function compareTiles (tile1, tile2) {
    for (let i = 0; i < tile1.edges.length; i++) {
      const edge1 = tile1.edges[i];
      for (let j = 0; j < tile2.edges.length; j++) {
        const edge2 = tile2.edges[j];

        if (edge1 === edge2) {
          return edge1;
        }
      }
    }

    return null;
  }

  for (let i = 0; i < tiles.length; i++) {
    const tile1 = tiles[i];
    for (let j = i + 1; j < tiles.length; j++) {
      const tile2 = tiles[j];
      const match = compareTiles(tile1, tile2);

      if (match) {
        tile1.matches.push({
          id: tile2.id,
          edge: match
        });

        tile2.matches.push({
          id: tile1.id,
          edge: match
        });
      }
    }
  }

  const answer = tiles.reduce((product, tile) => {
    if (tile.matches.length === 2) {
      // we know it's a corner
      product *= tile.id;
    }
    return product;
  }, 1);

  console.log(`Answer is ${answer}`);
  // 17712468069479
})();