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
      let isValid = true;

      for (const property of passportProperties) {
        const [ key, value ] = property.split(':');
        // convert to key:object
        obj[key] = value;

        // validate field value
        switch (key) {
          case 'byr':
            // four digits; at least 1920 and at most 2002
            isValid = value.length === 4 && value >= 1920 && value <= 2002;
            break;
          case 'iyr':
            // four digits; at least 2010 and at most 2020
            isValid = value.length === 4 && value >= 2010 && value <= 2020;
            break;
          case 'eyr':
            // four digits; at least 2020 and at most 2030
            isValid = value.length === 4 && value >= 2020 && value <= 2030;
            break;
          case 'hgt':
            // a number followed by either cm or in
            // If cm, the number must be at least 150 and at most 193
            // If in, the number must be at least 59 and at most 76
            const centimeter = value.endsWith('cm');
            const inch = value.endsWith('in');
            const num = value.slice(0, value.length - 2);
            
            if (centimeter) {
              isValid = !isNaN(num) && num >= 150 && num <= 193;
            } else if (inch) {
              isValid = !isNaN(num) && num >= 59 && num <= 76;
            } else {
              // does not have a valid ending
              isValid = false;
            }
            break;
          case 'hcl':
            // a # followed by exactly six characters 0-9 or a-f
            const chars = value.slice(1);
            isValid = value.startsWith('#') && !(/^a-f0-9]+/g.test(chars));
            break;
          case 'ecl':
            // exactly one of: amb blu brn gry grn hzl oth
            const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
            isValid = validEyeColors.includes(value);
            break;
          case 'pid':
            // a nine-digit number, including leading zeroes
            isValid = value.length === 9 && !isNaN(value);
            break;
          case 'cid':
            isValid = true;
            break;
          default: 
            console.error(`Unrecognized field: ${key}`);
            isValid = false;
        }

        if (isValid === false) {
          break;
        }
      }
      
      // validate that required fields are present
      if (isValid === true) {
        for (const field of fields) {
          if (obj[field] === undefined) {
            isValid = false;
            break;
          }
        }
      }

      // increment count if valid
      if (isValid === true) {
        validPassportCount++;
      }
    }

    console.log(`Answer is ${validPassportCount}`);
    // 153
  } catch (err) {
    console.error(err.message);
  }
})();