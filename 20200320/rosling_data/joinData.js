const R = require('ramda')

// les données par pays
const regions = require('./temp/regions.json')
const population = require('./temp/population.json')
const esperance_de_vie = require('./temp/esperance_de_vie.json')
const pnb_p_habitant = require('./temp/pnb_p_habitant.json')

/*
 * une fonction qui prends une coll// les années qui nous intéressent
const years = R.range(1800, 2021)ection et le nom d'une clé,
 * qui à son tour retourne une fonction qui prends un pays
 * et ajoute les données sous le nom de clé
 *
 */
const addDataFromCollection = (collection, collectionName) =>
  country => ({
    ...country,
    [collectionName]: R.prop('data', collection.find(d => d.geo === country.geo))
  })

// trois fonctions pour ajouter les données de chaque jeu de données
const addPop = addDataFromCollection(population, 'pop')
const addLex = addDataFromCollection(esperance_de_vie, 'lex')
const addGdp = addDataFromCollection(pnb_p_habitant, 'gdp')

// une fonction qui ajoute les trois jeux de données
const addData = R.pipe(
  addPop,
  addLex,
  addGdp,
)

// les années qui nous intéressent
const years = R.range(1800, 2021)
/*
 * une fonction qui vérifie que nous avons le valeurs
 * de toutes les années pour une certaine clé
 */ 
const hasAllYears = (collectionName, country) => {
  // les valeurs sous la clé "collectionName"
  const values = R.prop(collectionName, country)
  // retourne "true" si "values" existe et a la même longueur que la liste des années
  return values && values.length === years.length
}

/*
 * une fonction qui prends un pays
 * et vérifie que nous avons toutes les années
 * pour "pop", "lex" et "gdp"
 */
const hasAllData = country =>
  hasAllYears('pop', country)
  && hasAllYears('lex', country)
  && hasAllYears('gdp', country)

// envoyer le résultat à la console en tant que chaine de caractères
console.log(
  JSON.stringify(
    regions.map(addData).filter(hasAllData)
  )
)
