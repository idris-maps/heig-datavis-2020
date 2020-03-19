import React from 'react'
import { render } from 'react-dom'
import { WIDTH, HEIGHT, MARGIN_LEFT, MARGIN_TOP, MARGIN_BOTTOM } from './config'
import { rScale, xScale, yScale, getColorByRegion } from './scales'
import data from '../../data/data.json'

const input = document.getElementById('year-input')

const Bubble = ({ data, yearIndex }) =>
  <circle
    cx={ xScale(data.gdp[yearIndex]) }
    cy={ yScale(data.lex[yearIndex]) }
    r={ rScale(data.pop[yearIndex]) }
    fill={ getColorByRegion(data) }
    stroke={ getColorByRegion(data) }
    fillOpacity={0.4}
    />

const Bubbles = ({ year }) =>
  data.map(d => <Bubble key={d.geo} data={d} yearIndex={ year - 1800 }/>)

const Year = ({ year }) =>
  <text
    x={WIDTH}
    y={HEIGHT - MARGIN_BOTTOM - 20}
    fontSize="100"
    textAnchor="end"
    opacity="0.5"
    >{year}</text>

const Graph = year =>
  <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
    <g transform={`translate(${MARGIN_LEFT}, ${MARGIN_TOP})`}>
      <Bubbles year={year} />
    </g>
    <Year year={year} />
  </svg>

render(Graph(2020), document.getElementById('graph'))

input.addEventListener('input', e => {
  const year = Number(e.target.value)
  render(Graph(year), document.getElementById('graph'))
})