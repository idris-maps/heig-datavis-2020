import React, { useState } from 'react'

export default ({ onYearChange }) => {
  const [year, setYear] = useState(2019)
  return <input
    id="year-input"
    type="range"
    min="1800"
    max="2019"
    value={year}
    onChange={e => {
      const y = Number(e.target.value)
      setYear(y)
      onYearChange(y)
    }}
    />

}