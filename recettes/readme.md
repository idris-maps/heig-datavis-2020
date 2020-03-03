# Recettes

Quelques recettes pour démarrer un site en utilisant quelques librairies

* [d3]()
* [billboard]()

### 1. S'assurer que `.gitignore` contient

```
node_modules
.cache
**/dist
```

### 2. Installer les librairies

`parcel`

```
npm install parcel-bundler --save-dev
```

voir chaque recette pour les autres librairies

### 3. Ajouter un script à `package.json`

Il vous faut expliquer à `parcel` quel est le fichier de départ et le dossier de destination. Il est commun d'avoir un fichier de départ dans un dossier `src` et un dossier de destination `dist` (qui ne doit pas être ajouter à git, voir `.gitignore` plus haut).

Le script ressemble à ceci:

```
parcel <CHEMIN>/src/index.html --out-dir <CHEMIN>/dist
```

voir les scriptes dans mon [package.json](https://github.com/idris-maps/heig-datavis-2020/blob/master/package.json)

Lancer le script:

```
npm run <NOM_DU_SCRIPT>
```