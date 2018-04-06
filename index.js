const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.on('user connected', function (user) {
        console.log('user connected');
        io.emit('user connected', user);
    });

    socket.on('chat message', function (user, msg) {
        io.emit('chat message', user, msg);
    });

    socket.on('disconnect', function (user) {
        console.log('user disconnected');
        io.emit('user disconnected', user);
    });
});

io.on('user disconnected', function (socket) {

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
