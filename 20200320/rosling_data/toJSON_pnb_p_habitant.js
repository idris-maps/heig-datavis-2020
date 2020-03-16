const fs = require('fs')
const d3 = require('d3')

const csv = fs.readFileSync(`${__dirname}/temp/pnb_p_habitant.csv`, 'utf-8')
const json = d3.csvParse(csv)

const fixRow = row => {
  const geo = row.geo
  const years = Object.keys(row).filter(key => !isNaN(key))
  const gdp = years.reduce((result, year) => {
    const value = row[year]
    if (value !== '' && !isNaN(value)) {
      return [ ...result, { year: Number(year), value: Number(value) } ]
    }
    return result
  }, [])
  return { geo, gdp }
}

console.log(
  JSON.stringify(
    json.map(fixRow).filter(d => d.gdp.length !== 0),
    null,
    2
  )
)