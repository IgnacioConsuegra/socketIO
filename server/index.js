import express from 'express';
import http from 'http'
import {Server as SocketServer} from 'socket.io';



const PORT = 4001;
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on('connection', socket => {
  console.log("Client connected.")
  socket.on('message', (body) => {
    console.log(body);
    socket.broadcast.emit('message', {
      body, 
      from: socket.id.slice(6)
    });
  })
}) 

server.listen(PORT, () => console.log("Server on port : ", PORT));


