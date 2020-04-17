import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
// importer les fonctions "turf"
import { circle, bbox, bboxPolygon, distance } from '@turf/turf'
// importer la fonction pour aller chercher les bars
import getBars from './getBars'

// l'entrée de la HEIG St-Roch (coordonnées et point geojson)
const HEIG = [6.647426, 46.781394]
const heigGeojson = { type: 'Point', coordinates: HEIG }

// initialiser la carte "leaflet"
const map = L.map('carte').setView([HEIG[1], HEIG[0]], 15)
// dans leaflet les coordonnées sont inversées par rapport au geojson

// le fond de carte
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 1,
  maxZoom: 16,
  ext: 'jpg'
}).addTo(map)

// calculer un rayon de 1km autour de l'entrée de HEIG St-Roch
const rayonDe1Km = circle(HEIG, 1000, { units: 'meters' })
L.geoJSON(
  rayonDe1Km,
  { style: { fillOpacity: 0 } } // pas rempli, uniquement contour
).addTo(map)

// le "bounding box" du rayon
const bboxRayon1Km = bbox(rayonDe1Km)
L.geoJSON(
  bboxPolygon(bboxRayon1Km), // un polygone geojson à partir de "bboxRayon1Km"
  { style: { color: 'indianred', fillOpacity: 0 } } // contour rouge
).addTo(map)

// aller chercher les bars à l'intérieur de "bboxRayon1Km"
getBars(bboxRayon1Km)
  .then(bars => {
    // une fois que nous avons les bars, les ajouter à la carte
    L.geoJSON(bars, {
      // pour chaque bar, ajoutons un "pop up" avec le nom et la distance
      onEachFeature: (feature, layer) => {
        const dist = distance(heigGeojson, feature, { units: 'meters' })
        layer.bindPopup(`
          ${feature.properties.name || 'nom inconnu'}
          à ${Math.round(dist)} m
        `)
      }
    }).addTo(map)
  })
  .catch(console.log)
