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
  
  const ingridientToAllergenArr = [];
  for (const key in definedAllergens) {
    ingridientToAllergenArr.push([key, definedAllergens[key]]);
  }

  const answer = ingridientToAllergenArr
    .sort((a, b) => {
      if (a[1] < b[1]) {
        return -1;
      }
      if (a[1] > b[1]) {
        return 1;
      }
    
      return 0;
    })
    .map(item => item[0]).join(',');

  console.log(`Answer is ${answer}`);
  // cxsvdm,glf,rsbxb,xbnmzr,txdmlzd,vlblq,mtnh,mptbpz
})();