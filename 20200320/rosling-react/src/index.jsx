import React from 'react'
import { render } from 'react-dom'
import Graph from './components/graph'

const App = () =>
  <>
    <h1>Life expectancy and GDP per capita</h1>
    <Graph />
    <p>Data from <a href="https://www.gapminder.org/data/documentation/gd000/">gapminder</a></p>
  </>

render(App(), document.getElementById('content'))