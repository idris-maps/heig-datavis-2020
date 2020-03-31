const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin,
})

let result = ''
reader.on('line', line => { result = result + line })
reader.on('close', () => {
  console.log(JSON.stringify({
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: { values: JSON.parse(result) },
    mark: 'bar',
    encoding: {
      x: {
        timeUnit: 'yearmonth',
        field: 'month',
        type: 'temporal',
        axis: {
          labelAlign: 'left',
          labelExpr: 'datum.label'
          }
        },
      y: {
        field: 'duration',
        type: 'quantitative'
      }
    },
    width: 1000,
    height: 200,
  }))
})