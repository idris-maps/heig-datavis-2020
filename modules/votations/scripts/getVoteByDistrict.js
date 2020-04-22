const data = require('../temp/votations_2020-02-09.json')
const R = require('ramda')

const votes = R.path(['schweiz', 'vorlagen'], data)

const getVoteId = R.prop('vorlagenId')

const getDistricts = voteId =>  R.pipe(
  R.prop('kantone'),
  R.map(R.prop('bezirke')),
  R.flatten,
  R.map(d => ({
    districtId: Number(R.prop('geoLevelnummer', d)),
    voteId,
    result: Math.round(R.path(['resultat', 'jaStimmenInProzent'], d) * 100) / 100,
  }))
)

const votesByDistrict = R.flatten(
  votes.map(vote => {
    const voteId = getVoteId(vote)
    return getDistricts(voteId)(vote)
  })
)


console.log(
  JSON.stringify(
    votesByDistrict
    .reduce((r, { districtId, voteId, result }, index, all) =>
      ([...r, all.filter(d => d.districtId === districtId) ]),
      []
    )
    .map(votes => ({
      districtId: R.path([0, 'districtId'], votes),
      ...votes.reduce((r, { result, voteId }) => ({ ...r, [voteId]: result  }), {})
    })),
    null,
    2
  )
)
