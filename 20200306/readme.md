# 6 Mars

## Graphiques en bâtons

* [Recettes]()
* [Axes](https://observablehq.com/@idris-maps/d3-definir-les-axes)

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

## [Observable](https://observablehq.com/@idris-maps/observable)

* "réactif"
* différences avec le javascript standard

## D3

* [Transitions avec D3](https://observablehq.com/@idris-maps/transitions-avec-d3)
* [D3 shape](https://observablehq.com/@idris-maps/introduction-a-d3) [docs](https://github.com/d3/d3-shape)

