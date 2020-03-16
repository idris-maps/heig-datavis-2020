const d3 = require('d3')
const fs = require('fs')
const R = require('ramda')

const csv = fs.readFileSync(`${__dirname}/temp/population.csv`, 'utf-8')
const json = d3.csvParse(csv)

const geos = R.uniq(json.map(R.prop('geo'))).filter(d => d.trim() !== '')

const getYearAndValueByGeo = geo => ({
  geo,
  pop: json.filter(R.propEq('geo', geo))
  .map(d => ({
    year: Number(d.time),
    value: Number(d.population)
  }))
})
  

console.log(
  JSON.stringify(
    geos.map(getYearAndValueByGeo),
    null,
    2
  )
)