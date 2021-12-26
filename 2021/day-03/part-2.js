import fs from 'fs/promises';

try {
  const rawInput = await fs.readFile('day-03/input.txt', 'utf-8');
  const items = rawInput.split('\n');

  // Get oxygen rating
  let oxygenRatingCandidates = items.slice(0);
  let index = 0;
  while (oxygenRatingCandidates.length > 1) {
    // See if 0 or 1 has a higher count at that index
    let zeroCount = 0;
    let oneCount = 0;
    let match;

    for (const candidate of oxygenRatingCandidates) {
      if (candidate[index] === '1') {
        oneCount++;
      } else {
        zeroCount++;
      }
    }

    if (zeroCount > oneCount) {
      match = '0';
    } else {
      match = '1';
    }

    const keep = [];
    for (const candidate of oxygenRatingCandidates) {
      if (candidate[index] === match) {
        keep.push(candidate);
      }
    }

    oxygenRatingCandidates = keep;
    index++;
  }

  const oxygenRating = parseInt(oxygenRatingCandidates[0], 2);

  /**
   * Get CO2 scrubber rating
   * Could probably be more DRY with a util function or something
   * But hey it's Advent of Code, so I don't mind messy code
   */
  let co2ScrubberRatingCandidates = items.slice(0);
  index = 0;
  while (co2ScrubberRatingCandidates.length > 1) {
    // See if 0 or 1 has a lower count at that index
    let zeroCount = 0;
    let oneCount = 0;
    let match;

    for (const candidate of co2ScrubberRatingCandidates) {
      if (candidate[index] === '1') {
        oneCount++;
      } else {
        zeroCount++;
      }
    }

    if (zeroCount > oneCount) {
      match = '1';
    } else {
      match = '0';
    }

    const keep = [];
    for (const candidate of co2ScrubberRatingCandidates) {
      if (candidate[index] === match) {
        keep.push(candidate);
      }
    }

    co2ScrubberRatingCandidates = keep;
    index++;
  }

  const co2ScrubberRating = parseInt(co2ScrubberRatingCandidates[0], 2);
  console.log(`Answer is: ${co2ScrubberRating * oxygenRating}`);
  // 3414905
} catch (err) {
  console.error(`There was an error: ${err}`);
}
