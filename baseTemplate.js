const fs = require('fs/promises');

const rawInput = fs.readFileSync('input.txt', 'utf-8');
const input = rawInput.split('\n');
let answer;

// answer here

console.log(`Answer is ${answer}`);