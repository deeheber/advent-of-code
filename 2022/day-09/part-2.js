import { readFile } from 'fs/promises'

try {
  const input = await readFile('day-09/input.txt', 'utf-8')
  const directions = input.split('\n')
  const answer = new Set()
  // rope
  // head: knots[0]
  // tail: knots[knots.length -1]
  const knots = new Array(10).fill(0).map((_) => ({ x: 0, y: 0 }))

  const moveHead = {
    // [x, y]
    R: [1, 0],
    L: [-1, 0],
    U: [0, -1],
    D: [0, 1]
  }

  /**
   * 'R': x + 1
   * 'L': x - 1
   * 'U': y + 1
   * 'D': y - 1
   */

  for (const direction of directions) {
    const [dir, numSteps] = direction.split(' ')
    let stepsTaken = 0

    while (stepsTaken < Number(numSteps)) {
      // move head (first item in rope)
      const dX = moveHead[dir][0]
      const dY = moveHead[dir][1]
      knots[0].x += dX
      knots[0].y += dY

      // follow with the rest of the rope (second item on)
      for (let knot = 1; knot < knots.length; knot++) {
        const current = knots[knot]
        const previous = knots[knot - 1]

        const distance = Math.max(
          Math.abs(current.x - previous.x),
          Math.abs(current.y - previous.y)
        )
        if (distance > 1) {
          // 0 nothing (overlaping)
          // 1 or 2 ++
          // -1 or -2 --
          const dirX = previous.x - current.x
          current.x += Math.abs(dirX) === 2 ? dirX / 2 : dirX

          const dirY = previous.y - current.y
          current.y += Math.abs(dirY) === 2 ? dirY / 2 : dirY
        }
      }
      // Add tail location to answer
      const tail = knots[knots.length - 1]
      answer.add(`${tail.x}, ${tail.y}`)
      stepsTaken++
    }
  }

  // 2541
  console.log(`Answer is ${answer.size}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
