import React from 'react'
import { findDOMNode } from 'react-dom'
import { axisLeft, axisBottom, select } from 'd3'
import {
  MARGIN_BOTTOM,
  MARGIN_TOP,
  MARGIN_LEFT,
  COUNTRY_DISPLAY_SIZE,
  WIDTH,
  HEIGHT,
} from '../config'
import {
  xScale,
  yScale,
} from '../scales'

class Axis extends React.Component {

  componentDidUpdate() { this.addAxis() }
  componentDidMount() { this.addAxis() }

  addAxis() {
    select(findDOMNode(this))
      .call(this.props.axis)
  }

  render() {
    return <g transform={this.props.transform} />
  }

}

export default () =>
  <g>
    <Axis
      transform={`translate(${MARGIN_LEFT}, ${MARGIN_TOP})`}
      axis={axisLeft().scale(yScale)}
      />
    <text
      x={MARGIN_LEFT}
      y={MARGIN_TOP}
      fontSize={COUNTRY_DISPLAY_SIZE * 0.7}
      transform={`rotate(90, ${MARGIN_LEFT}, ${MARGIN_TOP}) translate(0, -5)`}
      >Life expectancy</text>
    <Axis
      transform={`translate(${MARGIN_LEFT}, ${HEIGHT - MARGIN_BOTTOM})`}
      axis={axisBottom().scale(xScale).tickFormat(d => `${d / 1000}`)}
      />
    <text
      x={WIDTH}
      y={HEIGHT - MARGIN_BOTTOM - 3}
      textAnchor="end"
      fontSize={COUNTRY_DISPLAY_SIZE * 0.7}
      >GDP per capita</text>
  </g>
