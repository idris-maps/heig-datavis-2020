// importer les librairies
import { select, geoPath, geoMercator } from 'd3'
import { feature } from 'topojson-client'

// importer les données
import meta from './meta.json'
import topojson from './data.json'

// ajouter les objets de votation à l'élément "select"
const selectVotation = document.getElementById('select-votation')

select(selectVotation).selectAll('option')
  .data(meta)
  .enter()
  .append('option')
  .attr('value', d => d.id)
  .text(d => d.name)

// définir la taille de la carte
const WIDTH = 1000
const HEIGHT = 600
const carte = select('#carte')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

// les districts sous forme de geojson
const collection = feature(topojson, topojson.objects.districts)

// la projection pour faire entrer les coordonnées dans le cadre
const projection = geoMercator().fitExtent([[20, 20], [WIDTH - 20, HEIGHT - 20]], collection)

// le créateur d'attribut "d" pour l'élément <path>
const pathCreator = geoPath().projection(projection)

// une fonction pour la couleur des districts en fonction des votes OUI
const getColor = vote => {
  if (vote < 40) { return '#d73027' }
  if (vote < 45) { return '#fc8d59' }
  if (vote < 50) { return '#fee08b' }
  if (vote === 50) { return '#ffffbf' }
  if (vote < 55) { return '#d9ef8b' }
  if (vote < 60) { return '#91cf60' }
  return '#1a9850'
}

// dessiner les districts
const districts = carte.selectAll('path')
  .data(collection.features)
  .enter()
  .append('path')
  .attr('d', d => pathCreator(d))
  .attr('fill', d => getColor(d.properties[meta[0].id]))
  .attr('stroke', 'black')

// changer la couleur quand une votation est selectionnée
selectVotation.addEventListener('change', e => {
  const votationId = e.target.value
  districts
    .transition()
    .attr('fill', d => getColor(d.properties[votationId]))
})


// une légende pour expliquer les couleurs
const colorData = [
  { label: '<40', color: '#d73027' },
  { label: '<45', color: '#fc8d59' },
  { label: '<50', color: '#fee08b' },
  { label: '50', color: '#ffffbf' },
  { label: '>50', color: '#d9ef8b' },
  { label: '>55', color: '#91cf60' },
  { label: '>60', color: '#1a9850' },
]

// la taille d'un carré de couleur de la légende
const SIZE = 30

// un groupe pour la légende placé en bas à gauche
const legend = carte.append('g')
  .attr('transform', `translate(${WIDTH - (colorData.length + 1) * SIZE}, ${HEIGHT - SIZE * 2})`)

// ajouter un rectangle par couleur
legend.selectAll('rect')
  .data(colorData)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * SIZE)
  .attr('width', SIZE)
  .attr('height', SIZE)
  .attr('fill', d => d.color)

// ajouter le texte pour chaque couleur
legend.selectAll('text')
  .data(colorData)
  .enter()
  .append('text')
  .attr('x', (d, i) => i * SIZE + SIZE / 2)
  .attr('y', -(SIZE / 3))
  .attr('width', SIZE)
  .attr('height', SIZE)
  .attr('font-size', SIZE / 2.5)
  .attr('text-anchor', 'middle')
  .attr('fill', 'white')
  .text(d => d.label)