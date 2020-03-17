const d3 = require('d3')
const fs = require('fs')

const csv = fs.readFileSync(`${__dirname}/temp/regions.csv`, 'utf-8')
const json = d3.csvParse(csv)

const getData = ({ geo, name, six_regions }) => ({
  geo,
  name,
  region: six_regions,
})

console.log(
  JSON.stringify(
    json
      .map(getData)
      .filter(d => d.geo !== ''),
  )
)