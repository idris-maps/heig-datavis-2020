# Paradigmes de programmation

## Exemples

Nous avons réalisé deux version du graphique de Gapminder avec deux manières différentes de joindre des données à des éléments HTML.

Prenons simplement la création de bulles, sans les attributs.

**[La version entièrement avec D3](rosling/graphique_d3/src/elements.js)**

```js
const bubbles = svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
```

Ceci est la procédure de `d3` pour joindre des données à des éléments. Nous l'avons vues plusieurs fois:

- On prends un objet, `svg`, auquel nous souhaitons ajouter des éléments
- On séléctionne les éléments, qui n'existent pas encore: `.selectAll()`
- On joint les données `.data()`
- Quand une donnée "entre", `.enter()`, nous ajoutons un élément, `.append()`

**[La version avec react](rosling/graphique_react/src/index.jsx)**

```jsx
const Bubbles = ({ data }) =>
  data.map(d => <circle key={d.geo} />)
```

Pour le composant `Bubbles`, nous utilisons la méthode `.map()`, qui [comme nous avons vu](https://observablehq.com/@idris-maps/methodes-sur-une-liste-array) transforme une liste en une nouvelle liste. Ici chaque élément de `data` devient un élément `<circle>`.

**Comments les éléments sont ajoutés au DOM**

Avec `d3`, nous avons utilisé la fonction `select` pour prendre l'élément de la page avec un `id="#graph"`. Celui-ci devient un objet `d3` auquel nous pouvons ajouter des éléments avec `.append()`. Ce que nous faisons en ajoutant un `svg`, auquel nous avons ajouté les bulles.

```js
const div = select('#graph')
const svg = div.append('svg')
```

Avec `react`, nous avons créé un composant `Graph`, qui contient un `<svg>`, qui à son tour contient `<Bubbles>`. Ceci est un ["DOM virtuel"](https://reactjs.org/docs/faq-internals.html) qui est ajouté à la page avec la fonction `render`, qui prends ce DOM virtuel et l'ajoute à l'élément avec un `id="graph"`.

```jsx
const Graph = year =>
  <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
    <Bubbles year={year} />
  </svg>

render(Graph(2020), document.getElementById('graph'))
```

## Prgrammation orientée objets et fonctionelles

Ces deux approches ne se ressemblent pas beaucoup. Elles sont inspirées de deux paradigmes de programmation différents:

* La [programmation orientée objets](https://fr.wikipedia.org/wiki/Programmation_orient%C3%A9e_objet) (POO)
* La [programmation fonctionelle](https://fr.wikipedia.org/wiki/Programmation_fonctionnelle) (PF)

Il existe des languages de programmation basés sur un seul paradigme. [Haskell](https://www.haskell.org/) pour la PF et [SmallTalk](http://www.smalltalk.org/) pour la POO, par example. En javascript, nous pouvons utiliser les deux.

On peut dire que l'approche de `d3` plus haut est plutôt orientée objets et celle de `react` plutôt fonctionelle.

Avec `d3.select`, nous créons un objet `div` qui a des méthodes telles que `.append` ou `.selectAll` qui permettent d'ajouter des élément.

Dans notre version avec `react`, nous avons une fonction `Graph` qui prends une année `year` et crée un DOM virtuel qui est ajouté au "vrai" DOM avec `render`.

### Vidéos

Les deux vidéos qui suivent sont à mon avis les meilleures explication de ces paradigmes. Ce sont des discours de [Anjana Vakil](http://vakila.github.io/about/) qui a fait des études de philosophie et travaillé comme prof d'anglais avant de faire du développement informatique. Du coup elle a une manière très claire de les expliquer. Les différences entre POO et FP sont aussi l'objet d'une gué-guerre entre geeks barbus qui ont misé leurs carrières sur l'une ou l'autre approche. Comme nous avons vu les deux approches sont tout à fait valable. Et peuvent être combinées dans un même programme.

Il est intéressant de voir ces vidéos dans l'ordre. Dans la première, elle est super enthousiaste de découvrir la PF. Dans la deuxième, elle se rends compte que la POO n'est pas si mal et que les deux approches se ressemblent beaucoup.

[![Learning Functional Programming with JavaScript](https://img.youtube.com/vi/e-5obm1G_FY/0.jpg)](https://www.youtube.com/watch?v=e-5obm1G_FY)

[![Oops! OOP's not what I thought](https://img.youtube.com/vi/qMdxExJCD5s/0.jpg)](https://www.youtube.com/watch?v=qMdxExJCD5s)

### Principes de la programmation fonctionnelle

#### déclaratif

Nous *déclarons* ce que nous voulons voir. L'opposé est l'approche *impérative*, où nous donnons des ordres à la machine, expliquant ce que nous voulons qu'elle fasse. 

*impératif*:

```javascript
let list = [1, 4, 2]
for (let i = 0; i < list.length; i++) {
  list[i] = list[i] + 1
}
console.log(list) // [2, 5, 3]
```

On dit à la machine:

* prends `list`
* suppose que `i` est égal à 0, `let i = 0`
* tant que `i` est inférieur à la longueur de `list`, `i < list.length`
* incrémente `i`, `i++`
* pour chaque `i`, prends un élément de `list` à cet indexe et ajoute 1, `list[i] = list[i] + 1`

*déclaratif*:

```javascript
const list = [1, 4, 2]
const addOne = n => n + 1
console.log(list.map(addOne)) // [2, 5, 3]
```

On déclare une fonction `addOne` qui prends un nombre et retourne ce nombre plus 1. Cette fonction est appliquée à `list` en passant `addOne` à la méthode `.map`.

Le but des deux paradigmes, POO et PF, est de nous permettre d'écrire du code de manière plus déclarative.

#### pas de mutation

Dans l'approche fonctionelle, nous essayons de ne pas changer des valeurs en dehors de la fonction.

*mutation*

```javascript
let count = 0
const increaseCount = () => {
  count = count + 1
}
increaseCount()
console.log(count) // 1
increaseCount()
console.log(count) // 2
```

Ici à chaque fois que nous utilisons `increaseCount`, nous changeons la valeur de `count` qui est en dehors de la fonction. 

*pas de mutation*

```javascript
const count = 0
const increaseCount = count => count + 1
increase(count)
console.log(count) // 0
const increased = increaseCount(count)
console.log(increased) // 1
console.log(count) // 0
```

Ici `increaseCount` ne change pas la valeur de `count`. C'est une fonction qui prends un nombre et retourne ce nombre plus 1. Si nous l'utilisons, `increaseCount(count)`, `count` a toujours une valeur 0. Nous pouvons créer une nouvelle constante `increased` qui est le résultat de l'application de `increaseCount` sur `count`. Cette dernière aura une valeur de 1, alors que la valeur de `count` est toujours 0.

#### pure

Une fonction est pure si elle retourne toujours la même chose avec les mêmes arguments. Ceci est lié au fait de ne pas muter les valeurs en dehors de la fonction.

*impure*

```javascript
const add = b => {
  a = a + b
  return a
}
let a = 2
console.log(add(3)) // 5
console.log(add(3)) // 8
```

Ici `add` est impure, elle retourne une valeur différente à chaque fois que nous l'appelons

*pure*

```javascript
const add = (a, b) => a + b
console.log(add(2, 3)) // 5
console.log(add(2, 3)) // 5
```

Ici si nous donnons les arguments `2` et `3` `add`, retourne toujours `5`.

L'intérêt est d'avoir plus de contrôle sur notre programme. Quand nous utilisons une fonction, nous savons exactement ce qui va se passer puisqu'elle retourne toujours la même chose si on lui donne les mêmes arguments.

### Programmation orientée objets en javascript

En POO, un objet est contient un état interne et des méthodes pour modifier cet état. En javascript nous utilisons [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) pour créer ce type d'objet.

```js
class Person {
  constructor(name) {
    this.name = name
  }
  friends = []
  addFriend = name => {
    this.friends.push(name)
  }
  talk = () => {
    console.log(`Mon nom est ${this.name}. J'ai ${this.friends.length} amis: ${this.friends.join('et')}`)
  }
}
```

Nous avons une classe `Person`. Quand nous créons une nouvelle personne nous devons lui passer un nom, `constructor(name)`. Son état interne est une liste d'amis, `friends = []`. Nous avons deux méthodes pour interagir avec cet état `.addFriend` pour ajouter un ami et `talk` pour dire combien d'ami elle a.

```js
const anne = new Person('Anne')

anne.addFriend('Bernard')
anne.addFriend('Carole')

anne.talk() // Je m'appelle Anne. J'ai 2 amis: Bernard et Carole
```