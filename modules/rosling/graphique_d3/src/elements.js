import data from '../../data/data.json'
import { select, axisBottom, axisLeft } from 'd3'
import { WIDTH, HEIGHT, MARGIN_LEFT, MARGIN_TOP, MARGIN_BOTTOM } from './config'
import {
  getColorByRegion,
  rScale,
  xScale,
  yScale,
} from './scales'

// le "slider"

export const input = document.getElementById('year-input')

// les bulles

const div = select('#graph')

const svg = div.append('svg').attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const bubblesGroup = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`)

export const bubbles = bubblesGroup.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('fill', getColorByRegion)
  .attr('fill-opacity', 0.4)
  .attr('stroke', getColorByRegion)
  .attr('cx', d => xScale(d.gdp[220]))
  .attr('cy', d => yScale(d.lex[220]))
  .attr('r', d => rScale(d.pop[220]))

// afficher l'année

const YEAR_DISPLAY_SIZE = 100

export const yearDisplay = svg.append('text')
  .attr('x', WIDTH)
  .attr('y', HEIGHT - MARGIN_BOTTOM - YEAR_DISPLAY_SIZE * 0.2)
  .attr('font-size', YEAR_DISPLAY_SIZE)
  .attr('text-anchor', 'end')
  .attr('opacity', 0.5)
  .text(2020)

// les axes

const axisGroup = svg.append('g').attr('class', 'axis')

axisGroup.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`)
  .call(axisLeft().scale(yScale))

axisGroup.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, ${HEIGHT - MARGIN_BOTTOM})`)
  .call(axisBottom().scale(xScale).tickFormat(d => `${d / 1000}`))

// les descriptions des axes

const AXIS_LABEL_SIZE = 10

axisGroup.append('text')
  .text('Life expectancy')
  .attr('x', MARGIN_LEFT)
  .attr('y', MARGIN_TOP)
  .attr('font-size', AXIS_LABEL_SIZE)
  .attr('transform', `rotate(90, ${MARGIN_LEFT}, ${MARGIN_TOP}) translate(0, -5)`)

axisGroup.append('text')
  .text('GDP per capita')
  .attr('x', WIDTH)
  .attr('y', HEIGHT - MARGIN_BOTTOM - 3)
  .attr('text-anchor', 'end')
  .attr('font-size', AXIS_LABEL_SIZE)

// montrer le nom du pays quand la souris passe sur une bulle

export const countryDisplay = bubblesGroup.append('text')
    .attr('font-size', 12)
    .attr('text-anchor', 'middle')