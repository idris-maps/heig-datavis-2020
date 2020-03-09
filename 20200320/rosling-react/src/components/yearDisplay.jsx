import React from 'react'
import {
  WIDTH,
  HEIGHT,
  MARGIN_BOTTOM,
  YEAR_DISPLAY_SIZE
} from '../config'

export default ({ year }) =>
  <text
    x={WIDTH}
    y={HEIGHT - MARGIN_BOTTOM - YEAR_DISPLAY_SIZE * 0.2}
    fontSize={YEAR_DISPLAY_SIZE}
    textAnchor="end"
    opacity={0.5}
    >{year}</text>
