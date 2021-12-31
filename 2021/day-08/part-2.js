import fs from 'fs/promises';

try {
  // Parse data
  const rawInput = await fs.readFile('day-08/input.txt', 'utf-8');
  const input = rawInput.split('\n');

  const lines = input.map(x => {
    const [ signalPatterns, outputValues ] = x
      .split(' | ')
      .map(str => {
        const chars = str.split(' ');
        // Put characters in ABC order
        return chars.map(char => char.split('').sort().join(''));
      });


    return {
      signalPatterns,
      outputValues
    }
  });

  // a includes all of b
  function includes(a, b) {
    const aSplit = new Set([...a]);
    return [...b].every(x => aSplit.has(x));;
  }

  let answer = 0;

  for (const line of lines) {
    // Decode the values from the signalPatterns
    /**
     * Number -> length
     * 0 -> 6
     * 1 -> 2*
     * 2 -> 5
     * 3 -> 5
     * 4 -> 4*
     * 5 -> 5
     * 6 -> 6
     * 7 -> 3*
     * 8 -> 7*
     * 9 -> 6
     * * Unique count
     */
    const { signalPatterns, outputValues } = line;
    // The index equals the number (0-9)
    const decodedValues = new Array(10);

    // These are unique values, so we know them already
    decodedValues[1] = signalPatterns.find(x => x.length === 2);
    decodedValues[4] = signalPatterns.find(x => x.length === 4);
    decodedValues[7] = signalPatterns.find(x => x.length === 3);
    decodedValues[8] = signalPatterns.find(x => x.length === 7);
  
    // 0, 6, 9 => length of 6
    decodedValues[6] = signalPatterns
      .find(x =>
        x.length === 6 &&
        !includes(x, decodedValues[1])
    );
    decodedValues[9] = signalPatterns
      .find(x =>
        x.length === 6 &&
        x !== decodedValues[6] &&
        includes(x, decodedValues[4])
    );
    decodedValues[0] = signalPatterns
      .find(x => 
        x.length === 6 &&
        x !== decodedValues[6] && 
        x !== decodedValues[9]
    );

    // 2, 3, 5 => length of 5
    decodedValues[3] = signalPatterns
      .find(x =>
        x.length === 5 &&
        includes(x, decodedValues[1])
    );

    decodedValues[5] = signalPatterns
      .find(x =>
        x.length === 5 &&
        x !== decodedValues[3] &&
        includes(decodedValues[6], x)
    );

    decodedValues[2] = signalPatterns
      .find(x =>
        x.length === 5 &&
        x !== decodedValues[3] &&
        x !== decodedValues[5]
    );

    const decodedOutputValue = outputValues
      .reduce((carry, output) => 
        carry += decodedValues.indexOf(output)
      , '');
    answer += Number(decodedOutputValue);
  }

  console.log(`Answer is ${answer}`);
  // 1046281
} catch (err) {
  console.error(`There was an error: ${err}`);
}