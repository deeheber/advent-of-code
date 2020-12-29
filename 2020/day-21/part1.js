const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

(async function () {
  const rawInput = await readFile('input.txt', 'utf-8');
  const input = rawInput.split('\n');
  const ingridientCount = {}; // string => number
  const allergensToIngridients = {}; // string => set
  const allIngridients = new Set();

  input.forEach(line => {
    const [ ingridients, allergens ] = line
      .replace(')', '')
      .split(' (contains ')
      .map(str => str.split(/[ ,]+/g));

    for (const allergen of allergens) {
      if (allergen in allergensToIngridients) {
        allergensToIngridients[allergen] = new Set(
          ingridients
            .filter(ingridient => allergensToIngridients[allergen].has(ingridient))
        );
      } else {
        allergensToIngridients[allergen] = new Set(ingridients);
      }
    }

    for (const ingridient of ingridients) {
      if (ingridientCount[ingridient] !== undefined) {
        ingridientCount[ingridient]++;
      } else {
        ingridientCount[ingridient] = 1;
      }

      allIngridients.add(ingridient);
    }
  });

  const definedAllergens = {}; // string (name) => string (allergen)
  let keys = Object.keys(allergensToIngridients);

  while (keys.length > 0) {
    // find set with size of one
    // remove it from all other sets
    const defined = keys.find(i => allergensToIngridients[i].size === 1);
    const name = allergensToIngridients[defined].values().next().value;

    for (const allergen in allergensToIngridients) {
      if (allergensToIngridients[allergen].has(name)) {
        allergensToIngridients[allergen].delete(name);
      }
    }

    definedAllergens[name] = defined;
    delete allergensToIngridients[defined];
    keys = Object.keys(allergensToIngridients);
  }

  // each ingridient
    // if not a defined allergen 
      // add count to answer
  let answer = [ ...allIngridients ]
    .filter(ingridient => !(ingridient in definedAllergens))
    .reduce((total, curr) => total + ingridientCount[curr], 0);

  console.log(`Answer is ${answer}`);
  // 2262
})();