# Préparer les données pour le graphique "Rosling"

Nous avons 4 jeux de données:

* [Espérance de vie](https://raw.githubusercontent.com/Gapminder-Indicators/lex/master/lex-by-gapminder.xlsx)
* [PNB par habitant](https://raw.githubusercontent.com/Gapminder-Indicators/gdppc_cppp/master/gdppc_cppp-by-gapminder.xlsx)
* [Population](https://docs.google.com/spreadsheets/d/18Ep3s1S0cvlT1ovQG9KdipLEoQ1Ktz5LtTTQpDcWbX0/export?format=xlsx)
* [Régions](https://docs.google.com/spreadsheets/d/1qHalit8sXC0R8oVXibc2wa2gY7bkwGzOybEMTWp-08o/export?format=xlsx)

Ces données sont fournies par [gapminder](https://www.gapminder.org/data/documentation/gd000/).

Nous allons télécharger les données, les préparer et les joindre pour au final avoir un fichier `data.json`. Nous utiliserons ce dernier pour la visualisation plus tard. Nous allons avoir quelques fichiers intérmédiaire que nous mettrons dans un dossier temporaire, `temp`.

## Télécharger les données

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

## Conversion `xlsx` > `csv`

Tous les fichiers sont au format `xlsx`. En parlant de différents formats de données lors du [cours du 28 Février](https://github.com/idris-maps/heig-datavis-2020/tree/master/20200228#formats), j'ai dit que la manière la plus facile de traiter ce type de fichier est de copier-coller la partie qui vous intéresse dans un fichier `csv`. Le problème avec toutes les manipulations manuelles est qu'on ne se souvient pas toujours de ce qu'on a fait. Et même si nous avons pris note de la procédure, nous devons répéter ces gestes à chaque fois que nous souhaitons mettre à jour les données.

Pour garder une trace de ce que nous faisons, et pouvoir répéter la procédure, nous allons créer un scripte qui convertit les `xlsx` en `csv`.Pour cela, nous allons utiliser la librairie [xlsx](https://www.npmjs.com/package/xlsx).

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


## Qu'est ce que nous avons dans ces fichiers `csv`?

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

Dans le fichier `population.csv` nous avons une ligne par pays et année:

| geo | name | time | population |
|-----|------|------|------------|
| afg | Afghanistan | 1800 | 3280000 |
| afg | Afghanistan | 1801 | 3280000 |
| afg | Afghanistan | 1802 | 3280000 |

Dans le fichier `regions.csv`, seuls les colonnes `geo` et `name` et `six_regions` nous intéressent. Il y a une ligne par pays.


| geo | name        | four_regions | eight_regions | six_regions              | members_oecd_g77 | Latitude | Longitude | UN member since | World bank region          | "World bank, 4 income groups 2017" | "World bank, 3 income groups 2017" |
|-----|-------------|--------------|---------------|--------------------------|------------------|----------|-----------|-----------------|----------------------------|------------------------------------|------------------------------------|
| afg | Afghanistan | asia         | asia_west     | south_asia               | g77              | 33       | 66        | 19/11/1946      | South Asia                 | Low income                         |                                    | 
| alb | Albania     | europe       | europe_east   | europe_central_asia      | others           | 41       | 20        | 14/12/1955      | Europe & Central Asia      | Upper middle income                |                                    | 
| dza | Algeria     | africa       | africa_north  | middle_east_north_africa | g77              | 28       | 3         | 8/10/1962       | Middle East & North Africa | Upper middle income                |                                    | 

Tous les jeux de données ont une colonne `geo` avec le code en trois lettres [iso-3166-1-alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3). Nous allons utiliser cette colonne pour joindre les données entre elles.

## Conversion `csv` > `json`

Commençons par convertir chaque `csv` en `json`. Il nous faut trois scriptes différents:

1. `20200320/rosling_data/toJSON_year_columns.js` pour `esperance_de_vie.csv` et `pnb_par habitant.csv`
  * [explication]()
  * [scripte]()
2. `20200320/rosling_data/toJSON_population.js` pour `population.csv`
  * [explication]()
  * [scripte]()
3. `20200320/rosling_data/toJSON_regions.js` pour `regions.csv`
  * [explication]()
  * [scripte]()

Pour les données chiffrées, il nous faut les valeurs pour chaque année entre 1800 et 2020.

---

### :point_up: Créer un tableau de nombre

Avec la fonction [`range`](https://ramdajs.com/docs/#range) de `ramda` nous pouvons créer un tableau de nombre entre deux valeurs:

Par example:

```js
R.range(3, 6)
```

retourne

```js
[ 3, 4, 5 ]
```

Pour avoir les années entre 1800 et 2020, nous utiliserons:

```js
const years = R.range(1800, 2021)
```

---

### `20200320/rosling_data/toJSON_year_columns.js`

Pour `esperance_de_vie.csv` et `pnb_par habitant.csv`, nous allons convertir chaque ligne en objet `json` comme suit:

```js
{
  geo: 'afg',
  data: [1, 2, 3 /* les valeurs pour chaque année */]
}
```

```js
const fs = require('fs')
const d3 = require('d3')
const R = require('ramda')

// les années qui nous intéressent
const years = R.range(1800, 2021)
// le nom de fichier passé en argument de la console
const fileName = process.argv[2]
// ouvrir le fichier csv
const csv = fs.readFileSync(__dirname + `/temp/${fileName}.csv`, 'utf-8')
// convertir en json avec csvParse de d3
const json = d3.csvParse(csv)
```

[`csvParse`](https://github.com/d3/d3-dsv#api-reference) est une fonction `d3` qui essaye de convertir au mieux un fichier `csv` en `json`. Voyons à quoi ressemble les valeurs pour l'espérance de vie en Afghanistan (il n'y a pas de donnée pour le premier, l'Abkhasie) en envoyant le résultat à la console.

```js
console.log(json[1])
```

Et utilsons le scripte sur le fichier `esperance_de_vie.csv`:

```
node toJSON_year_columns esperance_de_vie
```

Nous voyons:

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

Pour chaque élément (`item` dans le scripte ci-dessous), nous allons chercher la valeur pour chaque année:

```js
// une fonction qui va chercher la valeur pour une certaine année
const getValueByYear = item => year =>
  R.prop(year, item) === '' ? undefined : Number(R.prop(year, item))

// une fonction à appliquer à chaque élément de "json"
const formatOne = item => ({
  // garder "geo" pour pouvoir joindre les données plus tard
  geo: item.geo,
  // chercher la valeur pour chaque année
  data: years.map(getValueByYear(item))
})
```

Essayons avec l'Afghanistan:

```js
console.log(formatOne(json[1]))
```

retourne

```js
{
  geo: 'afg',
  data: [28.21,  28.2, 28.19, /* ... */]
}
```

C'est ce que nous voulons. Appliquons `formatOne` a toutes les éléments.

```js
// une fonction pour vérifier que nous avons les valuers de toutes les années
const hasAllYears = item =>
  item.data.filter(Boolean).length === years.length

// envoyer le résultat à la console en tant que chaine de caractères
console.log(
  JSON.stringify(
    json.map(formatOne).filter(hasAllYears)
  )
)
```

Nous ne gardons que les pays pour lesquels nous avons des données pour toutes les années.

Pour créer les fichiers `esperance_de_vie.json` et `pnb_par_habitant.json`:

```
node toJSON_year_columns esperance_de_vie > temp/esperance_de_vie.json
node toJSON_year_columns pnb_p_habitant > temp/pnb_p_habitant.json
```

### `20200320/rosling_data/toJSON_population.js`

Dans le fichier `population.csv`, nous avons une ligne par pays et année, contrairement aux deux fichiers précèdants où nous avions une ligne par pays et toutes les années en colonnes.

Commençons par ouvrir le fichier `csv` et le transformer en `json` avec `d3.parseCsv`.

```js
const d3 = require('d3')
const fs = require('fs')
const R = require('ramda')

// ouvrir le fichier
const csv = fs.readFileSync(`${__dirname}/temp/population.csv`, 'utf-8')

// transformer en json
const json = d3.csvParse(csv)
```

Voyons à quoi ressemble le premier élément:

```js
console.log(json[0])
```

retourne

```js
{
  geo: 'afg',
  name: 'Afghanistan',
  time: '1800',
  population: '3280000'
}
```

Les valeurs de `time` et `population` sont des chaines de caractères. Il nous les faut en tant que nombres.

```js
const json = d3.csvParse(csv)
  .map(d => ({
    ...d,
    // ajouter "year" en tant que "time" en numbre
    year: Number(d.time),
    // transformer "population" en nombre
    population: Number(d.population),
  }))
```

Maintenant

```js
console.log(json[0])
```

retourne

```js
{
  geo: 'afg',
  name: 'Afghanistan',
  time: '1800',
  population: 3280000,
  year: 1800
}
```

Pour chaque `geo`, il nous faut les valeurs pour chaque année. Définissons les `geo` et années (`year`):

```js
// liste de tous les "geo"s disponibles en enlevant ceux qui sont vides
const geos = R.uniq(json.map(d => d.geo)).filter(d => d !== '')

// les années qui nous intéressent
const years = R.range(1800, 2021)
```

Une fonction qui prends un `geo`, va chercher tous les éléments qui y sont liés et récupère la population pour chaque année:

```js
const getDataByGeo = geo => {
  // toutes les valeurs liée à ce "geo"
  const data = json.filter(d => d.geo === geo)
  // une fonction pour aller chercher la population par année
  const getPopByYear = year => R.prop('population', data.find(d => d.year === year))
  // trouver les valeurs de chaque année
  const values = years.map(getPopByYear)
  // retourner les valeurs si nous avons toutes les années, sinon undefined
  return values.filter(Boolean).length === years.length
    ? values
    : undefined
}
```

Appliquons `getDataByGeo` à tous les `geo` et envoyons le résultat à la console.

```js
console.log(
  JSON.stringify(
    geos
      .map(geo => ({
        // garder "geo" pour joindre avec les autres données
        geo,
        // chercher les valeurs "population" par année
        data: getDataByGeo(geo),
      }))
  )
)
```

Le fichier `population.json` est créé avec la commande:

```
node toJSON_population > temp/population.json
```

### `20200320/rosling_data/toJSON_regions.js`

Le dernier, `regions.csv` est le plus facile, nous avons une ligne par pays. Et les valeurs qui nous intéressent sont l'identifiant `geo`, le nom du pays et la région `six_regions`.

Ouvrons le fichier `csv` et transformons le en `json` avec `d3.parseCsv`.

```js
const d3 = require('d3')
const fs = require('fs')

// ouvrir le fichier
const csv = fs.readFileSync(`${__dirname}/temp/regions.csv`, 'utf-8')

// transformer en json
const json = d3.csvParse(csv)
```

Voyons à quoi ressemble le premier élément de `json`.

```js
console.log(json[0])
```

retourne

```js
{
  geo: 'afg',
  name: 'Afghanistan',
  four_regions: 'asia',
  eight_regions: 'asia_west',
  six_regions: 'south_asia',
  members_oecd_g77: 'g77',
  Latitude: '33',
  Longitude: '66',
  'UN member since': '19/11/1946',
  'World bank region': 'South Asia',
  'World bank, 4 income groups 2017': 'Low income',
  'World bank, 3 income groups 2017': ''
}
```

Une fonction pour garder les données qui nous intéressent.

```js
const getData = ({ geo, name, six_regions }) => ({
  geo,
  name,
  region: six_regions,
})
```

Appliquons la fonction sur tous les éléments de `json`, enlevons les `geo` avec une valeur de `''` et utilisons `console.log` et `JSON.stringify` comme avec les autres.

```js
console.log(
  JSON.stringify(
    json
      .map(getData)
      .filter(d => d.geo !== ''),
  )
)
```

Et pour créer `regions.json`:

```
node toJSON_regions > temp/regions.json
```

## Joindre les jeux de données

Nous avons maintenant 4 fichiers `json` que nous devons joindre en un seul. Dans chaque jeu de données nous avons un identifiant pays `geo`. C'est ce que nous allons utiliser pour joindre les fichiers.

Prenons le fichier `regions.json` comme point de départ. Le premier élément ressemble à ça:

```js
{
  geo: 'afg',
  name: 'Afghanistan',
  region: 'south_asia'
}
```

Pour chacun des autres fichiers nous allons chercher l'élément qui correspond à cet identifiant pays, `geo`.

Chargeons toutes les données dans le scripte `20200320/rosling_data/joinData.js`

```js
const R = require('ramda')

// les données par pays
const regions = require('./temp/regions.json')
const population = require('./temp/population.json')
const esperance_de_vie = require('./temp/esperance_de_vie.json')
const pnb_p_habitant = require('./temp/pnb_p_habitant.json')
```

Une fonction qui prends une collection (un des jeux de données `population`, `esperance_de_vie` et `pnb_p_habitant`) et la nom de clé sous laquelle nous ajoutons les données. J'utilise l'identifiant `lex` pour l'espérance de vie comme dans le fichier excel, `gdp` pour le PNB par habitant (`gdppc_cppp` comme utilisé dans le fichier excel est un peu long) et `pop` pour la population.

```js
/*
 * une fonction qui prends une collection et le nom d'une clé,
 * qui à son tour retourne une fonction qui prends un pays
 * et ajoute les données sous le nom de clé
 *
*/
const addDataFromCollection = (collection, collectionName) =>
  country => ({
    ...country,
    [collectionName]: R.prop('data', collection.find(d => d.geo === country.geo))
  })

/*
 * trois fonctions pour ajouter les données de chaque jeu de données
 * chacune prends un pays et ajoute les données sous la clé définie en 2e argument
*/
const addPop = addDataFromCollection(population, 'pop')
const addLex = addDataFromCollection(esperance_de_vie, 'lex')
const addGdp = addDataFromCollection(pnb_p_habitant, 'gdp')

// une fonction qui prends un pays et ajoute les trois jeux de données
const addData = R.pipe(
  addPop,
  addLex,
  addGdp,
)
```

---

### :point_up: définir une clé avec `[]`

Nous pouvons définir une clé d'un objet javascript en l'entourant de `[]`. Par example.

```js
const key = 'ma_clé'

const object = { [key]: 1 }

console.log(object) // { "ma_clé": 1 }
```

C'est ce que nous faisons avec `[collectionName]` dans `addDataFromCollection`

---

Essayons `addData` avec le premier pays de `regions`.

```js
console.log(addData(regions[0]))
```

retourne

```js
{
  geo: 'afg',
  name: 'Afghanistan',
  region: 'south_asia',
  pop: [3280000, 3280000, /* ... */],
  lex: [28.21,  28.2, /* ... */],
  gdp: [603, 603, /* ... */]
}
```

C'est ce que nous voulons. Pour être sûr que chaque pays a des données pour toutes les années:

```js
// les années qui nous intéressent
const years = R.range(1800, 2021)
/*
 * une fonction qui vérifie que nous avons le valeurs
 * de toutes les années pour une certaine clé
 */ 
const hasAllYears = (collectionName, country) => {
  // les valeurs sous la clé "collectionName"
  const values = R.prop(collectionName, country)
  // retourne "true" si "values" existe et a la même longueur que la liste des années
  return values && values.length === years.length
}

/*
 * une fonction qui prends un pays
 * et vérifie que nous avons toutes les années
 * pour "pop", "lex" et "gdp"
 */
const hasAllData = country =>
  hasAllYears('pop', country)
  && hasAllYears('lex', country)
  && hasAllYears('gdp', country)

// envoyer le résultat à la console en tant que chaine de caractères
console.log(
  JSON.stringify(
    regions.map(addData).filter(hasAllData)
  )
)
```

Le fichier `data.json` est créé avec la commande:

```
node joinData > data.json
```

## Un scripte pour toute la procédure

Nous avons créé une série de scriptes pour obtenir le fichier final, `data.json`. Afin de ne pas avoir à lancer toutes les commandes à la main à chaque fois, nous pouvons les ajouter à un scripte [bash](https://fr.wikipedia.org/wiki/Bourne-Again_shell), `donnees.sh`. Le but étant d'avoir une seule commande qui lancera toutes les commandes que nous avons utilisées, les une après les autres.

```bash
#!/bin/bash

# Créer un dossier "temp"
mkdir temp

# Télécharger les fichiers xlsx
curl https://raw.githubusercontent.com/Gapminder-Indicators/lex/master/lex-by-gapminder.xlsx \
> temp/esperance_de_vie.xlsx

curl https://raw.githubusercontent.com/Gapminder-Indicators/gdppc_cppp/master/gdppc_cppp-by-gapminder.xlsx \
> temp/pnb_p_habitant.xlsx

curl https://docs.google.com/spreadsheets/d/18Ep3s1S0cvlT1ovQG9KdipLEoQ1Ktz5LtTTQpDcWbX0/export?format=xlsx \
> temp/population.xlsx

curl https://docs.google.com/spreadsheets/d/1qHalit8sXC0R8oVXibc2wa2gY7bkwGzOybEMTWp-08o/export?format=xlsx \
> temp/regions.xlsx

# Convertir les fichiers xlsx en csv
node xlsxToCsv esperance_de_vie countries_and_territories \
> temp/esperance_de_vie.csv

node xlsxToCsv pnb_p_habitant countries_and_territories \
> temp/pnb_p_habitant.csv

node xlsxToCsv population data-countries-etc-by-year \
> temp/population.csv

node xlsxToCsv regions list-of-countries-etc \
> temp/regions.csv

# Convertir les fichiers csv en json
node toJSON_year_columns esperance_de_vie > temp/esperance_de_vie.json

node toJSON_year_columns pnb_p_habitant > temp/pnb_p_habitant.json

node toJSON_population > temp/population.json

node toJSON_regions > temp/regions.json

# Créer data.json
node joinData > data.json

# Effacer le dossier temporaire
rm -rf temp
```

`#!/bin/bash` est la définition du type de fichier pour expliquer à la machine comment il doit être lu. Les ligne commençant par `#` sont des commentaires, ils ne seront pas lus. Les commandes sont executées les unes après les autres.

Maintenant nous pouvons effacer le dossier `temp` et `data.json`. Pour répéter la procédure, il nous suffit d'utiliser la commande:

```
./donnees.sh
```

---

## Librairies et fonctions js utilisées

* fs.readFileSync
* d3.csvParse
* xlsx.readFile
* xlsx.utils.sheet_to_csv
* R.range
* R.prop
* R.uniq


