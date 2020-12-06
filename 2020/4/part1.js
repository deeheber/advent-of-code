// Just a starter base to begin each challenge
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  try {
    const rawInput = await readFile('input.txt', 'utf-8');
    const passports = rawInput.split('\n\n');
    const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let validPassportCount = 0;

    for (const passport of passports) {
      const obj = {};
      const passportProperties = passport.split(/\s/);
      // convert to key:object
      for (const property of passportProperties) {
        const [ key, value ] = property.split(':');
        obj[key] = value;
      }
      
      let isValid = true;
      for (const field of fields) {
        if (obj[field] === undefined) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        validPassportCount++;
      }
    }

    console.log(`Answer is ${validPassportCount}`);
    // 260
  } catch (err) {
    console.error(err.message);
  }
})();