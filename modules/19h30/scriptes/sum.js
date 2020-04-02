const readline = require('readline')
const R = require('ramda')

const keyToSum = process.argv[2]
const keyToSumBy = process.argv[3]

const reader = readline.createInterface({
  input: process.stdin,
})

let result = []

reader.on('line', line => {
  result.push(JSON.parse(line))
})

const reducer = (result, item) => {
  const sumBy = item[keyToSumBy]
  const value = Number(item[keyToSum])
  const exists = result.find(d => d.by === sumBy)
  if (exists) {
    return [
      ...result.filter(d => d.by !== sumBy),
      { ...exists, sum: exists.sum + value}
    ]
  }
  return [
    ...result,
    { by: sumBy, sum: value },
  ]
}

reader.on('close', () => {
  R.pipe(
    R.reduce(reducer, []),
    R.sortBy(R.prop('by')),
    R.map(d => ({ [keyToSumBy]: d.by, [keyToSum]: d.sum })),
    JSON.stringify,
    console.log
  )(result)
})