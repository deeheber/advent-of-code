import { readFile } from 'fs/promises'

try {
  const rawInputs = await readFile('day-14/input.txt', 'utf-8')
  const lines = rawInputs.split('\n')

  const map = new Set()
  let maxY = 0

  // Draw rocks
  for (const line of lines) {
    const points = line.split(' -> ').map((pair) => {
      const [x, y] = pair.split(',').map(Number)
      if (y > maxY) {
        maxY = y
      }
      return { x, y }
    })

    let currentPosition = points.shift()
    while (points.length) {
      let targetPosition = points.shift()

      while (
        currentPosition.x !== targetPosition.x ||
        currentPosition.y !== targetPosition.y
      ) {
        map.add(`${currentPosition.x},${currentPosition.y}`)

        if (currentPosition.x !== targetPosition.x) {
          // x does not match
          const delta =
            (targetPosition.x - currentPosition.x) /
            Math.abs(targetPosition.x - currentPosition.x)
          currentPosition.x += delta
        } else {
          // y does not match
          const delta =
            (targetPosition.y - currentPosition.y) /
            Math.abs(targetPosition.y - currentPosition.y)
          currentPosition.y += delta
        }

        map.add(`${currentPosition.x},${currentPosition.y}`)
      }
    }
  }

  // Drop sand
  let intoEndlessVoid = false
  let sandCount = 0
  while (!intoEndlessVoid) {
    let point = { x: 500, y: 0 }
    sandCount += 1

    while (!intoEndlessVoid) {
      if (!map.has(`${point.x},${point.y + 1}`)) {
        // direct fall
        point.y++
      } else if (!map.has(`${point.x - 1},${point.y + 1}`)) {
        // diagonal to the left
        point.x--
        point.y++
      } else if (!map.has(`${point.x + 1},${point.y + 1}`)) {
        // diagonal to the right
        point.x++
        point.y++
      } else {
        // can't fall futher
        map.add(`${point.x},${point.y}`)
        break
      }
      // into endless void
      if (point.y >= maxY) {
        intoEndlessVoid = true
        sandCount--
      }
    }
  }
  // 1406
  console.log(sandCount)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
