const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const {generateMessage} = require('./utils/message.js');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// console.log(__dirname + './../public');
// console.log(publicPath);

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', {
    //     from: 'yves@mericor.eu',
    //     text: "Hey what's up ?",
    //     createdAt: 123
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
 
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined the chat app'));
 
    socket.on('createMessage', (message) => {
        console.log('createMessage:', message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        // io.emit('newMessage', { // emits to everyone
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // socket.broadcast.emit('newMessage', { // emits to everyone, but the sender
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });

    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

server.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
