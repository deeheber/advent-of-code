import { readFile } from 'fs/promises'

try {
  const rawInput = await readFile('day-04/input.txt', 'utf-8')
  const lines = rawInput.split('\n')
  let answer = 0

  for (const line of lines) {
    const [pair1, pair2] = line.split(',')
    const [pair1Start, pair1End] = pair1.split('-')
    const [pair2Start, pair2End] = pair2.split('-')

    const pair1Set = new Set()
    for (let i = Number(pair1Start); i <= pair1End; i++) {
      pair1Set.add(i)
    }

    const pair2Set = new Set()
    for (let i = Number(pair2Start); i <= pair2End; i++) {
      pair2Set.add(i)
    }

    const intersect = new Set([...pair1Set].filter((x) => pair2Set.has(x)))

    if (intersect.size > 0) {
      answer++
    }
  }
  // 827
  console.log(`Answer is: ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
