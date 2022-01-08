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

  function findPaths(node, visited, visitedTwice, paths) {
    // Mark current node as visited
    visited.push(node);

    // We've reached the end, so stop
    if (node === 'end') {
      paths.push(visited.join(','));
      return;
    }

    // Loop through the current node's neighbors
    for (const neighbor of graph[node]) {
      // Can only visit start once
      if (neighbor === 'start') {
        continue;
      }
      // It's a small cave and was visited
      if (/[a-z]/.test(neighbor) && visited.includes(neighbor)) {
        // Go to next neighbor
        if (visitedTwice) {
          continue;
        }
        // Visited >= 2 times
        if (
          visited.filter(x => x === neighbor).length >= 2
        ) {
          continue;
        }
        // Keep exploring
        // Mark as visited twice
        findPaths(neighbor, [ ...visited], true, paths);
      } else {
        // Keep exploring
        findPaths(neighbor, [ ...visited], visitedTwice, paths);
      }
    }
  }

  const paths = [];
  findPaths('start', [], false, paths);
  console.log(`Answer is ${paths.length}`);
  // 150426
} catch (err) {
  console.error(`There was an error: ${err}`);
}
