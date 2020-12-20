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
  // 122438593522757
})();

function solve (str) {
  while (/\+/.test(str)) {
    str = str.replace(/(\d+) \+ (\d+)/g, (match, firstNum, secondNum) => {
      return Number(firstNum) + Number(secondNum);
    });

  }
  return eval(str);
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