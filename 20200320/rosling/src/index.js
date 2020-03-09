import {
  select,
  event,
  mouse,
} from 'd3'
import {
  WIDTH,
  HEIGHT,
  MARGIN_LEFT,
  MARGIN_TOP,
} from './config'
import {
  getColor,
  getRByYear,
  getXByYear,
  getYByYear,
} from './scales'
import {
  drawAxis,
  drawCircles,
  drawCountryDisplay,
  drawYearDisplay,
} from './elements'

const div = select('#graph')
const input = document.getElementById('year-input')

const svg = div.append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const circles = drawCircles(svg)
const countryDisplay = drawCountryDisplay(svg)
const yearDisplay = drawYearDisplay(svg)
drawAxis(svg)


// Quand la souris passe sur un cercle

circles.on('mouseover', function(d) {
  const [x, y] = mouse(this)
  countryDisplay.text(d.name)
    .attr('x', x + MARGIN_LEFT)
    .attr('y', y + MARGIN_TOP / 2)
  select(this)
    .attr('stroke', 'black')
})

circles.on('mousemove', function() {
  const [x, y] = mouse(this)
  countryDisplay
  .attr('x', x + MARGIN_LEFT)
  .attr('y', y + MARGIN_TOP / 2)
})

circles.on('mouseout', function() {
  countryDisplay.text('')
  select(this)
    .attr('stroke', getColor)
})

// Quand l'année change

const onYearChange = year => {
  circles
    .attr('cx', getXByYear(year))
    .attr('cy', getYByYear(year))
    .attr('r', getRByYear(year))
  input.value = year
  yearDisplay.text(year)
}

input.addEventListener('input', e => onYearChange(Number(e.target.value)))
window.addEventListener('load', () => onYearChange(2019))
