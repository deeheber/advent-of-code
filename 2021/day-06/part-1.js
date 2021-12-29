import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-06/input.txt', 'utf-8');
  let fish = rawInput.split(',').map(x => Number(x));
  let counter = 0;

  while (counter < 80) {
    const tempFish = [];
    let numFishToAdd = 0;

    for (let f of fish) {
      f--;

      if (f < 0) {
        f = 6;
        numFishToAdd++;
      }

      tempFish.push(f);
    }

    while (numFishToAdd > 0) {
      tempFish.push(8);
      numFishToAdd--;
    }

    fish = tempFish;
    counter++
  }

  console.log(`Answer is ${fish.length}`);
  // 373378
} catch (err) {
  console.error(`There was an error: ${err}`);
}
