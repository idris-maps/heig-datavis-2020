import Chart from 'chart.js'

const DATA = [
  { nom: 'Lausanne', population: 138905 },
  { nom: 'Yverdon-les-Bains', population: 30143 },
  { nom: 'Montreux', population: 26574 },
  { nom: 'Renens', population: 21036 },
  { nom: 'Nyon', population: 20533 },
  { nom: 'Vevey', population: 19827 },
]

const canvas = document.getElementById('graphique')
const ctx = canvas.getContext('2d')

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: DATA.map(d => d.nom),
    datasets: [
      {
        label: 'Population',
        data: DATA.map(d => d.population),
        backgroundColor: 'steelblue',
      }
    ]
  }
})