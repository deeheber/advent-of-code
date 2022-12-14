import { readFile } from 'fs/promises'

try {
  const input = await readFile('day-07/input.txt', 'utf-8')
  const lines = input.split('\n')

  const tree = buildTree(lines)
  let answer = 0

  getSize(tree, (size) => {
    if (size < 100000) {
      answer += size
    }
  })
  // 1915606
  console.log(`Answer is ${answer}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}

function buildTree(lines) {
  const tree = {
    name: '/',
    isDirectory: true,
    children: []
    // size
    // parent
  }

  let currentNode = tree
  let currentCommand = null

  for (const line of lines) {
    const splits = line.split(' ')
    if (line[0] === '$') {
      // command
      const command = splits[1]
      const destination = splits[2]

      currentCommand = command

      if (currentCommand == 'cd') {
        switch (destination) {
          case '/':
            currentNode = tree
            break
          case '..':
            currentNode = currentNode.parent
            break
          default:
            currentNode = currentNode.children.find(
              (f) => f.isDirectory && f.name === destination
            )
        }
      }
    } else if (currentCommand === 'ls') {
      // file(s) or dir(s) from an ls command
      if (splits[0] === 'dir') {
        // dir dirname
        currentNode.children.push({
          name: splits[1],
          isDirectory: true,
          children: [],
          parent: currentNode
        })
      } else {
        // size filename
        currentNode.children.push({
          name: splits[1],
          isDirectory: false,
          size: Number(splits[0]),
          children: [],
          parent: currentNode
        })
      }
    }
  }
  return tree
}

function getSize(node, directoryCallback = () => {}) {
  // file return the size
  if (!node.isDirectory) {
    return node.size
  }
  // directory get size of each child and add together
  const directorySize = node.children
    .map((child) => getSize(child, directoryCallback))
    .reduce((acc, curr) => acc + curr, 0)

  directoryCallback(directorySize)
  return directorySize
}

// helper function used for troubleshooting during dev
function printTree(node, depth = 0) {
  console.log(
    `${' '.repeat(depth * 2)}- ${node.name} (${
      node.isDirectory ? 'dir' : `file, size=${node.size}`
    })`
  )
  if (node.isDirectory) {
    for (const child of node.children) {
      printTree(child, depth + 1)
    }
  }
}
