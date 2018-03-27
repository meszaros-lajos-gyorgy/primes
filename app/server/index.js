const express = require('express')
const path = require('path')
const SocketServer = require('ws').Server

// --------------

const wss = new SocketServer({
  port: 40510
})

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })

  setTimeout(() => {
    ws.send('x')
  }, 1000)
})

// --------------

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
})
app.get('/script.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/script.js'))
})

app.listen(3000, () => {
  console.log('server running')
})
