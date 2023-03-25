const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected ', socket.id);
    
    socket.on('send_msg', (data) => {
        console.log(data);
        // socket.broadcast.emit('mssg_rcvd', data);
        // socket.emit('mssg_rcvd', data);
        io.emit('mssg_rcvd', data);
    })

})

app.use('/',express.static(__dirname + '/public'))

server.listen(3000, () => {
    console.log('server started on PORT:3000');

})
