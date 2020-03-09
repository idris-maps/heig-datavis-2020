const xlsx = require('xlsx')

const fileName = process.argv[2]
const sheet = process.argv[3]

const xlsxFile = xlsx.readFile(`${__dirname}/temp/${fileName}.xlsx`)
console.log(xlsx.utils.sheet_to_csv(xlsxFile.Sheets[sheet]))
