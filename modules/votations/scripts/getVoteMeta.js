const data = require('../temp/votations_2020-02-09.json')
const R = require('ramda')

const votes = R.path(['schweiz', 'vorlagen'], data)

const getVoteName = R.pipe(
  R.prop('vorlagenTitel'),
  R.find(d => d.langKey === 'fr'),
  R.prop('text')
)

const getVoteId = R.prop('vorlagenId')

console.log(
  JSON.stringify(
    votes.map(vote => ({
      id: getVoteId(vote),
      name: getVoteName(vote),
    }))
  )
)
