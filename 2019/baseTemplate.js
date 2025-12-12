const { promisify } = require("util");
const fs = require("fs");
const readFilePromise = promisify(fs.readFile);

async function main() {
  try {
    //TODO add day number in place of xx in the file path
    const rawInput = await readFilePromise("day-xx/input.txt", "utf-8");
    const input = rawInput.split("\n");

    // Your solution code here
    console.log(input);
  } catch (err) {
    console.error(err.message);
  }
}

main();
