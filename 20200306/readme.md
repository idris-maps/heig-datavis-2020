# 6 Mars

## Graphique en bâtons (suite)

* [Recettes](https://github.com/idris-maps/heig-datavis-2020/tree/master/recettes)
* [Axes](https://observablehq.com/@idris-maps/d3-definir-les-axes)

### Exercice

Terminer l'[exercice 3](https://github.com/idris-maps/heig-datavis-2020/tree/master/20200228#exercice-3) du 28 Février

## [Observable](https://observablehq.com/@idris-maps/observable)

[Collection de "notebooks" relatif au cours](https://observablehq.com/collection/@idris-maps/heig-visdom-2020)

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

[Exemple](http://heig-datavis2020.surge.sh/20200306/exemples/taille_svg.html) - [Code](https://github.com/idris-maps/heig-datavis-2020/tree/master/20200306/examples/taille_svg.html)

## Data

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

### Déstructurer et copier un objet

#### Déstructurer

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
const getName = per[1, 2, 3, 4]son => person.name
```

#### Copier

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

### Déstructurer et copier un `Array`

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

### Ramda

[Cours](https://observablehq.com/@idris-maps/methodes-ramda)

### Exercice 2




## D3

Autres ressources:

* [Tutoriels officiels](https://github.com/d3/d3/wiki/Tutorials)
* [Lets make a bar chart](https://observablehq.com/@d3/lets-make-a-bar-chart) par [Mike Bostock](https://observablehq.com/@mbostock)
* [How to learn D3.js](https://wattenberger.com/blog/d3) par [Amelia Wattenberger](https://wattenberger.com/)
* [Introduction to D3](https://observablehq.com/@mitvis/introduction-to-d3) par [MIT visualization group](http://vis.csail.mit.edu/)
* [Dashing d3.js](https://www.dashingd3js.com/table-of-contents)

Tutoriels sur youtube:

[![Creative Data Visualizations with SVG and D3.js](https://img.youtube.com/vi/TKv_cUZd9sM/0.jpg)](https://www.youtube.com/watch?v=TKv_cUZd9sM)

[![Let's learn D3.js](https://img.youtube.com/vi/C4t6qfHZ6Tw/0.jpg)](https://www.youtube.com/watch?v=C4t6qfHZ6Tw)

Examples utilisateurs:

* [Sirley Wu](https://sxywu.com/)
* [Danielle Carrick](http://daniellecarrick.com/)
* [Nadieh Bremer](https://www.visualcinnamon.com/)

Cours:

* [Transitions avec D3](https://observablehq.com/@idris-maps/transitions-avec-d3)
* [D3 shape](https://observablehq.com/@idris-maps/introduction-a-d3) [docs](https://github.com/d3/d3-shape)

