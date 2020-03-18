const R = require('ramda')

// les données par pays
const regions = require('./temp/regions.json')
const pop = require('./temp/population.json')
const lex = require('./temp/esperance_de_vie.json')
const gdppc_cppp = require('./temp/pnb_p_habitant.json')


const getValueByGeoAndYear = 
/*
// renommer la clé gdppc_cppp > gdp
const gdp = gdp_1.map(({ geo, gdppc_cppp }) => ({ geo, gdp: gdppc_cppp }))

// une fonction pour chercher toutes les données par geo
const getData = geo => ({
  pop: R.propOr([], 'pop', pop.find(R.propEq('geo', geo))),
  lex: R.propOr([], 'lex', lex.find(R.propEq('geo', geo))),
  gdp: R.propOr([], 'gdp', gdp.find(R.propEq('geo', geo))),
})

// les pays avec toutes les données
const countriesWithData = regions.map(d => ({
  ...d,
  ...getData(d.geo),
}))

// toutes les années de 1800 à 2020
const years = R.range(1800, 2020)

countriesWithData.map(({ geo, lex, pop, gdp }) => ({
  geo,
  data: years.map(year => ([
    year,

  ]))
}))


// une fonction pour voir si un pays a toutes les valeurs par année pour une clé "key"
const hasAllYearsOf = (key, d) =>
  allYears.every(year => R.prop(key, d).map(R.prop('year')).includes(year))

// une fonction pour voir si un pays a toutes les valeurs
const hasAllYears = d =>
  hasAllYearsOf('pop', d)
  && hasAllYearsOf('lex', d)
  && hasAllYearsOf('gdp', d)

// les pays qui ont toutes les données
const countriesWithAllYears = countriesWithData.filter(hasAllYears)

console.log(
  JSON.stringify(countriesWithAllYears)
)
*/