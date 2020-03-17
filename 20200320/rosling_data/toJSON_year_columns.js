const fs = require('fs')
const d3 = require('d3')

// le nom de fichier passé en argument de la console
const fileName = process.argv[2]
// ouvrir le fichier csv
const csv = fs.readFileSync(__dirname + `/temp/${fileName}.csv`, 'utf-8')
// convertir en json avec csvParse de d3
const jsonD3 = d3.csvParse(csv)

const fixJsonItem = object => {
  // garder geo et indicator de l'object converti par d3
  const { geo, indicator } = object
  // les années sont les clé qui sont aussi des nombres
  const years = Object.keys(object).filter(key => !isNaN(key))
  // chaque objet au format qui nous intéresse
  return {
    geo, // l'identifiant pays
    // pour l'indicateur trouver la valeur pour chaque année
    [indicator]: years
      .map(year => ({
        year: Number(year),
        value: Number(object[year]),
      }))
      // enlevons les élément où la valeur est 0
      .filter(({ value }) => value !== 0)
  }
}

console.log(
  JSON.stringify(
    jsonD3.map(fixJsonItem)
  )
)