const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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
 
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name as well as room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id); // removes the user from any other room
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined the room.`));

        callback();
    });



    socket.on('createMessage', (message, callback) => {
        console.log('createMessage:', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
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

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
        }

        console.log('User disconnected');
    })
});

server.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
