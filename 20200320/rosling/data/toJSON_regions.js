const d3 = require('d3')
const fs = require('fs')
const R = require('ramda')

const csv = fs.readFileSync(`${__dirname}/temp/regions.csv`, 'utf-8')
const json = d3.csvParse(csv)

console.log(
  JSON.stringify(
    json.map(d => ({
      geo: d.geo,
      region: d.six_regions,
      name: d.name,
    })).filter(d => d.geo !== ''),
    null,
    2
  )
)