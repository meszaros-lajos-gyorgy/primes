/* global WebSocket */

const ws = new WebSocket('ws://localhost:40510')
ws.onopen = () => {
  console.log('websocket is connected')
  ws.send('connected')
}
ws.onmessage = e => {
  console.log(e.data)
}
