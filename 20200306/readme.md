# 6 Mars

## Graphique en bâtons (suite)

* [Recettes](https://github.com/idris-maps/heig-datavis-2020/tree/master/recettes)
* [Axes](https://observablehq.com/@idris-maps/d3-definir-les-axes)

### Exercice

Terminer l'[exercice 3](https://github.com/idris-maps/heig-datavis-2020/tree/master/20200228#exercice-3) du 28 Février

---

## [Observable](https://observablehq.com/@idris-maps/observable)

[Collection de "notebooks" relatif au cours](https://observablehq.com/collection/@idris-maps/heig-visdom-2020)

Alternatives:

* [iodide](https://alpha.iodide.io/)
* [jupyter notebooks](https://jupyter.org/)

### Conversion des examples observable en js

par example le premier graphique en bâtons [ici](https://observablehq.com/@idris-maps/graphiques-en-batons)

```js
viewof d3view = {
  const WIDTH = width
  const HEIGHT = width / 3
  const container = DOM.svg(WIDTH, HEIGHT)
  const svg = d3.select(container)
  /*
    vous pouvez reprendre tout ce qui est ici
  */
  return container
}
```

* `width` est une valeur dynamique crée par observable
* `DOM` est spécifique à observable

Quand vous créez votre propre site:

* Définissez `WIDTH` et `HEIGHT`, par example:

```js
const WIDTH = 300
const HEIGHT = 100
```

* Définissez la constante `svg`

```js
const svg = d3.select('body') // ou l'"id" d'un élément de votre HTML
```

### Différentes manières de définir la taille du SVG

[Exemple](http://heig-datavis2020.surge.sh/20200306/exemples/taille_svg.html) - [Code](https://github.com/idris-maps/heig-datavis-2020/tree/master/20200306/exemples/taille_svg.html)

---

## Visualisations

### Coronavirus

* Le Temps: [article](https://labs.letemps.ch/interactive/2020/carte-coronavirus-monde/) - [repo](https://github.com/labsletemps/coronavirus-world-map-evolution)
* La [source des données](https://github.com/CSSEGISandData/COVID-19)
* La [visualisation d'origine](https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6)
* La même dans un [journal suèdois](https://www.svd.se/det-har-vet-vi-om-coronaviruset-3784)

* Données [worldometers](https://www.worldometers.info/coronavirus/)

### [Sigma awards](https://datajournalism.com/awards/)

* [Made in france - disclose.ngo](https://made-in-france.disclose.ngo/fr) ( [données SIPRI](https://gist.github.com/jsvine/9cb3300588ed402160fe) ventes d'armes )
* [Your smartphone is causing you ‘text neck’ syndrome - South China Morning Post](https://multimedia.scmp.com/lifestyle/article/2183329/text-neck/)
* [Un algoritmo contra la corrupción - ojo-publico.com](https://ojo-publico.com/especiales/funes/)

---

## Data

### Déstructurer

#### `Object`

```javascript
const obj = { name: 'Bernadette', age: 26 }
const { name, age } = obj
console.log(name) // 'Bernadette'
console.log(age) // 26
```

La même chose sans déstructurer:

```javascript
const obj = { name: 'Bernadette', age: 26 }
const name = obj.name
const age = obj.name
console.log(name) // 'Bernadette'
console.log(age) // 26
```

Explications sur [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)

Peut également être utilisé quand un objet est passé comme argument à une fonction:

```javascript
const getName = ({ name }) => name
```

est une autre manière de dire:

```javascript
const getName = person => person.name
```

##### Copier un `Object`

```javascript
const obj1 = { name: 'Bernadette', age: 26 }

const obj2 = { ...obj1 }
console.log(obj2) // { name: 'Bernadette', age: 26 }

const obj3 = { ...obj1, city: 'Yverdon' }
console.log(obj3) // { name: 'Bernadette', age: 26, city: 'Yverdon' }

const { name, ...rest } = obj3
console.log(name) // 'Bernadette'
console.log(rest) // { age: 26, city: 'Yverdon' }
```

#### `Array`

```js
const arr1 = [1, 2, 3]

const arr2 = [...arr1, 4]
console.log(arr2) // [1, 2, 3, 4]

const arr3 = [...arr1, ...arr2]
console.log(arr3) // [1, 2, 3, 1, 2, 3, 4]

const [premier, ...rest] = arr1
console.log(premier) // 1
console.log(rest) // [2, 3]
```

### `reduce` pour autre chose que faire la somme

Nous souhaitons compter les noms suivants

```js
const data = [
  { name: 'A' },
  { name: 'C' },
  { name: 'A' },
  { name: 'A' },
  { name: 'B' },
  { name: 'B' },
  { name: 'C' },
  { name: 'A' },
  { name: 'B' },
  { name: 'A' },
]
```

Pour avoir un résultat:

```js
[
  { name: 'C', count: 2 },
  { name: 'B', count: 3 },
  { name: 'A', count: 5 },
]
```

```js
const valeurDeDepart = []
const compterLesNoms = (res, d) => {
  const exist = res.find(({ name }) => name === d.name)
  if (!exist) {
    return [
      ...res,
      { name: d.name, count: 1 },
    ]
  }
  return [
    ...res.filter(({ name }) => name !== d.name),
    { ...exist, count: exist.count + 1 },
  ]
}

const resultat = data.reduce(compterLesNoms, valeurDeDepart)
```

### Ramda

* [Cours](https://observablehq.com/@idris-maps/methodes-ramda)
* [Documentation](https://ramdajs.com/docs/)

### Fetch

[Documentation MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

```js
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(r => r.json())
  .then(data => /* faire quelque chose avec les données ici */)
```

`fetch` retourne une "promesse" ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)).

`fetch` n'existe que dans le navigateur. Pour l'utiliser dans `node`:

```
npm install node-fetch --save
```

### API Rest

* [Méthodes HTTP](https://www.restapitutorial.com/lessons/httpmethods.html)
* [Exemple de serveur REST](https://jsonplaceholder.typicode.com/)

#### Listes d'APIs

* [github.com/public-apis](https://github.com/public-apis/public-apis)
* [github.com/n0shake/Public-APIs](https://github.com/n0shake/Public-APIs)

### Exercice 1

Fichier: `20200306/fetch_rest.js`

Utilisez
  1. les resources `posts` et `users` de [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)
  2. `fetch` pour télécharger les données
  3. `ramda` pour créer une liste qui ressemble à ça:

```js
[
  {
    nom_utilisateur: 'Machin',
    ville: 'Truc',
    nom_companie: 'Bidule',
    titres_posts: [
      'Titre 1',
      'Titre 2',
    ]
  },
  // ...
]
```

Commencez avec les utilisateurs. Il faut extraire le `nom_utilisateur` (`username`), la `ville` (`address.city`) et le `nom_companie` (`company.name`). Après pour chaque utilisateur, allez chercher les `titres_posts` (les `title` dans la ressource `posts`).

---

## D3

[Introduction à D3](https://observablehq.com/@idris-maps/introduction-a-d3)

Autres resources:

* [Tutoriels officiels](https://github.com/d3/d3/wiki/Tutorials)
* [Lets make a bar chart](https://observablehq.com/@d3/lets-make-a-bar-chart) par [Mike Bostock](https://observablehq.com/@mbostock)
* [How to learn D3.js](https://wattenberger.com/blog/d3) par [Amelia Wattenberger](https://wattenberger.com/)
* [Introduction to D3](https://observablehq.com/@mitvis/introduction-to-d3) par [MIT visualization group](http://vis.csail.mit.edu/)
* [Dashing d3.js](https://www.dashingd3js.com/table-of-contents)

Tutoriels sur youtube:

[![Creative Data Visualizations with SVG and D3.js](https://img.youtube.com/vi/TKv_cUZd9sM/0.jpg)](https://www.youtube.com/watch?v=TKv_cUZd9sM)

[![Let's learn D3.js](https://img.youtube.com/vi/C4t6qfHZ6Tw/0.jpg)](https://www.youtube.com/watch?v=C4t6qfHZ6Tw)

Examples utilisation:

* [D3 gallery](https://observablehq.com/@d3/gallery)
* [Shirley Wu](https://sxywu.com/)
* [Danielle Carrick](http://daniellecarrick.com/)
* [Nadieh Bremer](https://www.visualcinnamon.com/)

Cours:

* [D3 shape](https://observablehq.com/@idris-maps/introduction-a-d3) ([docs](https://github.com/d3/d3-shape))
* [Transitions avec D3](https://observablehq.com/@idris-maps/transitions-avec-d3)
* [Représenter un réseau avec D3](https://observablehq.com/@idris-maps/representer-un-reseau-avec-d3)

### Exercice 2

Dossier `20200306/graphique-d3`

Créez un graphique autre qu'un graphique en bâtons avec D3. Utilisez les données que vous souhaitez (les données pour le graphique en bâtons par exemple).

Utilisez la "recette" [d3](https://github.com/idris-maps/heig-datavis-2020/tree/master/recettes/d3).

