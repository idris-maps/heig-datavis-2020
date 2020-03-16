import React, { useState } from 'react'
import {
  WIDTH,
  HEIGHT
} from '../config'
import Axis from './axis'
import Circles from './circles'
import YearInput from './yearInput'
import YearDisplay from './yearDisplay'

export default () => {
  const [year, setYear] = useState(2019)
  return <>
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <Circles year={year} />
      <YearDisplay year={year} />
      <Axis />
    </svg>
    <YearInput onYearChange={setYear}/>
  </>
}
