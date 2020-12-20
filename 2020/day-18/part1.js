const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');
  let answer = 0;

  for (const line of input) {
    answer += solveWithParenthesis(line);
  }

  console.log(`Answer is ${answer}`);
  // 21993583522852
})();

function solve (str) {
  let tokens = str.split(' ');
  
  while (tokens.length > 1) {
    // eval first three chars then concat the rest of the string to the result
    tokens = [eval(tokens.slice(0, 3).join(''))].concat(tokens.slice(3));
  }

  return tokens[0];
}

function solveWithParenthesis (str) {
  while(/\(/.test(str)) {
    // replace parenthesis section with their evaluated result
    str = str.replace(/\(([^()]+)\)/g, (match, group) => {
        return solve(group);
    });
  }
  return solve(str);
}