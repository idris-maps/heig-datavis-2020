# Recettes

Quelques recettes pour démarrer un site en utilisant différentes librairies

* [d3](https://github.com/idris-maps/heig-datavis-2020/tree/master/recettes/d3)
* [billboard](https://github.com/idris-maps/heig-datavis-2020/tree/master/recettes/billboard)
* [chartjs](https://github.com/idris-maps/heig-datavis-2020/tree/master/recettes/chartjs)

### 1. S'assurer que `.gitignore` contient

```
node_modules
.cache
**/dist
```

### 2. Installer [`parcel`](https://parceljs.org/)

`parcel`, comme [`rollup`](https://rollupjs.org/guide/en/) et [`webpack`](https://webpack.js.org/), sert à compiler les fichiers de développements en un site web. Contrairement aux autres, il n'y a pas besoin de fichier de configuration pour expliquer à `parcel` ce qu'il doit faire. On lui donne simplement un fichier de départ, généralement un HTML, et il compile tous les fichiers CSS et JS liés à celui-ci.

```
npm install parcel-bundler --save-dev
```

### 3. Ajouter un script à `package.json`

Il vous faut expliquer à `parcel` quel est le fichier de départ et le dossier de destination. Il est commun d'avoir un fichier de départ dans un dossier `src` et un dossier de destination `dist` (qui ne doit pas être ajouter à git, voir `.gitignore` plus haut).

Le script ressemble à ceci:

```
parcel <CHEMIN>/src/index.html --out-dir <CHEMIN>/dist
```

voir les scriptes dans mon [package.json](https://github.com/idris-maps/heig-datavis-2020/blob/master/package.json)

Lancez le script:

```
npm run <NOM_DU_SCRIPT>
```