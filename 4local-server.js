// this is just for local file serving during development because module imports require host origin has no routes, just uses static file serving

const express = require('express')
const app = express()

app.use(express.static('docs'))

app.listen(1339, () => console.log('Example app listening on port 1339!'))
