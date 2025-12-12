const fs = require('fs');

const rawInput = fs.readFileSync('input.txt', 'utf-8');
const input = rawInput.split(',').map(num => Number(num));

input[1] = 12;
input[2] = 2;

for (let i = 0; i < input.length; i += 4) {
  const opicode = input[i];
  const input1 = input[i + 1];
  const input2 = input[i + 2];
  const ouptputIndex = input[i + 3];
  let result;

  if (opicode === 1) {
    result = input[input1] + input[input2];
  } else if (opicode === 2) {
    result = input[input1] * input[input2];
  } else if (opicode === 99) {
    break;
  } else {
    throw new Error(`Invalid opicode: ${opicode}`);
  }

  input[ouptputIndex] = result;
}

console.log(`Answer is ${input[0]}`);
// 3765464
