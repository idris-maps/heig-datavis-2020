# Carte des arbres, routes et bâtiments autour de Saint Roch

## Télécharger les données

J'ai choisi d'utiliser l'API open street map pour télécharger toutes les données sur une petite zone. Elles sont converties en GeoJSON avec `osmtogeojson`.

```
curl "https://api.openstreetmap.org/api/0.6/map?bbox=6.645,46.779,6.65,46.783" \
| osmtogeojson > heig.json
```

`heig.json`, qui est une `FeatureCollection` de GeoJSON, a ce format:

```js
{
  "type": "FeatureCollection",
  "features": [
    // tous les éléments, "features", sont ici
  ]
}
```

Je vais tirer trois jeux de données de ce fichier: les arbres, les routes et le bâtiments. Dans les trois cas je vais:

* ouvrir le fichier avec `ndjson-cat heig.json`
* le transformer en `ndjson` avec `ndjson-split "d.features"`.
* utiliser `ndjson-filter` pour faire mes séléctions
* recréer un tableau de tous les `Feature`s avec `ndjson-reduce`
* recréer une `FeatureCollection` avec `ndjson-map "{type: 'FeatureCollection', features: d}"`

Pour les arbres j'ai pris les géométries de type `Point` et les éléments avec `natural: tree`.

```bash
ndjson-cat heig.json \
| ndjson-split "d.features" \
| ndjson-filter "d.geometry.type === 'Point'" \
| ndjson-filter "d.properties.natural === 'tree'" \
| ndjson-reduce \
| ndjson-map "{type: 'FeatureCollection', features: d}" \
> arbres.json
```

Pour les routes, j'ai pris les géométries de type `LineString` et les éléments avec une clé `highway`.

```bash
ndjson-cat heig.json \
| ndjson-split "d.features" \
| ndjson-filter "d.geometry.type === 'LineString'" \
| ndjson-filter "d.properties.highway" \
| ndjson-reduce \
| ndjson-map "{type: 'FeatureCollection', features: d}" \
> routes.json
```

Pour les bâtiments, j'ai pris les géométries de type `Polygon` et les éléments avec une clé `building`

```bash
ndjson-cat heig.json \
| ndjson-split "d.features" \
| ndjson-filter "d.geometry.type === 'Polygon'" \
| ndjson-filter "d.properties.building" \
| ndjson-reduce \
| ndjson-map "{type: 'FeatureCollection', features: d}" \
> batiments.json
```

## Les représenter avec D3

* [Code commenté](src/index.js)
* [Résultat](http://heig-datavis2020.surge.sh/20200403/carte-d3/)

## Représenter les arbres avec Leaflet

* Comme vous devez également utiliser des fichiers CSS, regardez la [recette](../../../recettes/leaflet/readme.md)
* [Code commenté](../../../recettes/leaflet/src/index.js)
* [Résultat](http://heig-datavis2020.surge.sh/20200403/carte-leaflet/)