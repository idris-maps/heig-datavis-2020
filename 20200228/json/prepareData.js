const data = require('./noms.json')

const result =   data
  .filter(d => d.plz === '1000')
  .filter(d => d.sexcode === 'w')
  .map(d => ({ nom: d.nachname, nombre: d.anzahl }))

console.log(
  JSON.stringify(result, null, 2)
)