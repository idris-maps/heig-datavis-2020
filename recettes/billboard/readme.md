# recette billboard

* [Docs](https://naver.github.io/billboard.js/demo/)
* [site](http://heig-datavis2020.surge.sh/recettes/billboard/dist/)

## Installation

```
npm install billboard.js --save
```

## Préparation

1. billboard nécessite un élément auquel ajouter le graphique. Dans votre `index.html`

```html
<div id="chart"></div>
```

2. vous avez besoin du fichier CSS billboard. il a été téléchargé quand vous avez installé `billboard.js` et se trouve dans `node_modules`. Dans la `<head>` de `index.html`:

```html
<link rel="stylesheet" href="../../../node_modules/billboard.js/dist/billboard.min.css" />
```

Le chemin vers `node_modules` doit être défini par rapport au fichier `index.html`.

