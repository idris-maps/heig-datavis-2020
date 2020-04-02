const readline = require('readline')
const R = require('ramda')

const reader = readline.createInterface({
  input: process.stdin,
})

reader.on('line', line => {
  const episode = JSON.parse(line)
  const { episode_id, date } = episode
  episode.segments.map(R.pipe(
    (d, i) => ({ ...d, position: i + 1 }),
    R.mergeRight({ episode_id, date }),
    JSON.stringify,
    console.log
  ))
})