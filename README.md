# 🎄 Advent of Code Solutions

My solutions to the [Advent of Code](https://adventofcode.com/) programming puzzles 🎅

This repository contains JavaScript solutions for various years of Advent of Code challenges. Each year is organized in its own folder with daily puzzle solutions.

> **Note:** These solutions are written for fun and learning - they prioritize readability and experimentation over production-ready code.

> **🧠 Human-Crafted Solutions:** All puzzles were solved using pure problem-solving skills and vanilla JavaScript knowledge - no AI assistance was used in developing these solutions.

## 🚀 Getting Started

### Running Solutions

Navigate to any year folder and run a solution:

```bash
cd 2024
node day-01/part-1.js
```

For years with npm scripts (2021+):

```bash
cd 2024
day=01 part=1 npm start
```

### 🎁 Creating New Solutions

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

## 📁 Repository Structure

```
advent-of-code/
├── 2019/          # JavaScript solutions
├── 2020/          # JavaScript solutions
├── 2021/          # ES modules with top-level await
├── 2022/          # ES modules + npm scripts + prettier
├── 2023/          # ES modules + npm scripts + prettier
├── 2024/          # ES modules + npm scripts + prettier
├── 2025/          # Current year (ES modules + npm scripts + prettier)
└── scaffold-day.sh # Script to create new day folders
```

Each year folder contains:

- `day-XX/` folders with `part-1.js` and `part-2.js` solutions
- `input.txt` files with puzzle inputs
- `baseTemplate.js` for scaffolding new days
- Year-specific README with setup instructions
