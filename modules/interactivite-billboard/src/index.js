import bb from 'billboard.js'

const DATA = [
  { nom: 'Lausanne', population: 138905, superficie: 41.38 },
  { nom: 'Yverdon', population: 30143, superficie: 11.28 },
  { nom: 'Montreux', population: 26574, superficie: 33.37 },
  { nom: 'Renens', population: 21036, superficie: 2.96 },
  { nom: 'Nyon', population: 20533, superficie: 6.79 },
  { nom: 'Vevey', population: 19827, superficie: 2.38 },
]

// créer une constante "graph" avec les données de départ (la population)
const graph = bb.generate({
  data: {
    json: {
      'Population': DATA.map(({ population }) => population),
    },
    type: 'bar',
  },
  axis: {
    x: {
      type: 'category',
      categories: DATA.map(({ nom }) => nom),
    }
  },
  bindto: document.getElementById('chart')
})

// un bouton pour changer les données à montrer
const bouton = document.getElementById('btn')

// une variable pour savoir quelles données sont montrées
let montreLaPopulation = true

// une fonction pour définir le texte du bouton dépendant de ce qui est montré
const textePourBouton = () =>
  montreLaPopulation
    ? 'Montrer la superficie'
    : 'Montrer la population'

// les données à montrer dépendant de si "montreLaPopulation" est "true" ou "false"
const dataPourLeGraphique = () => 
  montreLaPopulation
    ? { json: { 'Population': DATA.map(({ population }) => population) } }
    : { json: { 'Superficie': DATA.map(({ superficie }) => superficie) } }

// les données à enlever dépendant de ce qui est affiché
const dataAEnlever = () =>
  montreLaPopulation
    ? 'Superficie'
    : 'Population'

// quand le bouton est cliqué
bouton.addEventListener('click', () => {
  // "montreLaPopulatio" devient le contraire de ce qu'il était avant le click
  montreLaPopulation = !montreLaPopulation
  // changer le texte du bouton
  bouton.textContent = textePourBouton()
  // "graph.unload" permet d'enlever les données existantes (pour pouvoir les remplacer)
  graph.unload({
    // les ids des données à enlever
    ids: [dataAEnlever()],
    // quand les données ont été enlevées, charger les nouvelles données avec "graph.load"
    done: () => graph.load(dataPourLeGraphique())
  })
  
})