# 🎄 advent-of-code-2025

Challenges from https://adventofcode.com/2025 ✨

To run a solution navigate to the 2025 directory run any of the following commands:

- `node day-01/part-1.js` (direct node command)
- `day=1 part=1 npm start` (using npm script with environment variables)
- `npm start 1 1` (using npm script with arguments: day part)

The npm start script automatically pads single digit day numbers with leading zeros (e.g., `day=1` becomes `day-01`), but keeps part numbers as-is.

I ran the solutions using node 24.x (see `.nvmrc`), but it may work with other node versions.

To use the prettier formatter run `npm run format` (after running `npm install`)

I could've used TypeScript, but to me that felt like overkill for something like this. Decided to go with plain JS using modules instead. The scaffolding scripts are probably overkill too, but they were fun to write.
