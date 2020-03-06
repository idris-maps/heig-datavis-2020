const fetch = require('node-fetch')
const R = require('ramda')
const url = 'https://jsonplaceholder.typicode.com'

const urlPosts = `${url}/posts`
const urlUsers = `${url}/users`

const fixUser = user => ({
  id: R.prop('id', user),
  ville: R.path(['address', 'city'], user),
  nom_utilisateur: R.prop('username', user),
  nom_companie: R.path(['company', 'name'], user),
})

const getUsers = () => fetch(urlUsers)
  .then(r => r.json())
  .then(R.map(fixUser))

const getPosts = () => fetch(urlPosts)
  .then(r => r.json())
  .then(R.map(R.pick(['userId', 'title'])))


Promise.all([
  getUsers(),
  getPosts(),
])
  .then(([users, posts]) =>
    users.map(user => R.omit(['id'],
      {
      ...user,
      titres: posts.filter(R.propEq('userId', user.id)).map(R.prop('title')),
  })))
  .then(console.log)
  .catch(console.log)

  