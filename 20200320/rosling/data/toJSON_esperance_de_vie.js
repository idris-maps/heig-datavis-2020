const fs = require('fs')
const d3 = require('d3')

const csv = fs.readFileSync(`${__dirname}/temp/esperance_de_vie.csv`, 'utf-8')
const json = d3.csvParse(csv)

const fixRow = row => {
  const geo = row.geo
  const years = Object.keys(row).filter(key => !isNaN(key))
  const lex = years.reduce((result, year) => {
    const value = row[year]
    if (value !== '' && !isNaN(value)) {
      return [ ...result, { year: Number(year), value: Number(value) } ]
    }
    return result
  }, [])
  return { geo, lex }
}

console.log(
  JSON.stringify(
    json.map(fixRow).filter(d => d.lex.length !== 0),
    null,
    2
  )
)