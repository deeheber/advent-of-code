import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-04/input.txt', 'utf-8');
  const input = rawInput.split('\n');

  let numbers;
  let cards = [];
  let counter = -1;
  for (let i = 0; i < input.length; i++) {
    const currentItem = input[i];

    if (i === 0) {
      // It's the numbers called out
      numbers = currentItem.split(',');
      continue;
    }
    
    if (currentItem === '') {
      // New card
      cards.push([]);
      counter++;
      continue;
    }

    // Add row to the card
    cards[counter].push(currentItem.split(' ').filter(x => x !== ''))
  }

  // Call out the numbers
  for (const number of numbers) {
    // Each card see if the called number is on the card
    for (const card of cards) {
      let hasNumber = false;

      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          const currentNumber = card[x][y];

          if (currentNumber === number) {
            // We found the number on the card
            // Mark as called (* in front of the value)
            // Exit the loops early
            card[x][y] = `*${currentNumber}`;
            hasNumber = true;
            break;
          }
        }

        if (hasNumber) {
          break;
        }
      }

      // If the card had the number, check to see if they won
      if (hasNumber) {
        // Did they win across ???
        for (let x = 0; x < 5; x++) {
          let markedNumsCount = 0;

          for (let y = 0; y < 5; y++) {
            const current = card[x][y];

            if (current.startsWith('*')) {
              markedNumsCount++;
            }
          }

          if (markedNumsCount === 5) {
            // They won
            let sum = 0;

            for (let x = 0; x < 5; x++) {
              for (let y = 0; y < 5; y++) {
                const current = card[x][y];
      
                // Add unmarked numbers to sum
                if (!current.startsWith('*')) {
                  sum += Number(current);
                }
              }
            }

            console.log(`Answer is: ${sum * number}`);
            process.exit();
          }
        }

        // Did they win up/down ???
        for (let x = 0; x < 5; x++) {
          let markedNumsCount = 0;

          for (let y = 0; y < 5; y++) {
            const current = card[y][x];

            if (current.startsWith('*')) {
              markedNumsCount++;
            }
          }

          if (markedNumsCount === 5) {
            // They won
            let sum = 0;

            for (let x = 0; x < 5; x++) {
              for (let y = 0; y < 5; y++) {
                const current = card[y][x];
      
                // Add unmarked numbers to sum
                if (!current.startsWith('*')) {
                  sum += Number(current);
                }
              }
            }

            console.log(`Answer is: ${sum * number}`);
            process.exit();
          }
        }
        
      }
    }
  }
} catch (err) {
  console.error(`There was an error: ${err}`);
}
