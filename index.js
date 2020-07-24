const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
    // serve the index.html file
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(content));
    res.end(content);
});

const io = require('socket.io')(httpServer);
const users = [];
io.on('connect', socket => {
    socket.on('register', (message) => {
        console.log('Usuario Registrado ' + message);
        users.push({
            name: message,
            id: socket.id
        })
    });
    socket.on('disconnect', () => {
        users.forEach((user, index) => {
            if (socket.id == user.id) {
                console.log(user.name + ' DELETADO');
                users.splice(index);
            }
        })
    })
    notificarUsers()
    console.log(users);

});

function notificarUsers() {
    io.emit('users', users);
}
httpServer.listen(3000, () => {
    console.log('go to http://localhost:3000');
});