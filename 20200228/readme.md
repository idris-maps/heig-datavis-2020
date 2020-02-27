# 28 Février

## Exemples de visualisations

* [Internet live stats](https://www.internetlivestats.com/)
* [Your Apps Know Where You Were Last Night](https://www.nytimes.com/interactive/2018/12/10/business/location-data-privacy-apps.html)
* [Pornhub 2019 - year in review](pornhub_2019.md)

## Utiliser les données en javascript

[Structure de données javascript](https://observablehq.com/@idris-maps/structure-de-donnees-javascript)

### Exercice 1

* Copiez le fichier `20200228/exercice_1.js`
* Utilisez les [méthodes sur une liste](https://observablehq.com/@idris-maps/methodes-sur-une-liste-array) pour avoir le résultat escompté. 

**Logiciels**

* [node.js](https://nodejs.org/en/)
* [curl](https://curl.haxx.se/)

### Formats

#### JSON

[noms de famille par code postal](https://opendata.swiss/fr/dataset/nachnamen-pro-plz)

#### CSV

[éléctions conseil national 2019](https://opendata.swiss/en/dataset/eidg-wahlen-2019/resource/001dbea9-820a-48ef-a88b-1b986f07852c)

#### XLS

[Mouvements touristiques des Suisses à l'étranger](https://opendata.swiss/en/dataset/reiseverkehr-der-schweizer-ins-ausland/resource/5533a513-e06f-490a-91d7-183e727808ff)

### Exercice 2

* Trouvez et préparez un jeu de données pour faire un graphique en bâtons.
* Ajoutez un fichier `20200228/readme.md` où vous expliquez ce que vous avez fait
* Le résultat est un fichier `20200228/data.json` avec une liste d'objets contenant au moins un nom pour la légende est une valeur numérique.

## Graphique en bâtons

[Types de visualisations de données](https://observablehq.com/@idris-maps/visualisation-de-donnees)

### Préparer l'environement de développement

1. **Important**: ajoutez `node_modules` au fichier `.gitignore` à la racine de votre repo de cours.

2. Initialiser npm

```
npm init -y
```

3. Téléchargez les librairies:

```
npm install parcel-bundler --save-dev
npm install d3 --save
```

[Site parcel](https://parceljs.org/). Alternatives: [webpack](https://webpack.js.org/) et [rollup](https://rollupjs.org/guide/en/)

4. Mise en place

  * Dans `20200228`, créer un dossier `src`
  * Un fichier `20200228/src/index.html`
  * Un fichier `20200228/src/index.js`
  * Ajouter un script `dev:batons`: `parcel 20200228/src/index.html --out-dir 20200228/dist`
  * Ajouter `20200228/dist` et `20200228/.cache` à `.gitignore`

### D3 - lier des données à des éléments

[Cours](https://observablehq.com/@idris-maps/d3-joindre-des-donnees-a-des-elements)

### Autres librairies pour créer un graphique en bâtons

[Exemples](https://observablehq.com/@idris-maps/graphiques-en-batons)

### Exercice 3

Créer un graphique en bâtons avec les données préparées plus tôt.