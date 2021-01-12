const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const [ cardPublicKey, doorPublicKey ] = input.split('\n').map(x => Number(x));

const divisor = 20201227;
let subjectNumber = 7;

// find card loop size
let value = 1;
let cardLoopSize = 0;
while (value !== cardPublicKey) {
  value *= subjectNumber;
  value %= divisor;
  cardLoopSize++;
}

// find door loop size
value = 1;
let doorLoopSize = 0;
while (value !== doorPublicKey) {
  value *= subjectNumber;
  value %= divisor;
  doorLoopSize++;
}

// use card loop size with doorPublicKey to find encryption key
subjectNumber = doorPublicKey;
let doorEncryptionKey = 1;
for (let i = 0; i < cardLoopSize; i++) {
  doorEncryptionKey *= subjectNumber;
  doorEncryptionKey %= divisor;
}

// use door loop size with cardPublicKey to find encryption key
subjectNumber = cardPublicKey;
let cardEncryptionKey = 1;
for (let i = 0; i < doorLoopSize; i++) {
  cardEncryptionKey *= subjectNumber;
  cardEncryptionKey %= divisor;
}

if (cardEncryptionKey !== doorEncryptionKey) {
  throw new Error(`Encryption keys do not match: ${doorEncryptionKey} ${cardEncryptionKey}`);
}

console.log(`Encryption key is ${cardEncryptionKey}`);
// answer is 6198540
