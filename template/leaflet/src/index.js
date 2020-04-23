import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'

// les arbres autour de la HEIG
import arbresGeojson from './arbres.json'

// initialiser la carte, ici "carte" est l'id de la <div> de notre index.html
const map = L.map('carte')

// le fond de carte, ici nous utilisons celles de openstreetmap.ch
const fondDeCarte = L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	bounds: [[45, 5], [48, 11]]
})

// ajouter le fond de carte à "map"
fondDeCarte.addTo(map)

// la couche avec les arbres
const coucheArbres = L.geoJSON(arbresGeojson)

// ajouter la couche à "map"
coucheArbres.addTo(map)

// pour que la carte soit centrée sur les arbres
map.fitBounds(coucheArbres.getBounds())