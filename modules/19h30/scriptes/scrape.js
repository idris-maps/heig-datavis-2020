const fetch = require('node-fetch')
const R = require('ramda')
const dayjs = require('dayjs')
const fs = require('fs')

const getNextMaxDate = maxDate =>
  (maxDate === 'ALL' ? dayjs() : dayjs(maxDate, 'YYYY-MM-DD'))
    .subtract(10, 'day')
    .format('YYYY-MM-DD')

const getLatestEpisodes = maxDate =>
  fetch(`https://www.rts.ch/play/tv/show/6454706/latestEpisodes?maxDate=${maxDate}`)
    .then(r => r.json())

const file = fs.createWriteStream('scraped.ndjson')
const saveLatest = latest =>
  file.write(`${JSON.stringify(latest)}\n`)

const loopShouldEnd = maxDate => {
  if (maxDate === 'ALL') { return false }
  return dayjs(maxDate, 'YYYY-MM-DD').isBefore('2000-01-01', 'YYYY-MM-DD')
}

const loop = (maxDate, callback) => {
  if (loopShouldEnd(maxDate)) {
    return callback()
  }
  getLatestEpisodes(maxDate)
    .then(latest => {
      saveLatest(latest)
      if (R.propOr([], 'episodes', latest).length === 0) {
        return callback()
      }
      const nextMaxDate = getNextMaxDate(maxDate)
      console.log(nextMaxDate)
      setTimeout(() => {
        loop(nextMaxDate, callback)
      }, 1000)
    })
    .catch(callback)
}

loop('ALL', err => console.log(err || 'done'))
