const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput
    .split('\n')
    .filter(x => x)
    .map(x => [...x]);
  // x,y,z,w => active/inactive
  let state = new Map();

  // initalize state
  for (let x = 0; x < input.length; x++) {
    for (let y  = 0; y < input[0].length; y++) {
      const isActive = input[x][y] === '#';
      const key = [ x, y, 0, 0 ].join(',');

      state.set(key, isActive);
    }
  }
  // TODO CHANGE THIS TO 6
  for (let i = 0; i < 6; i++) {
    // find max/min values x, y, z
    let keys = state.keys();
    let xmin = null;
    let ymin = null;
    let zmin = null;
    let wmin = null;
    let xmax = null;
    let ymax = null;
    let zmax = null;
    let wmax = null;

    for (const key of keys) {
      const [ x, y, z, w ] = key.split(',').map(x => parseInt(x));

      if(x < xmin) xmin = x;
      if(y < ymin) ymin = y;
      if(z < zmin) zmin = z;
      if(w < wmin) wmin = w;
      if(x > xmax) xmax = x;
      if(y > ymax) ymax = y;
      if(z > zmax) zmax = z;
      if(w > wmax) wmax = w;
    }

    const nextState = new Map();

    for (let x = xmin - 1; x <= xmax + 1; x++) {
      for (let y = ymin - 1; y <= ymax + 1; y++) {
        for (let z = zmin - 1; z <= zmax + 1; z++) {
          for (let w = wmin - 1; w <= wmax + 1; w++) {
            // returns an array of bool values
            const neighbors = getNeighbors(x, y, z, w, state);
            const activeNeighbors = neighbors.filter(x => x).length;
            const key = [x, y, z, w].join(',');
            const isActive = state.has(key) ? state.get(key) : false;

            if (isActive && activeNeighbors !== 2 && activeNeighbors !== 3) {
              nextState.set(key, false);
            } else if (!isActive && activeNeighbors === 3) {
              nextState.set(key, true);
            } else {
              nextState.set(key, isActive);
            }
          }
        }
      }
    }
    state = nextState;
  }

  // count active cubes
  let answer = 0;
  const keys = state.values();
  for (const key of keys) {
    if (key) {
      answer += 1;
    }
  }

  console.log(`Answer is ${answer}`);
  // 1816
})();

function getNeighbors (x, y, z, w, map) {
  const result = [];

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
        for (let k = z - 1; k <= z + 1; k++) {
          for (let l = w - 1; l <= w + 1; l++) {
            if(i != x || j != y || k != z || l != w) {
                const key = [ i, j, k , l].join(',');
                if(map.has(key)) {
                    result.push(map.get(key));
                } else {
                    result.push(false);
                }
            }
          }
        }
    }
  }

  return result;
}