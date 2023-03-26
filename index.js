const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const connect = require('./config/dbConfig');
const Chat = require('./models/chat');

io.on('connection', (socket) => {
    console.log('a user connected ', socket.id);

    socket.on('test room', (data) => {
        socket.join(data.roomId);
    })

    socket.on('send_msg', async (data) => {
        const chat = await Chat.create({
            content: data.msg,
            user: data.username,
            roomId: data.roomId
        });
        io.to(data.roomId).emit('mssg_rcvd', data);
    });

})

app.set('view engine', 'ejs');

app.get('/chat/:roomId', async (req, res) => {
    const chats = await Chat.find({
        roomId: req.params.roomId
    }).select('content user');
    res.render('index', {
        chats:chats,
        id:req.params.roomId
    });
})

app.use('/',express.static(__dirname + '/public'))

server.listen(3000, async () => {
    console.log('server started on PORT:3000');
    await connect();
    console.log('MONGODB server connected');
})
