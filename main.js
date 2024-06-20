const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./ai').app)
require('./ai').chatFunction(io);

const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`Listening at ${port}`)
})

process.on('uncaughtException', (error) => {
    console.log('Crashing error: ', error)
})
