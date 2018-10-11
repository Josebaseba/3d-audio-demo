
const express = require('express')
const app = express()
const dir = require('path').resolve('.')

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(dir + '/index.html'))

app.listen(3030, () =>  console.log('Server running: http://localhost:3030/'))
