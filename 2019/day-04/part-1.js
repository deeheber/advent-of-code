const input = '278384-824795';
const start = input.split('-')[0];
const end = input.split('-')[1];
let count = 0;

for (let i = start; i <= end; i++) {
  console.log(i);
  let twoAdjacentDigitsSame = false;
  let numberDecreased = false;
  const digits = i.toString().split('').map(num => Number(num));

  if (digits.length !== 6) {
    continue;
  }

  for (let j = 0; j < digits.length - 1; j++) {
    const firstNum = digits[j];
    const secondNum = digits[j + 1];

    if (firstNum === secondNum) {
      twoAdjacentDigitsSame = true;
    }

    if (firstNum > secondNum) {
      numberDecreased = true;
      break;
    }
  }

  if (twoAdjacentDigitsSame && !numberDecreased) {
    count++;
  }
}

console.log(`Final count of pw combos that meet the criteria: ${count}`);
