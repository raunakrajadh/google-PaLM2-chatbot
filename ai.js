const config = require('./config.json')
const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {      
    //config.domain = 'https://' + req.headers.host
    res.render('ai.ejs', {config})
})

const chatFunction = (io) => {

    io.on('connection', socket => {

        socket.on('sent', async (message) => {
            socket.emit('bot-message', 'Thinking..');
            let response = await require('./aimodels').googlegemini(message)
            socket.emit('bot-message', response);
        })
        
    })
}

module.exports = {app, chatFunction};