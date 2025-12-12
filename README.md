# advent-of-code

Challenges from https://adventofcode.com/

Might not get to all challenges through the years

Note that I'm doing these challenges for fun and this does not necessarily reflect how I'd handle things in a production environment

## Quick Setup

Use the `scaffold-day.sh` script to quickly set up a new day's challenge:

```bash
# Scaffold day 3 for current year (2025)
./scaffold-day.sh 3

# Scaffold day 15 for a specific year
./scaffold-day.sh 15 2024
```

### What the script does:

1. **Creates folder structure**: `year/day-XX/` (single digits are zero-padded)
2. **Creates blank input file**: `input.txt` for your puzzle input
3. **Creates starter code**: `part-1.js` copied from `baseTemplate.js` with:
   - Updated file path to match the day folder
   - Removed TODO comments for a clean start

### Requirements:

- The script looks for `baseTemplate.js` in the target year folder
- Day number must be between 1-25
- Script will create the year folder if it doesn't exist
