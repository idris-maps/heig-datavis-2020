# Carte des arbres, routes et bâtiments autour de Saint Roch

## Télécharger les données

J'ai choisi d'utiliser l'API open street map pour télécharger toutes les données sur une petite zone. Elles sont converties en GeoJSON avec `osmtogeojson`.

```
curl "https://api.openstreetmap.org/api/0.6/map?bbox=6.645,46.779,6.65,46.783" \
osmtogeojson > heig.json
```

En principe, il doit être possible de sortir les "features" d'un GeoJSON avec `ndjson-split`. Mais ça ne fonctionnait pas pour une raison que j'ignore. J'ai créé un scripte qui lit le GeoJSON et envoie chaque "feature" à la console.

[`toNdjson.js`](toNdjson.js)

```js
const data = require('./heig.json')

data.features.map(d => console.log(JSON.stringify(d)))
```

Après j'ai utilisé `ndjson-filter` pour tirer les données qui m'intéressent. Et `ndjson-reduce | ndjson-map "{type: 'FeatureCollection', features: d}"` pour reconvertir les "features" en collection GeoJSON, comme expliqué [ici](https://github.com/mbostock/ndjson-cli#ndjson_reduce)

Pour les arbres j'ai pris les géométries de type `Point` et les éléments avec `natural: tree`.

```
node toNdjson \
| ndjson-filter "d.geometry.type === 'Point'" \
| ndjson-filter "d.properties.natural === 'tree'" \
| ndjson-reduce \
| ndjson-map "{type: 'FeatureCollection', features: d}" \
> arbres.json
```

Pour les routes, j'ai pris les géométries de type `LineString` et les éléments avec une clé `highway`.

```
node toNdjson \
| ndjson-filter "d.geometry.type === 'LineString'" \
| ndjson-filter "d.properties.highway" \
| ndjson-reduce \
| ndjson-map "{type: 'FeatureCollection', features: d}" \
> routes.json
```

Pour les bâtiments, j'ai pris les géométries de type `Polygon` et les éléments avec une clé `building`

```
node toNdjson \
| ndjson-filter "d.geometry.type === 'Polygon'" \
| ndjson-filter "d.properties.building" \
| ndjson-reduce \
| ndjson-map "{type: 'FeatureCollection', features: d}" \
> batiments.json
```

## Les représenter avec D3

* [Code](src/index.js)
* [Résultat](http://heig-datavis2020.surge.sh/20200403/carte-d3/)