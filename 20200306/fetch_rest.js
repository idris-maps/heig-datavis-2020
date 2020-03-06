const fetch = require('node-fetch')
const R = require('ramda')
const url = 'https://jsonplaceholder.typicode.com'

const urlPosts = `${url}/posts`
const urlUsers = `${url}/users`

const fixUser = user => ({
  ...user,
  ville: R.path([], user),
  nom_utilisateur: R.prop('username', user),
})

fetch(urlUsers)
  .then(r => r.json())
  .then(users => {
    console.log(users.map(fixUser))
  })