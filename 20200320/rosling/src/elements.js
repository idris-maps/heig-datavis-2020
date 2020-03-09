import {
  axisBottom,
  axisLeft,
} from 'd3'
import data from './data'
import {
  WIDTH,
  HEIGHT,
  MARGIN_LEFT,
  MARGIN_BOTTOM,
  MARGIN_TOP,
  YEAR_DISPLAY_SIZE,
  COUNTRY_DISPLAY_SIZE,
} from './config'
import {
  getColor,
  yScale,
  xScale,
} from './scales'

export const drawAxis = svg => {

  const g = svg.append('g').attr('class', 'axis')

  g.append('g')
    .attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`)
    .call(axisLeft().scale(yScale))

  g.append('text')
    .text('Life expectancy')
    .attr('x', MARGIN_LEFT)
    .attr('y', MARGIN_TOP)
    .attr('font-size', COUNTRY_DISPLAY_SIZE * 0.7)
    .attr('transform', `rotate(90, ${MARGIN_LEFT}, ${MARGIN_TOP}) translate(0, -5)`)

  g.append('g')
    .attr('transform', `translate(${MARGIN_LEFT}, ${HEIGHT - MARGIN_BOTTOM})`)
    .call(axisBottom().scale(xScale).tickFormat(d => `${d / 1000}`))

  g.append('text')
    .text('GDP per capita')
    .attr('x', WIDTH)
    .attr('y', HEIGHT - MARGIN_BOTTOM - 3)
    .attr('text-anchor', 'end')
    .attr('font-size', COUNTRY_DISPLAY_SIZE * 0.7)

}

export const drawCircles = svg => {

  const circlesGroup = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`)

  const circles = circlesGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('fill', getColor)
    .attr('fill-opacity', 0.5)
    .attr('stroke', getColor)
  
  return circles

}

export const drawYearDisplay = svg =>
  svg.append('text')
    .attr('x', WIDTH)
    .attr('y', HEIGHT - MARGIN_BOTTOM - YEAR_DISPLAY_SIZE * 0.2)
    .attr('font-size', YEAR_DISPLAY_SIZE)
    .attr('text-anchor', 'end')
    .attr('opacity', 0.5)

export const drawCountryDisplay = svg =>
  svg.append('text')
    .attr('font-size', COUNTRY_DISPLAY_SIZE)
    .attr('text-anchor', 'middle')