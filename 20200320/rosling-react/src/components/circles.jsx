import React from 'react'
import {
  MARGIN_LEFT,
  MARGIN_TOP,
} from '../config'
import data from '../data'
import {
  getColor,
  getRByYear,
  getXByYear,
  getYByYear,
} from '../scales'

const Circle = ({ x, y, r, color, geo, onClick }) =>
  <circle
    cx={x}
    cy={y}
    r={r}
    fill={color}
    fillOpacity={0.5}
    stroke={color}

    />

export default ({ year, onClick }) =>
  <g transform={`translate(${MARGIN_LEFT}, ${MARGIN_TOP})`}>
  {data.map(d =>
    <Circle
      key={d.geo}
      x={getXByYear(year)(d)}
      y={getYByYear(year)(d)}
      r={getRByYear(year)(d)}
      color={getColor(d)}
      geo={d.geo}
      onClick={onClick}
      />
  )}
  </g>
