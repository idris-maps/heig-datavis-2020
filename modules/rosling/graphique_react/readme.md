# Utiliser react plutôt que d3.select

[react](https://reactjs.org/) est une libraire créée par facebook pour générer des interfaces utilisateur. Dans cet exemple nous allons remplacer la fonction [`select`](https://github.com/d3/d3-selection) de `d3` par `react`.

## Mise en place

Installer react

```js
npm install react react-dom --save
```

Ajoutons une commande dans `package.json`, pour créer le site.

```js
{
  // ...
  "scripts": {
    // ...
    "rosling-react": "parcel modules/rosling/graphique_react/src/index.html --out-dir modules/rosling/graphique_react/dist",
    // ...
  },
  // ...
}
```

Nous pouvons démarrer le serveur de développement avec:

```
npm run rosling-react
```

---

### :point_up: JSX

React, comme d'autres librairies, utilise un format appellé JSX. C'est une manière de manipuler le [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) qui ne fait pas partie du javascript standard. Le JSX doit être compilé en "vrai" javascript.

`parcel` que j'utilise ici, le fait automatiquement. Si vous utilisez `webpack` vous devez utiliser [`babel-loader`](https://github.com/babel/babel-loader) pour compiler le JSX en JS.

Il n'est pas nécessaire de savoir exactement comment JSX est traduit en JS pour utiliser `react` mais si les détails vous intéressent, jetez un coup d'oeil à cet article: [WTF is JSX?](https://jasonformat.com/wtf-is-jsx/)

---

Les fichiers [`index.html`](src/index.html) et [`index.css`](src/index.css) sont les même que pour le [graphique fait avec d3](../graphique_d3/readme.md). Nous pouvons également garder [`config.js`](src/config.js) et [`scales.js`](src/scales.js).

## Initialiser react

La première chose à changer est l'extension du fichier `index.js` en `index.jsx`.

Dans le HTML:

```html
<script src="index.jsx"></script>
```

Le fichier [`index.jsx`](src/index.jsx)

```jsx
import React from 'react'
import { render } from 'react-dom'

const input = document.getElementById('year-input')
const div = document.getElementById('graph')

const Graph = year =>
  <p>L'année est {year}</p>

render(Graph(2020), div)

input.addEventListener('input', e => {
  const year = Number(e.target.value)
  render(Graph(year), div)
})
```

Nous importons `react` et la fonction `render` de `react-dom`. Les éléments `input` et `div` sont déjà dans le HTML.

`Graph` est un composant react, par convention et pour les différencier des autres fonctions, ils commencent par une lettre majuscule. `Graph` prend un argument `year`, l'année, et retourne un élément `<p>`. Ce n'est pas à proprement parler un élément HTML mais ça en a l'aire. Et c'est tout l'intérêt du JSX, d'avoir l'impression d'écrire des fonctions qui retournent du HTML.

Nous utilisons `render` pour ajouter le composant `Graph` à la `div`. Comme dans l'exemple avec `d3`, 2020 est l'année par défaut. À chaque fois que l'année change nous appelons `render` avec la nouvelle année.

## Créer les bulles

Pour l'instant notre composant `Graph` n'est qu'un paragraphe qui affiche `L'année est {year}` où `year` vient du "slider".

Créons un composant qui génère une bulle.

```jsx
const Bubble = ({ data, yearIndex }) =>
  <circle
    cx={ xScale(data.gdp[yearIndex]) }
    cy={ yScale(data.lex[yearIndex]) }
    r={ rScale(data.pop[yearIndex]) }
    fill={ getColorByRegion(data) }
    stroke={ getColorByRegion(data) }
    fillOpacity="0.4"
    />
```

Nous avons un composant qui prends un objet avec deux clés `data` et `yearIndex`. `data` corresponds aux données pour cette bulle en particulier. `yearIndex` est l'indexe pour sortir la valeur pour une année en particulier. Nous utilisons les mêmes échelles, et la fonction pour la couleur par région, que pour le graphique créé uniquement avec `d3`.

Avec JSX, nous pouvons avoir des attributs dynamiques en entourant le résultat de `{}`. Les attributs statiques, comme `fillOpacity` sont définis comme en HTML. Observez qu'en HTML, le nom de l'attribut s'écrit `fill-opacity`. Le JSX étant un dialecte de javascript, si nous utilisons un tiret, l'ordinateur va le lire comme une soustraction, `fill` moins `opacity`. Du coup, tous les noms d'attributs sont en [camelCase](https://fr.wikipedia.org/wiki/Camel_case).

```jsx
const Bubbles = ({ year }) =>
  data.map(d => <Bubble key={d.geo} data={d} yearIndex={ year - 1800 }/>)
```

Pour le composant `Bubbles` (au pluriel) nous utilisons la méthode `.map()` sur nos données `data`. La fonction à l'intérieur de `map` retourne un élément `Bubble` (singulier). Nous passons `data` et `yearIndex` comme si c'était des attributs d'un élément HTML.

`key` doit prendre un identifiant unique, nous lui passons l'identifiant pays `geo`. Quand nous itérons des composants `react`, il est recommandé d'ajouter `key` pour des raisons de performance. Et si nous ne le faisons pas, nous avons des erreurs dans la console.

## Montrer l'année

Un composant pour montrer l'année. Nous en avions déjà un avec le `<p>` de tout à l'heure. Cette fois nous souhaitons l'avoir dans un élément SVG `<text>`.

```jsx
const Year = ({ year }) =>
  <text
    x={WIDTH}
    y={HEIGHT - MARGIN_BOTTOM - 20}
    fontSize="100"
    textAnchor="end"
    opacity="0.5"
    >{year}</text>
```

## Mise à jour de `Graph`

Utilisons nos composants pour créer un SVG.

```jsx
const Graph = year =>
  <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
    <g transform={`translate(${MARGIN_LEFT}, ${MARGIN_TOP})`}>
      <Bubbles year={year} />
    </g>
    <Year year={year} />
  </svg>
```

Nous n'allons pas refaire tout le graphique. Le but est de montrer comment nous pouvons remplacer `select` de `d3` avec une autre librairie comme `react` tout en gardant certaines fonctions `d3` comme les échelles.