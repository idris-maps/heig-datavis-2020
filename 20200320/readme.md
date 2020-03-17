# 20 Mars

## Hans Rosling

[Article wikipedia](https://fr.wikipedia.org/wiki/Hans_Rosling)

[![Hans Rosling's 200 Countries, 200 Years, 4 Minutes](https://img.youtube.com/vi/jbkSRLYSojo/0.jpg)](https://www.youtube.com/watch?v=jbkSRLYSojo)

Le [graphique](https://www.gapminder.org/tools/#$chart-type=bubbles) que nous allons reproduire.

![Graphique gapminder](images/gapminder.png)

Dans les graphiques que nous avons créé jusqu'ici (bâtons, camemberts...), un seul jeu de donnée est encodé en éléments visuels. Dans ce cas nous en avons cinq:

* L'espérance de vie sur l'axe vértical
* Le PNB par habitant sur l'axe horizontal
* La population dans la taille des bulles
* La région dans les couleurs des bulles
* Le temps dans avec le "slider" en bas du graphique

### Les données

---

# :question:

Fichier: `questions/rosling_donnees.md`

1. Pourquoi créer un scripte pour télécharger et transformer les données?
2. Dans un scripte `nodejs`, comment peut-on lire les arguments d'une commande?

---

Nous avons 4 jeux de données:

* [Espérance de vie](https://raw.githubusercontent.com/Gapminder-Indicators/lex/master/lex-by-gapminder.xlsx)
* [PNB par habitant](https://raw.githubusercontent.com/Gapminder-Indicators/gdppc_cppp/master/gdppc_cppp-by-gapminder.xlsx)
* [Population](https://docs.google.com/spreadsheets/d/18Ep3s1S0cvlT1ovQG9KdipLEoQ1Ktz5LtTTQpDcWbX0/export?format=xlsx)
* [Régions](https://docs.google.com/spreadsheets/d/1qHalit8sXC0R8oVXibc2wa2gY7bkwGzOybEMTWp-08o/export?format=xlsx)

Chacun de ces jeux de données représente une liste de pays avec des données par année. Ils ont tous une colonne `geo` avec le code en trois lettres [iso-3166-1-alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3). Nous allons utiliser cette colonne pour joindre les données. Toutes ces données sont fournies par [gapminder](https://www.gapminder.org/data/documentation/gd000/). Il rare qu'il soit aussi facile de joindre des séries de données. Nous avons de la chance.

#### Télécharger les données

Nous utilisons [curl](https://curl.haxx.se/) pour télécharger les données dans un dossier `rosling_data/temp` 

```bash
curl https://raw.githubusercontent.com/Gapminder-Indicators/lex/master/lex-by-gapminder.xlsx \
> temp/esperance_de_vie.xlsx

curl https://raw.githubusercontent.com/Gapminder-Indicators/gdppc_cppp/master/gdppc_cppp-by-gapminder.xlsx \
> temp/pnb_p_habitant.xlsx

curl https://docs.google.com/spreadsheets/d/18Ep3s1S0cvlT1ovQG9KdipLEoQ1Ktz5LtTTQpDcWbX0/export?format=xlsx \
> temp/population.xlsx

curl https://docs.google.com/spreadsheets/d/1qHalit8sXC0R8oVXibc2wa2gY7bkwGzOybEMTWp-08o/export?format=xlsx \
> temp/regions.xlsx
```

#### Conversion `xlsx` > `csv`

Tous les fichiers sont au format `xlsx`. En parlant de différents formats de données lors du [cours du 28 Février](https://github.com/idris-maps/heig-datavis-2020/tree/master/20200228#formats), j'ai dit que la manière la plus facile de traiter ce type de fichier est de copier-coller la partie qui vous intéresse dans un fichier `csv`. Le problème avec toutes les manipulations manuelles est qu'on ne se souvient pas toujours de ce qu'on a fait. Et même si nous avons pris note de la procédure, nous devons répéter ces gestes à chaque fois que nous souhaitons mettre à jour ces données. 

Nous allons utiliser la librairie [xlsx](https://www.npmjs.com/package/xlsx) pour extraire les données de ces fichiers.

```
npm install xlsx --save
```

Convertir un `xlsx` en `csv` fonctionne de la manière suivante:

```js
const xlsx = require('xlsx')

const xlsxFile = xlsx.readFile( CHEMIN_VERS_LE_FICHIER )

xlsx.utils.sheet_to_csv(xlsxFile.Sheets[ FEUILLE ])
```

Nous devons passer le chemin vers le fichier pour qu'il puisse être lu. Puis la fonction `sheet_to_csv` doit savoir quelle feuille doit être convertie.

Nous pourrions créer un scripte pour chaque jeu de données. Pour ne pas nous répéter nous allons en créer un seul auquel nous pouvons passer le chemin vers le fichier et le nom de la feuille.

---

### :point_up: Lire les arguments de la console dans un script `nodejs`

Imaginons un scripte `20200320/lire_argv.js` comme ceci:

```js
console.log(process.argv)
```

Si je lance la commande suivante sur mon ordinateur:

```
node 20200320/lire_argv
```

La console retourne:

```js
[
  '/home/anders/.nvm/versions/node/v12.11.1/bin/node',
  '/home/anders/heig-datavis-2020/20200320/lire_argv'
]
```

C'est un tableau de chaines de caractères. Le premier élément est où le programme `node` est installé, le deuxième est le chemin vers le scripte.

Essayons maintenant d'ajouter des arguments:

```
node 20200320/lire_argv un deux trois
```

La console retourne:

```js
[
  '/home/anders/.nvm/versions/node/v12.11.1/bin/node',
  '/home/anders/heig-datavis-2020/20200320/lire_argv',
  'un',
  'deux',
  'trois'
]
```

Nous voyons que nous pouvons passer des informations au script tout simplement en les ajoutant à la commande.

---

Revenons à nos données. Pour chaque fichier nous allons passer le nom du fichier et la "feuille" au scripte qui va convertir les `xlsx` en `csv`.

Créons un scripte `20200320/rosling_data/xslxToCsv.js`:

```js
const xlsx = require('xlsx')

const fileName = process.argv[2] // le nom du fichier est le 3e argument
const sheet = process.argv[3] // le nom de la feuille est le 4e argument

// __dirname est le chemin vers ce scripte
// nos fichiers sont dans un dossier "temp" par rapport à ce scripte
// les fichiers ont tous l'extension xlsx
const xlsxFile = xlsx.readFile(`${__dirname}/temp/${fileName}.xlsx`)

// passons le résultat à la console
console.log(xlsx.utils.sheet_to_csv(xlsxFile.Sheets[sheet]))
```

Nous pouvons maintenant utiliser ce même scripte pour convertir les quatre fichiers en utilisant ce format:

```bash
node xlsxToCsv NOM_DU_FICHIER NOM_DE_LA_FEUILLE > FICHIER_CSV
```

```bash
node xlsxToCsv esperance_de_vie countries_and_territories > temp/esperance_de_vie.csv

node xlsxToCsv pnb_p_habitant countries_and_territories > temp/pnb_p_habitant.csv

node xlsxToCsv population data-countries-etc-by-year > temp/population.csv

node xlsxToCsv regions list-of-countries-etc > temp/regions.csv
```

#### Conversion `csv` > `json`

Dans les fichiers `esperance_de_vie.csv` et `pnb_p_habitant.csv`, chaque ligne représente un pays. Nous avons:

* `geo.name`, le nom du pays
* `indicator.name` la description de l'indicateur
* `geo` le code pays
* `indicator` le code indicateur
* `1800`, `1801`, `1802` ... les valeurs par année

| geo.name              | indicator.name  | geo       | indicator | 1800  | 1801  | 1802  | 1803  | 1804  |
|-----------------------|-----------------|-----------|-----------|-------|-------|-------|-------|-------|
| Abkhazia              | Life expectancy | abkh      | lex       |       |       |       |       |       |
| Afghanistan           | Life expectancy | afg       | lex       | 28.21 | 28.2  | 28.19 | 28.18 | 28.17 |
| Akrotiri and Dhekelia | Life expectancy | akr_a_dhe | lex       |       |       |       |       |       |
| Albania               | Life expectancy | alb       | lex       | 35.4  | 35.4  | 35.4  | 35.4  | 35.4  |
| Algeria               | Life expectancy | dza       | lex       | 28.82 | 28.82 | 28.82 | 28.82 | 28.82 |

test

| geo | name | time | population |
|-----|------|------|------------|
| afg | Afghanistan | 1800 | 3280000 |
| afg | Afghanistan | 1801 | 3280000 |
| afg | Afghanistan | 1802 | 3280000 |

Nous allons convertir chaque ligne en objet json comme suit:

```js
{
  "geo": "afg", // l'identifiant pays
  "lex": [ // les valeurs par année de l'indicateur
    { "year": 1800, "value": 28.21 },
    { "year": 1801, "value": 28.2 },
    // ...
  ]
}
```

Créons un scripte pour convertir ces fichiers où les années sont sous forme de colonnes:

`20200320/rosling_data/toJSON_year_columns.js`

```js
const fs = require('fs')
const d3 = require('d3')

// le nom de fichier passé en argument de la console
const fileName = process.argv[2]
// ouvrir le fichier csv
const csv = fs.readFileSync(__dirname + `/temp/${fileName}.csv`, 'utf-8')
// convertir en json avec csvParse de d3
const jsonD3 = d3.csvParse(csv)
```

[`csvParse`](https://github.com/d3/d3-dsv#api-reference) est une fonction `d3` qui essaye de convertir un fichier `csv` en `json`, voyons à quoi ressemble les valeurs pour l'Afghanistan:

```js
console.log(jsonD3[1])
```

retourne

```js
{
  'geo.name': 'Afghanistan',
  'indicator.name': 'Life expectancy',
  geo: 'afg',
  indicator: 'lex',
  '1800': '28.21',
  '1801': '28.2',
  '1802': '28.19',
  // ...
}
```

Nous avons `geo` et `indicator`, il nous faut convertir les années de

```js
{
  '1800': '28.21',
  '1801': '28.2',
  // ... 
}
```

à

```js
{
  lex: [
    { "year": 1800, "value": 28.21 },
    { "year": 1801, "value": 28.2 },
    // ...
  ]
}
```

Utilisons [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) pour avoir les clés de l'objet Afghanistan:

```js
console.log(Object.keys(jsonD3[1]))
```

retourne:

```js
[
  'geo.name',
  'indicator.name',
  'geo',
  'indicator',
  '1800',
  '1801',
  // ...
]
```

Seuls les années nous intéressent, c'est à dire les clés qui sont des nombres. Utilisons [`isNaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) (is Not a Number) qui retourne `false` si c'est un nombre, `true` si c'en est pas un. 

```js
console.log(
  Object.keys(jsonD3[1])
    .filter(key => !isNaN(Number(key)))
)
```

ne retourne que les années.

Créons une fonction qui va transformer chaque élément du JSON converti par D3 en ce que nous souhaitons avoir.

```js
const fixJsonItem = object => {
  // garder geo et indicator de l'object converti par d3
  const { geo, indicator } = object
  // les années sont les clé qui sont aussi des nombres
  const years = Object.keys(object).filter(key => !isNaN(key))
  // chaque objet au format qui nous intéresse
  return {
    geo, // l'identifiant pays
    // pour l'indicateur trouver la valeur pour chaque année
    [indicator]: years
      .map(year => ({
        year: Number(year),
        value: Number(object[year]),
      }))
      // enlevons les élément où la valeur est 0
      .filter(({ value }) => value !== 0)
  }
}
```

---

### :point_up: définir une clé avec `[]`

Nous pouvons définir une clé d'un objet javascript en l'entourant de `[]`. Par example.

```js
const key = 'ma_clé'

const object = { [key]: 1 }

console.log(object) // { "ma_clé": 1 }
```

C'est ce que nous faisons avec `[indicator]` dans `fixJsonItem`

---

Utilisons `fixJsonItem` avec les données pour l'Afghanistan:

```js
console.log(fixJsonItem(jsonD3[1]))
```

retourne

```js
{
  geo: 'afg',
  lex: [
    { year: 1800, value: 28.21 },
    { year: 1801, value: 28.2 },
    // ...
  ]
}
```

C'est ce que nous voulons, appliquons `fixJsonItem` à tous les éléments de `jsonD3` et transformons le résultat en chaine de caractères pour pouvoir le sauver dans un fichier.

```js
console.log(
  JSON.stringify(
    jsonD3.map(fixJsonItem)
  )
)
```

Convertissons nos deux fichiers:

```bash
node toJSON_year_columns esperance_de_vie > temp/esperance_de_vie.json

node toJSON_year_columns pnb_p_habitant > temp/pnb_p_habitant.json
```