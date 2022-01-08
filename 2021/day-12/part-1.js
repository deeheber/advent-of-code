import { readFile } from 'fs/promises';

try {
  const rawInput = await readFile('day-12/input.txt', 'utf-8');

  /**
   * key: name
   * values: [neighbors]
   */
  const graph = {};

  rawInput
    .split('\n')
    .forEach(x => {
      const [from, to] = x.split('-');

      if (graph[from] === undefined) {
        graph[from] = [];
      }

      if (graph[to] === undefined) {
        graph[to] = [];
      }

      graph[from].push(to);
      graph[to].push(from);
    });

  function findPaths(node, visited, paths) {
    // Mark current node as visited
    visited.push(node);

    // We've reached the end, so stop
    if (node === 'end') {
      paths.push(visited.join(','));
      return;
    }

    // Loop through the current node's neighbors
    for (const neighbor of graph[node]) {
      // If it's a small cave and was visited, go to next neighbor
      if (/[a-z]/.test(neighbor) && visited.includes(neighbor)) {
        continue;
      }
      // Keep exploring
      findPaths(neighbor, [ ...visited], paths);
    }
  }

  const paths = [];
  findPaths('start', [], paths);
  console.log(`Answer is ${paths.length}`);
  // 5958
} catch (err) {
  console.error(`There was an error: ${err}`);
}
