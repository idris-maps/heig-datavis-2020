const d3 = require('d3')
const fs = require('fs')
const R = require('ramda')

// ouvrir le fichier
const csv = fs.readFileSync(`${__dirname}/temp/population.csv`, 'utf-8')
// transformer en json
const json = d3.csvParse(csv)
// liste de tous les "geo"s disponibles
const geos = R.uniq(json.map(d => d.geo)).filter(d => d !== '')
// une fonction pour cherchers les données par "geo"
const getDataByGeo = geo => ({
  geo,
  pop: json
    // prendre tous les élément liés à ce "geo"
    .filter(d => d.geo === geo)
    // renommer les clés et transformer les valeurs en nombre
    .map(d => ({
      year: Number(d.time),
      value: Number(d.population)
    }))
})

console.log(
  JSON.stringify(
    geos.map(getDataByGeo)
  )
)
