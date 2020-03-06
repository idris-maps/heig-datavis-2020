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
  { nom: 'Yverdon', population: 30143 },
  { nom: 'Montreux', population: 26574 },
  { nom: 'Renens', population: 21036 },
  { nom: 'Nyon', population: 20533 },
  { nom: 'Vevey', population: 19827 },
]

const MARGIN_LEFT = 100
const MARGIN_BOTTOM = 50
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length


const yScale = d3.scaleLinear()
  .domain([0, d3.max(DATA, d => d.population)])
  .range([HEIGHT - MARGIN_BOTTOM, 0])

const batons = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)

batons.selectAll('rect')
  .data(DATA)
  .enter()
  .append('rect')
  .attr('x', (d, i) =>  i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.population))
  .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.population))
  .attr('fill', 'steelblue')

  batons.selectAll('text')
    .data(DATA)
    .enter()
    .append('text')
    .text(d => d.nom)
    .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
    .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
    .attr('text-anchor', 'middle')

const axis = d3.axisLeft(yScale)
  .ticks(5)
  .tickFormat(d => `${d / 1000}k`)

const gAxis = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT  * 0.7}, 0)`)
  .call(axis)