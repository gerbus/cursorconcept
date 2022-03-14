const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  socket.on('pointer', coords => {
    // console.log('sending coords from ', socket.id)
    io.emit('pointer', { id: socket.id, coords: coords })
  })
  socket.on('disconnect', () => {
    console.log('client disconnected', socket.id);
    io.emit('dead pointer', socket.id);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
