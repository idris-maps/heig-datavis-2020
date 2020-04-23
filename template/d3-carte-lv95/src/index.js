// importer les fonctions "d3"
import { select, geoTransform, geoPath } from 'd3'

// importer les cantons
import cantons from './cantons.json'

// le rectangle dans le système de coordonnées LV95 qui englobe toute la Suisse
const boundingBoxCH = [2486100, 1076400, 2833900, 1295200]
const [xMin, yMin, xMax, yMax] = boundingBoxCH

// définir la largeur du svg
const WIDTH = 800

// définir la hauteur en fonction des proportions du rectangle plus haut
const HEIGHT = WIDTH * ((yMax - yMin) / (xMax - xMin))

// ajouter un <svg> à la <div id="carte">
const svg = select('#carte').append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

/*
 * des fonctions pour projeter un point,
 * c'est à dire convertir une coordonnée LV95 en coordonnée du <svg>
 *
 * pour l'axe x, xMin devient 0 et xMax devient WIDTH
 * pour l'axe y, on fait la même chose mais il faut aussi inverser l'axe
 * 
 */
const projectX = x => (x - xMin) / (xMax - xMin) * WIDTH
const projectY = y => HEIGHT - (y - yMin) / (yMax - yMin) * HEIGHT

// définir la projection à l'aide des fonctions ci-dessus
const projection = geoTransform({
  point: function(x, y) { this.stream.point(projectX(x), projectY(y)) }
})

// définir le créateur d'attribut "d" pour l'élément <path>
const pathCreator = geoPath().projection(projection)

// ajouter un <path> par canton au <svg>
svg.selectAll('path')
    .data(cantons.features)
    .enter()
    .append('path')
    .attr('d', pathCreator)

// les coordonnées de la gare d'Yverdon
const yverdon = [2539070, 1181442]

// pour projeter un point, nous devons utiliser les fonctions projectX et projectY
svg.append('circle')
  .attr('cx', projectX(yverdon[0]))
  .attr('cy', projectY(yverdon[1]))
  .attr('r', 10)
  .attr('fill', 'red')