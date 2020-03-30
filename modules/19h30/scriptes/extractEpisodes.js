const readline = require('readline')
const R = require('ramda')
const dayjs = require('dayjs')

const reader = readline.createInterface({
  input: process.stdin,
})

const dateOfDaysAgo = days => dayjs().subtract(days, 'day').format('YYYY-MM-DD')

const fixDate = date => {
  if (date.includes('Hier')) { return dateOfDaysAgo(1) }
  if (date.includes('samedi')) { return dateOfDaysAgo(2) }
  if (date.includes('vendredi')) { return dateOfDaysAgo(3) }
  if (date.includes('jeudi')) { return dateOfDaysAgo(4) }
  if (date.includes('mercredi')) { return dateOfDaysAgo(5) }
  if (date.includes('mardi')) { return dateOfDaysAgo(6) }
}

const getDate = ({ date }) => {
  const [day] = date.split(',')
  const [ d, m, y ] = day.split('.')
  if (!d || !m || !y) { return fixDate(date) }
  return `${y}-${m}-${d}`
}

const getDurationInSeconds = ({ duration }) => {
  const [m, s] = duration.split(':')
  return Number(m) * 60 + Number(s)
}

const getSegments = ({ segments }) =>
  segments.map(segment => ({
    segment_id: segment.id,
    title: segment.title,
    duration: getDurationInSeconds(segment),
  }))

reader.on('line', line => {
  const json = JSON.parse(line)
  const episodes = json.episodes || []
  episodes.map(episode =>
    console.log(
      JSON.stringify({
        id: episode.id,
        date: getDate(episode),
        duration: getDurationInSeconds(episode),
        views: episode.views,
        segments: getSegments(episode),
      })
    )
  )
})