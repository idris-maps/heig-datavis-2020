const villes = [
  { nom: 'Lausanne', population: 138905 },
  { nom: 'Yverdon-les-Bains', population: 30143 },
  { nom: 'Montreux', population: 26574 },
  { nom: 'Renens', population: 21036 },
  { nom: 'Nyon', population: 20533 },
  { nom: 'Vevey', population: 19827 },
]

const nomsDesVilles = villes

console.log('Noms des villes', nomsDesVilles)

/*
[
  "Lausanne",
  "Yverdon",
  "Montreux",
  "Renens",
  "Nyon",
  "Vevey"
]
*/

const villesDePlusDe30000Habitants = villes

console.log('Ville de plus de 30000 habitants', villesDePlusDe30000Habitants)

/*
[
    {
      "nom": "Lausanne",
      "population": 138905
    },
    {
      "nom": "Yverdon",
      "population": 30143
    }
  ]
*/

const habitantsYverdon = villes

console.log('Nombre d\'habitants à Yverdon', habitantsYverdon)

// 30143

const sommeHabitants = villes

console.log('Nombre total d\'habitants', sommeHabitants)

// 257018
