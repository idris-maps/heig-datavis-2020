# Carte des votations du 9 Février par district

Le [résultat](https://heig-datavis2020.surge.sh/20200424/votations/)

## Préparation des données

Voir le scripte [`prepareData.sh`](scripts/prepareData.sh)

Librairies qui doivent être installée globalement pour faire tourner le scripte:

* [`shapfile`](https://www.npmjs.com/package/shapefile) pour convertir les fichiers `shp` en `geojson`
* [`ndjson-cli`](https://github.com/mbostock/ndjson-cli) pour manipuler les données. Pour plus de détails, voir le [cours du 3 Avril](../19h30/donnees.md)
* [`swiss-projection`](https://github.com/idris-maps/swiss-projection) pour convertir les coordonnées suisses en WGS84 (pour pouvoir utiliser la projection mercator)
* [`topojson`](https://github.com/topojson/topojson) pour transformer les `geojson` en `topojson`

Deux fichiers sont créés:

* [`src/meta.json`](src/meta.json) avec les noms et identifiants des objets de votation
* [`src/data.json`](src/data.json) un `topojson` avec les districts et les résultats des votations

## Le scripte de la page

Le code commenté: [`src/index.js`](src/index.js)

Explications:

### Un élément `<select>` pour choisir la votation

Nous prenons les données de `meta.json` pour ajouter les éléments `<option>`

```js
const selectVotation = document.getElementById('select-votation')

select(selectVotation)
  .selectAll('option')
    .data(meta)
    .enter()
    .append('option')
    .attr('value', d => d.id)
    .text(d => d.name)
```

### Ajouter un élément `<svg>`

```js
const WIDTH = 1000
const HEIGHT = 600
const carte = select('#carte')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
```

### Ajouter les districts

La fonction [`feature` de `topojson`](https://github.com/topojson/topojson-client#feature) pour transformer nos données `data.json` en collection `geojson`

```js
const collection = feature(topojson, topojson.objects.districts)
```

La projection, le créateur d'attribut `d` et une fonction pour la couleur en fonction du vote.

```js
const projection = geoMercator().fitExtent([[20, 20], [WIDTH - 20, HEIGHT - 20]], collection)
const pathCreator = geoPath().projection(projection)
const getColor = vote => {
  if (vote < 40) { return '#d73027' }
  if (vote < 45) { return '#fc8d59' }
  if (vote < 50) { return '#fee08b' }
  if (vote === 50) { return '#ffffbf' }
  if (vote < 55) { return '#d9ef8b' }
  if (vote < 60) { return '#91cf60' }
  return '#1a9850'
}
```

Dessiner les districts

```js
const districts = carte.selectAll('path')
  .data(collection.features)
  .enter()
  .append('path')
  .attr('d', d => pathCreator(d))
  .attr('fill', d => getColor(d.properties[meta[0].id]))
  .attr('stroke', 'black')
```

La couleur par défaut est basée sur l'identifiant de la première votation dans `meta` (`meta[0].id`).

### Changer la couleur des districts quand une votation est choisie

```js
selectVotation.addEventListener('change', e => {
  const votationId = e.target.value
  districts
    .transition()
    .attr('fill', d => getColor(d.properties[votationId]))
})
```

### La légende

```js
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

// ajouter un rectangle (carré) par couleur
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
```