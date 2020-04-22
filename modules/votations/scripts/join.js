const districts = require('../temp/features.json')
const voteByDistrict = require('../temp/votes_by_district.json')

const getVotesByDistrictId = districtId =>
  voteByDistrict.find(d => d.districtId === districtId)


const features = districts.map(feature => ({
  ...feature,
  properties: {
    name: feature.properties.BZNAME,
    ...getVotesByDistrictId(feature.properties.BZNR),
  }
}))

console.log(
  JSON.stringify(
    { type: 'FeatureCollection', features }
  )
)