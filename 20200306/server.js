const express = require('express')

const app = express()

const port = 3000

app.get('/', (req, res) =>
  res.status(200).json({ message: 'salut' }))


app.listen(port, () => console.log(`Listening on ${port}`))