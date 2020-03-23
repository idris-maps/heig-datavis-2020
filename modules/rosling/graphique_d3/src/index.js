import { bubbles, input, yearDisplay, countryDisplay } from './elements'
import { rScale, xScale, yScale, getColorByRegion } from './scales'
import { mouse, select } from 'd3'

// quand l'année change

const onYearChange = year => {
  const index = year - 1800
  bubbles
    .attr('cx', d => xScale(d.gdp[index]))
    .attr('cy', d => yScale(d.lex[index]))
    .attr('r', d => rScale(d.pop[index]))
  yearDisplay.text(year)
}

input.addEventListener('input', e => onYearChange(Number(e.target.value)))

// quand la souris passe sur une bulle

bubbles.on('mouseover', function(d) {
  const [x, y] = mouse(this)

  countryDisplay.text(d.name)
    .attr('x', x)
    .attr('y', y - 20)

  select(this)
    .attr('stroke', 'black')
})

bubbles.on('mousemove', function() {
  const [x, y] = mouse(this)
  countryDisplay
    .attr('x', x)
    .attr('y', y - 20)
})

bubbles.on('mouseout', function() {
  countryDisplay.text('')
  select(this)
    .attr('stroke', getColorByRegion)
})
