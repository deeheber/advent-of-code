const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');

// Generate all possible combos
const combinations = [];
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    combinations.push([i, j]);
  }
}

// Each combo add noun in position 1 and verb in position 2
// Keep trying until position 0 is 19690720
for (let j = 0; j < combinations.length; j++) {
  // Reset the input on each combo try
  const input = rawInput.split(',').map(num => Number(num));
  const [noun, verb] = combinations[j];

  input[1] = noun;
  input[2] = verb;
  
  // Update the input per the opicode rules
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

    if (input[0] === 19690720) {
      console.log(`Answer is ${100 * noun + verb}`);
      // 7610
      return;
    }
  }
}
