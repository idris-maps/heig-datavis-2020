# Turf

[turf.js](https://turfjs.org/) est un librairie qui permet de faire des transformations sur des données géographiques.

Pour démontrer quelques fonctions de `turf`, nous allons créer une carte avec les bars dans un rayon de un kilomètre autour de la HEIG St-Roch.

[Le résultat](http://heig-datavis2020.surge.sh/20200424/turf/)

## Mise en place

Nous utilisons la librairie [`leaflet`](https://leafletjs.com) pour visualiser la carte.

Un fichier [`index.html`](src/index.html) où nous référençons les fichiers CSS `leaflet.css` et `leaflet-defaulticon-compatibility.css` et avec une `<div>` où la carte va être ajoutée.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Example turf.js</title>
    <link rel="stylesheet" href="../node_modules/leaflet/dist/leaflet.css">
    <link rel="stylesheet" href="../node_modules/leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css">
    <style>
body { padding: 0; margin: 0; }
html, body, #carte { height: 100%; width: 100vw; }
    </style>
  </head>
  <body>
    <div id="carte"></div>   
    <script src="index.js"></script>
  </body>
</html>
```

Un fichier [`index.js`](src/index.js) où la carte est initialisée, centrée sur l'entrée de la HEIG St-Roch et avec un fond de carte.

```js
import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'

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
```

## Dessiner un rayon de 1 km

Pour cela nous allons utiliser la fonction [`circle` de `turf`](https://turfjs.org/docs/#circle), celle-ci prends trois arguments:

* Les coordonnées autour desquelles nous souhaitons dessiner le cercle
* Le rayon
* La configuration où nous decrivons l'unité pour le rayon

Elle retourne un objet geojson de type `Polygon`.

```js
import { circle } from '@turf/turf'

const rayonDe1Km = circle(HEIG, 1000, { units: 'meters' })

L.geoJSON(
  rayonDe1Km,
  { style: { fillOpacity: 0 } } // pas rempli, uniquement contour
).addTo(map)
```

Avec `L.geoJSON().addTo(map)` nous ajoutons le cercle à la carte `leaflet`.

## Un carré qui contient le cercle

Nous allons utiliser l'[API overpass](https://wiki.openstreetmap.org/wiki/Overpass_API) de open street map pour récupérer les bars. Comme la plupart des API géographiques, celle-ci retourne des données à l'intérieur d'un rectangle. Pas autour d'un cercle.

#### bounding box

Un "bounding box" (ou `bbox`) représente les longitudes et latitudes minimales et maximales d'une zone géographique. Par convention (ce n'est pas toujors le cas), elle est représentée par un tableau avec, dans l'ordre:

* la longitude minimum
* la latitude minimum
* la longitude maximum
* la latitude minimum

La fonction [`bbox` de `turf`](https://turfjs.org/docs/#bbox) prends un objet geojson et retourne une "bounding box".

Pour avoir celle de notre `rayonDe1Km`:

```js
import { circle, bbox } from '@turf/turf'

// ...

const bboxRayon1Km = bbox(rayonDe1Km)
```

Dessinons ce carré sur la carte. Pour cela nous devons transformer `bboxRayon1Km` en polygone geojson. Nous le faisons avec la fonction [`bboxPolygon` de `turf`](https://turfjs.org/docs/#bboxPolygon) et ajoutons le résultat à notre carte.

```js
import { circle, bbox, bboxPolygon } from '@turf/turf'

// ...

L.geoJSON(
  bboxPolygon(bboxRayon1Km), // un polygone geojson à partir de "bboxRayon1Km"
  { style: { color: 'indianred', fillOpacity: 0 } } // contour rouge
).addTo(map)
```

## Trouver les bars

Nous avons maintenant un "bounding box" autour de notre rayon de 1 km et pouvons faire la requête pour aller chercher les bars.

Dans un fichier [`getBars.js`](src/getBars.js):

```js
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
```

Dans [`index.js`](src/index.js), nous importons `getBars`. Une fois que nous avons reçu les bars, (c'est une [promesse](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise), ceux-ci sont accessibles à l'intérieur de `.then()`), nous les affichons sur la carte.

Pour chaque bar, `onEachFeature`, nous ajoutons un "pop up" avec le nom du bar et la distance par rapport à l'entrée de la HEIG St-Roch.

La distance est calculée avec la fonction [`distance` de `turf`](https://turfjs.org/docs/#distance).

Celle-ci prends trois arguments:

* le point de départ, `heigGeojson`
* le point d'arrivée, le `feature` de chaque bar
* une configuration où nous définissons l'unité de mesure, `{ unit: 'meters' }`

et retourne un nombre.

```js
import { circle, bbox, bboxPolygon, distance } from '@turf/turf'
import getBars from './getBars'

// ...

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
```