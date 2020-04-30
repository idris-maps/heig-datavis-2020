# Projets

## Structure du projet

```
├── data
│   ├── prepareX.js
│   ├── x.csv
│   └── x.json
├── readme.md
└── src
    ├── graphiqueX.js
    ├── index.html
    └── index.js
```

### Dossier `data`

C'est ici que vous mettez vos données et les scriptes pour les modifier. Il est recommandé de faire un maximum de préparation de données à l'avance, et pas dans le code qui va être passé à la page HTML. Si vous avez des `.map()` ou `.filter()` dans `src`, vous devriez probablement le faire ici. Moins le navigateur a à faire plus vite la page s'affichera.

### Fichier `readme.md`

Le fichier `readme.md` du projet doit contenir:

* D'où viennent les données (où, qui, pourquoi...)
* Comment elles ont été transformées
* Un lien vers le code source de votre visualisation
* Un lien vers votre visualisation publiée
* Quel scripte je dois utiliser pour recréer le site à partir de votre code

### Dossier `src`

Ceci est la source du code qui va être envoyé à la page. Comme vous allez certainement avoir plusieurs graphiques par page, je vous conseille d'avoir un fichier javascript par graphique et d'orchestrer le tout dans `src/index.js`.

Supposons que vous avez un graphique `x`.

* Les données brutes sont dans un fichier `data/x.csv`
* Vous avez transformé ce fichier en `data/x.json` et fait une séléction avec le scripte `data/prepareX.js`
* Dans la page HTML vous avez un élément auquel vous allez ajouter le graphique

```html
<h2>Graphique X</h2>
<div id="graphique-x"></div>
```

* Le code pour dessiner le graphique est dans `src/graphiqueX.js`

```js
// importer les fonctions des librairies que vous utilisez
import { select } from 'd3'
// importer les données
import data from '../data/x.json'

export default divId => {
  const div = select(`#${divId}`)
  // dessiner le graphique
}
```

* Dans `index.js`, vous importez `graphiqueX.js` et lui passez l'`id` de l'élément HTML

```js
import dessinerGraphiqueX from './graphiqueX'

dessinerGraphiqueX('graphique-x')
```

## Liens

* Adrien - [Système solaire](https://github.com/AdriWard/VisuelDon/blob/master/projet/planetSystem20/readme.md)
* Andrea - [Pendulaires](https://github.com/Andreanefer/VisualDonM47/blob/master/Projet-Pendulaires/readme.md)
* Audrey, Michelle et Majka - [Spotify](https://github.com/AudilaraZ/VisualDon/blob/master/projet/readme.md)
* Emilie - [Civilisations](https://github.com/emilie-imhof/visualisation-de-donnees/blob/master/projet/readme.md)
* Ingrid et Julie - [Confinement](https://github.com/julie-greset/visualdon/blob/master/projet/readme.md)
* Jean, Philippe et Leonard - [Jeux vidéos](https://github.com/nobrega1/ProjetDataVis/blob/master/README.md)
* Kevin - [Corona](https://github.com/Saiykoh/VisuDon/blob/master/projet/readme.md)
* Laurie et Olivia - [Tinder](https://github.com/loumloum/projetTinder/blob/master/README.md)
* Leyna et Soraya - [Corona](https://github.com/Soraya97/VisualDon/blob/master/projet/readme.md)
* Robin - [Penis](https://github.com/robiiiiiiiiiiiin/VisualDon/blob/master/projet/readme.md)
* Stéphane - [Marché du travail pour ingénieurs médias](https://github.com/Stephane-panda/datavis/blob/master/projet/readme.md)
* Sébastien - [Tremblements de terre](https://github.com/sebastienRay/VisualDon/blob/master/projet/readme.md)
* Yasmine - [Résidents suisses à l'étranger](https://github.com/yasminehamdan/VisualDonn/blob/master/projet_yasmine/readme.md)