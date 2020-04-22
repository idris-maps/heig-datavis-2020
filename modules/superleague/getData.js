const cheerio = require('cheerio')
const fs = require('fs')

const page = fs.readFileSync('page.html', 'utf-8')

const $ = cheerio.load(page)

const tbody = $('table.wikitable:nth-child(36) > tbody:nth-child(1)')

const trs = $('tr', tbody)

let result = []

trs.each((index, tr) => {
  if (index !== 0) {
    result.push({
      titres: $('td:nth-child(1) > center', tr).text(),
      club: $('td:nth-child(2) > a', tr).attr('title')
    })
  }
})

console.log(
  JSON.stringify(
    result.map(d => ({ ...d, titres: Number(d.titres) }))
  )
)
