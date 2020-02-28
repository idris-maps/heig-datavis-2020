const fs = require('fs')

const fichier = fs.readFileSync('data.csv', 'utf-8')

const result = fichier
  .split('\n')
  .map(ligne => ligne.split(';'))
  .map(d => ({
    canton: d[2],
    parti: d[5],
    elus: Number(d[12]),
  }))
  .filter(d => d.canton === 'Vaud' && d.elus > 0)
  .map(d => ({ parti: d.parti, elus: d.elus }))

console.log(
  JSON.stringify(result, null, 2)
)

/*
indexes

2 canton
5 parti
12 élus
*/