const d3 = require('d3')
const fs = require('fs')

// ouvrir le fichier
const csv = fs.readFileSync(`${__dirname}/temp/regions.csv`, 'utf-8')

// transformer en json
const json = d3.csvParse(csv)

// une fonction pour selectionner les valeurs qui nous intéressent
const getData = ({ geo, name, six_regions }) => ({
  geo,
  name,
  region: six_regions,
})

// envoyer le résultat à la console en tant que chaine de caractères
console.log(
  JSON.stringify(
    json
      .map(getData)
      .filter(d => d.geo !== ''),
  )
)