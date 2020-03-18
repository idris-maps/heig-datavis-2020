const d3 = require('d3')
const fs = require('fs')
const R = require('ramda')

// ouvrir le fichier
const csv = fs.readFileSync(`${__dirname}/temp/population.csv`, 'utf-8')

// transformer en json
const json = d3.csvParse(csv)
  .map(d => ({
    ...d,
    // ajouter "year" en tant que "time" en numbre
    year: Number(d.time),
    // transformer "population" en nombre
    population: Number(d.population),
  }))

// liste de tous les "geo"s disponibles
const geos = R.uniq(json.map(d => d.geo)).filter(d => d !== '')

// les années qui nous intéressent
const years = R.range(1800, 2021)

// récupérer toutes les valeurs par année liées à un "geo"
const getDataByGeo = geo => {
  // toutes les valeurs liée à ce "geo"
  const data = json.filter(d => d.geo === geo)
  // une fonction pour aller chercher la population par année
  const getPopByYear = year => R.prop('population', data.find(d => d.year === year))
  // trouver les valeurs de chaque année
  const values = years.map(getPopByYear)
  // retourner les valeurs si nous avons toutes les années, sinon undefined
  return values.filter(Boolean).length === years.length
    ? values
    : undefined
}

// envoyer le résultat à la console en tant que chaine de caractères
console.log(
  JSON.stringify(
    geos
      .map(geo => ({
        // garder "geo" pour joindre avec les autres données
        geo,
        // chercher les valeurs "population" par année
        data: getDataByGeo(geo),
      }))
  )
)
