// importer une librairie pour convertir les données OSM en geojson
import osmtogeojson from 'osmtogeojson'

// l'adresse de l'API overpass
const url = `https://overpass-api.de/api/interpreter`

// exporter une fonction qui prends un "bounding box"
export default ([minX, minY, maxX, maxY]) => {
  // créer la requête
  const data = `[out:json];node[amenity=bar](${minY},${minX},${maxY},${maxX});out;`
  // aller chercher les données
  return fetch(`${url}?data=${data}`)
    // lire les données en json
    .then(response => response.json())
    // convertir les données en geojson
    .then(osmtogeojson)
}