import { geoPath, geoMercator, select } from 'd3'

// importer les fichiers GeoJSON
import arbres from '../arbres.json'
import routes from '../routes.json'
import batiments from '../batiments.json'

// la taille de la carte
const WIDTH = 800
const HEIGHT = 500

// la projection
const projection = geoMercator().fitExtent([[0, 0], [WIDTH, HEIGHT]], batiments)

// le constructeur d'attribut "d" pour <path />
const pathCreator = geoPath().projection(projection)

// le svg
const svg = select('#carte').append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

// un groupe pour les routes
const groupeRoutes = svg.append('g')

// un <path> par route
groupeRoutes.selectAll('path')
  .data(routes.features)
  .enter()
  .append('path')
  .attr('d', pathCreator)
  .attr('fill', 'none')
  .attr('stroke', 'lightgray')
  .attr('stroke-width', 3)

// un groupe pour les bâtiments
const groupeBatiments = svg.append('g')

// un <path> par bâtiment
groupeBatiments.selectAll('path')
  .data(batiments.features)
  .enter()
  .append('path')
  .attr('d', pathCreator)
  .attr('fill', 'indianred')
  .attr('stroke', 'black')

// un groupe pour les arbres
const groupeArbres = svg.append('g')

/*
 * un <circle> par arbre
 * 
 * Pour les points nous ne pouvons pas utiliser "pathCreator",
 * nous utilisons directement la projection sur les coordonnées
 * 
*/
groupeArbres.selectAll('circle')
  .data(arbres.features)
  .enter()
  .append('circle')
  .attr('cx', d => projection(d.geometry.coordinates)[0])
  .attr('cy', d => projection(d.geometry.coordinates)[1])
  .attr('r', 10)
  .attr('fill', 'forestgreen')