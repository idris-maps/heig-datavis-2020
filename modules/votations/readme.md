# Carte des votations du 9 Février par district

## Préparation des données

Voir le scripte [`prepareData.sh`](temp/prepareData.sh)

Librairies qui doivent être installée globalement pour faire tourner le scripte:

* [`shapfile`](https://www.npmjs.com/package/shapefile) pour convertir les fichiers `shp` en `geojson`
* [`ndjson-cli`](https://github.com/mbostock/ndjson-cli) pour manipuler les données
* [`topojson`](https://github.com/topojson/topojson) pour transformer les `geojson` en `topjson`

Le résultat sont deux fichiers:

* [`src/meta.json`](src/meta.json) avec les noms et identifiants des objets de votation
* [`src/data.json`](src/data.json) un `topojson` avec les districts et les résultats des votations

