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
  const [] = useState()
  return <>
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} onClick={() => console.log('SVG')}>
      <Circles year={year} onClick={v => console.log('C', v)}/>
      <YearDisplay year={year} />
      <Axis />
    </svg>
    <YearInput onYearChange={setYear}/>
  </>
}
