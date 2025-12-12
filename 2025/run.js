#!/usr/bin/env node

import { spawn } from 'child_process'

// Get day and part from command line arguments or environment variables
const day = process.env.day || process.argv[2]
const part = process.env.part || process.argv[3]

if (!day || !part) {
  console.error(
    'Usage: node run.js <day> <part> or npm start day=<day> part=<part>'
  )
  process.exit(1)
}

// Pad day with leading zeros, keep part as-is
const paddedDay = day.toString().padStart(2, '0')
const paddedPart = part.toString()

const scriptPath = `day-${paddedDay}/part-${paddedPart}.js`

console.log(`Running ${scriptPath}...`)

// Spawn the node process
const child = spawn('node', [scriptPath], { stdio: 'inherit' })

child.on('error', (error) => {
  console.error(`Error: ${error.message}`)
  process.exit(1)
})

child.on('close', (code) => {
  process.exit(code)
})
