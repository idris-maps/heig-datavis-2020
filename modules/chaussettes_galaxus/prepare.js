const data = require('./chaussettes.json')
const R = require('ramda')

const products = R.path([0, 'data', 'productType', 'filterProductsV4', 'products', 'results'], data)

const getProductData = R.pipe(
  R.pick(['id', 'name', 'brandName', 'nameProperties', 'pricing']),
  d => ({ ...d, price: R.path(['price', 'amountIncl'], d.pricing) }),
  R.omit(['pricing'])
)

console.log(
  JSON.stringify(
    products.map(getProductData)
  )
)