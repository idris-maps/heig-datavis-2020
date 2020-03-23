const fs = require('fs')
const d3 = require('d3')
const R = require('ramda')

// les années qui nous intéressent
const years = R.range(1800, 2021)
// le nom de fichier passé en argument de la console
const fileName = process.argv[2]
// ouvrir le fichier csv
const csv = fs.readFileSync(__dirname + `/temp/${fileName}.csv`, 'utf-8')
// convertir en json avec csvParse de d3
const json = d3.csvParse(csv)

// une fonction qui va chercher la valeur pour une certaine année
const getValueByYear = item => year =>
  R.prop(year, item) === '' ? undefined : Number(R.prop(year, item))

// une fonction à appliquer à chaque élément de "json"
const formatOne = item => ({
  // garder "geo" pour pouvoir joindre les données plus tard
  geo: item.geo,
  // chercher la valeur pour chaque année
  data: years.map(getValueByYear(item))
})

// une fonction pour vérifier que nous avons les valuers de toutes les années
const hasAllYears = item =>
  item.data.filter(Boolean).length === years.length

// envoyer le résultat à la console en tant que chaine de caractères
console.log(
  JSON.stringify(
    json.map(formatOne).filter(hasAllYears)
  )
)