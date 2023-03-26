const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const connect = require('./config/dbConfig');

io.on('connection', (socket) => {
    console.log('a user connected ', socket.id);
    
    socket.on('send_msg', (data) => {
        console.log(data);
        // socket.broadcast.emit('mssg_rcvd', data);
        // socket.emit('mssg_rcvd', data);
        io.emit('mssg_rcvd', data);
    })

})

app.set('view engine', 'ejs');

app.get('/chat/:roomId', (req,res) => {
    res.render('index');
})

app.use('/',express.static(__dirname + '/public'))

server.listen(3000, async () => {
    console.log('server started on PORT:3000');
    await connect();
    console.log('MONGODB server connected');
})
