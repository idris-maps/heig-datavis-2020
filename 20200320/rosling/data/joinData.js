const R = require('ramda')
const regions = require('./temp/regions.json')
const pop = require('./temp/population.json')
const lex = require('./temp/esperance_de_vie.json')
const gdp = require('./temp/pnb_p_habitant.json')

const getData = geo => ({
  pop: R.propOr([], 'pop', pop.find(R.propEq('geo', geo))),
  lex: R.propOr([], 'lex', lex.find(R.propEq('geo', geo))),
  gdp: R.propOr([], 'gdp', gdp.find(R.propEq('geo', geo))),
})
const withData = regions.map(d => ({
  ...d,
  ...getData(d.geo),
}))


const allYears = Array.from(Array(220)).map((d, i) => i + 1800)
const hasAllYearsOf = (key, d) =>
  allYears.every(year => R.prop(key, d).map(R.prop('year')).includes(year))
const hasAllYears = d =>
  hasAllYearsOf('pop', d)
  && hasAllYearsOf('lex', d)
  && hasAllYearsOf('gdp', d)
const withAllYears = withData.filter(hasAllYears)

const getDataForYearByKey = (key, country, year) =>
  R.prop('value', R.prop(key, country).find(d => d.year === year))
const getDataForYear = country => year => ([
  year,
  getDataForYearByKey('gdp', country, year),
  getDataForYearByKey('lex', country, year),
  getDataForYearByKey('pop', country, year),
])
const compress = country => R.omit(['pop', 'lex', 'gdp'], {
  ...country,
  data: allYears.map(getDataForYear(country))
})

console.log(
`
const data = [
${withAllYears.map(compress).map(d => JSON.stringify(d)).join(',\n')}
]

export default data
`
)


