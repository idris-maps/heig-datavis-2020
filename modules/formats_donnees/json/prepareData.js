const data = require('./noms.json')

const womenIn1000 = d => d.plz === '1000' && d.sexcode === 'w'

const result = data
  .filter(womenIn1000)
  .map(d => ({ nom: d.nachname, nombre: d.anzahl }))

console.log(JSON.stringify(result))