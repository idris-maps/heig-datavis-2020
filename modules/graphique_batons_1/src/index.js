// importer la librairie d3
import * as d3 from 'd3'

// les données
const DATA = [
  { nom: 'Lausanne', population: 138905 },
  { nom: 'Yverdon-les-Bains', population: 30143 },
  { nom: 'Montreux', population: 26574 },
  { nom: 'Renens', population: 21036 },
  { nom: 'Nyon', population: 20533 },
  { nom: 'Vevey', population: 19827 },
]

// définir les dimensions
const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5

/*
 * définir la largeur pour chaque bâton
 * en fonction de la largeur du graphique
 * et du nombre de bâtons à dessiner
 */
const BAR_WIDTH = WIDTH / DATA.length

// selectionner le corps du HTML
const svg = d3.select('body')
  // y ajouter un élément SVG
  .append('svg')
  // avec les dimensions définies plus haut
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

// une échelle pour la hauteur
const yScale = d3.scaleLinear()
  // les valeurs en entrée vont de 0 au maximum de population, 138905
  .domain([0, d3.max(DATA, d => d.population)])
  // les valeurs en sortie vont de la hauteur du graphique à 0
  .range([HEIGHT, 0])

// selectionner les "rect" qui n'existent pas encore
svg.selectAll('rect')
  // lier les données à ces "rect"s
  .data(DATA)
  // quand une donnée entre
  .enter()
  // ajouter un élément "rect"
  .append('rect')
  // "x" correspond à l'indexe de la valeur multiplié par BAR_WIDTH
  .attr('x', (d, i) =>  i * BAR_WIDTH)
  // "width" correspond à BAR_WIDTH moins la marge entre les bâtons
  .attr('width', BAR_WIDTH - MARGIN)
  // "y" est défini en passant la population à "yScale"
  .attr('y', d => yScale(d.population))
  // "height" est la hauteur du graphique moins "y"
  .attr('height', d => HEIGHT - yScale(d.population))
  // la couleur des bâtons
  .attr('fill', 'steelblue')

