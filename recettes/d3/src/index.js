import * as d3 from 'd3'

const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5

const svg = d3.select('body')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

const DATA = [
  { nom: 'Lausanne', population: 138905 },
  { nom: 'Yverdon-les-Bains', population: 30143 },
  { nom: 'Montreux', population: 26574 },
  { nom: 'Renens', population: 21036 },
  { nom: 'Nyon', population: 20533 },
  { nom: 'Vevey', population: 19827 },
]

const BAR_WIDTH = WIDTH / DATA.length

const yScale = d3.scaleLinear()
  .domain([0, d3.max(DATA, d => d.population)])
  .range([HEIGHT, 0])

svg.selectAll('rect')
  .data(DATA)
  .enter()
  .append('rect')
  .attr('x', (d, i) =>  i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.population))
  .attr('height', d => HEIGHT - yScale(d.population))
  .attr('fill', 'steelblue')