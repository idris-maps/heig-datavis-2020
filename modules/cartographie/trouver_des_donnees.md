# Trouver des données géographiques

## Natural Earth

Pour des données à l'échelle mondiale, le site [natural earth](https://www.naturalearthdata.com/downloads/) fournis des données aussi bien physique que culturelles dans différentes résolution. Si vous n'avez pas l'intention de créer un poster géant choisissez plutôt l'échelle 1:110m.

Les données sont au format [shapefile](https://fr.wikipedia.org/wiki/Shapefile). Elles ne sont pas utilisable directement avec javascript. Il faut les convertir en [GeoJSON](https://observablehq.com/@idris-maps/donnees-cartographiques). Vous pouvez le faire sur le site [mashaper](https://mapshaper.org/). Vous pouvez prendre une archive `.zip` de Natural Earth et la faire glisser directement dans mapshaper. Vous aurez la possibilité de simplifier les géométries et d'exporter dans plusieurs formats, dont GeoJSON.

## Open street map

Il y a plusieurs manières d'accèder aux données open street map.

### Pour avoir toutes les données sur une zone restreinte

Vous pouvez [téléchargez](https://wiki.openstreetmap.org/wiki/Downloading_data) toutes les données, à l'intérieur d'un rectangle défini, directement des serveurs open street map.

Par exemple pour la zone autour du bâtiment Saint-Roch de la HEIG:

```
curl "https://api.openstreetmap.org/api/0.6/map?bbox=6.645,46.779,6.65,46.783" > heig.osm
```

La partie `bbox=6.645,46.779,6.65,46.783` est la définition du rectangle. Les coordonnées sont, dans l'ordre, la longitude minimum, 6.645, la latitude minimum, 46.779, la longitude maximum, 6.65 et la latitude maximum, 46.783.

Le résultat est un fichier `.osm` qui est un dialecte XML, comme SVG ou HTML. Pour le convertir en GeoJSON, vous pouvez utiliser la librairie `osmtogeojson`.

```
npm install osmtogeojson -g
```

C'est un scripte pour la console, nous n'avons pas besoin de sauver le fichier `.osm`. Nous pouvons passer le résultat de `curl` directement à `osmtogeojson`:

```
curl "https://api.openstreetmap.org/api/0.6/map?bbox=6.645,46.779,6.65,46.783" \
| osmtogeojson > heig.json
```

### Pour avoir toutes les données sur de plus grandes zones

Le site [geofabrik](https://download.geofabrik.de/) mets à disposition des données open street map à l'échelle d'un continent ou d'un pays. Elles peuvent être téléchargées au format `.osm` ou `shapefile`. Utilisez les méthodes décrites plus haut pour les convertir. **Attention** ces fichiers peuvent être très gros. Il ne sont pas utilisables telles qu'elles pour un site web. Une fois converties en GeoJSON vous devez sélectionner la partie qui vous intéresse.

### Pour avoir des données spécifiques

Le site [overpass turbo](https://overpass-turbo.eu/) permet de télécharger les données de votre choix pour une zone déterminée. Comme c'est un outil dans le navigateur, il ne faut pas être trop gourmand, il y a une limite à la taille des données que vous pouvez téléchargez.

Pour utiliser cet outil, il faut savoir comment ce que vous cherchez est appellé dans la logique open street map. Vous trouverez une liste des attributs [ici](https://wiki.openstreetmap.org/wiki/Map_Features).

Par exemple supposons que nous souhaitons avoir tous les restaurants d'Yverdon.

1. Cherchez Yverdon dans le champs au dessus de la carte
2. Quand vous voyez Yverdon sur la carte, appuyez sur le bouton "Wizard"
3. Entrez `amenity=restaurant` (voyez la liste de toutes les valeurs d'`amenity` [ici](https://wiki.openstreetmap.org/wiki/Map_Features#Amenity))
4. Appuyez sur le bouton `build and run query`
5. Quand vous voyez les points s'afficher sur la carte, appuyez sur `Export` et choisissez `GeoJSON`

### Trouver une ville ou une adresse

Si vous avez utilisé la recherche pour trouver Yverdon dans Overpass Turbo, vous avez utilisé l'API nominatim de open street map. Celle-ci permet de rechercher les coordonnées d'un endroit en particulier. La requête pour avoir la position d'Yverdon:

```
https://nominatim.openstreetmap.org/search?city=yverdon&format=json
```

Vous pouvez voir le résultat [ici](https://nominatim.openstreetmap.org/search?city=yverdon&format=json). Pour faire d'autres types de requêtes, non seulement pour trouver une ville comme ci-dessus mais pour trouver une région ou une adresse, voyez la [documentation](https://nominatim.org/release-docs/develop/api/Search/). Cette API est utile si vous souhaitez représenter un jeu de données sur une carte mais n'avez que les adresses et pas les coordonnées.

## Données administratives pour la Suisse

Vous pouvez trouver des données géographiques pour la Suisse sur [opendata.swiss](https://opendata.swiss/fr/dataset?res_format=SHAPEFILE&keywords_en=official-geodata&page=2). Elles sont souvent au format `shapefile`.

Les régions administratives (communes, districts et cantons), peuvent être téléchargées en GeoJSON [ici](https://observablehq.com/@idris-maps/swiss-geodata).

**Attention** les géodonnées suisses sont souvent dans le [système de coordonnées suisses](https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_coordonn%C3%A9es_g%C3%A9ographiques_suisse). Voyez le [cours sur la cartographie avec D3](https://observablehq.com/@idris-maps/la-cartographie-avec-d3) pour projeter ce type de systèmes de coordonnées. Si vous devez convertir les données en [WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System), le format utilisé par open street map et la majorité des outils en ligne, voyez la librairie [`swiss-projection`](https://www.npmjs.com/package/swiss-projection).

## Dessiner les géométries

Si vous souhaitez représenter des géométries qui ne sont pas disponibles dans les jeux de données ci-dessus, vous pouvez les dessiner vous même [ici](https://idris-draw.surge.sh/) et les exporter au format GeoJSON en cliquant l'icône "Télécharger" dans le menu à gauche.