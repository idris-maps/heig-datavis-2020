# recette `leaflet`

Le site de [leaflet](https://leafletjs.com/) a beaucoup d'exemples intéressants dont vous pouvez vous inspirer.

## Installation

```
npm install leaflet leaflet-defaulticon-compatibility --save
```

`leaflet` est une librairie javascript mais elle vient avec un fichier CSS qui est indispensable pour que la carte soit affichée correctement. Les icônes sont définis dans ce fichier CSS mais ne sont pas proprement exportées quand nous utilisons un "bundler" comme `parcel-bundler` ou `webpack`. `leafet-defaulticon-compatibility` remédie à ce problème.

### Le fichier HTML

Dans [`index.html`](src/index.html), nous devons non seulement lier le fichier javascript, comme avec les autres librairies. Il faut aussi ajouter les fichiers CSS de `leaflet` et `leaflet-defaulticon-compatibility`. Nous prenons ces fichiers directement dans le `node_modules` à la racine du projet.

Il nous faut aussi une `<div>` avec un `id` unique à laquelle nous ajouterons la carte. Celle-ci doit avoir une taille définie, ici `style="width:1000px;height:500px;"`, sinon vous ne verrez pas la carte. Pour avoir une carte qui prends toute la taille de l'écran, voyez le tutoriel [Leaflet on Mobile](https://leafletjs.com/examples/mobile/).

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="../../../node_modules/leaflet/dist/leaflet.css">
    <link rel="stylesheet" href="../../../node_modules/leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css">
  </head>
  <body>
    <div id="map" style="width:1000px;height:500px;"></div>
    <script src="index.js"></script>
  </body>
</html>
```

### Le fichier JS

Dans le fichier [`index.js`](src/index.js), nous devons importer `leaflet` et `leaflet-defaulticon-compatibility`.

```js
import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
```

Jetez un coup d'oeil au [code commenté](src/index.js) pour un exemple d'utilisation.