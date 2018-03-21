const io = require('socket.io')();
const messageHandlers = require('./messageHandlers')
var _ = require('lodash');

var db = require("seraph")({
    server: "http://localhost:7474",
    pass: "klaxon" });
console.log('Connected to Neo4J DB')

users = {}
const state = {
    counter: 0
}

function onUserLogin()
{
    // TODO: Duplicated in messageHandlers
    for(var id in users)
        if(users[id].subscribedToUsers)
            users[id].client.emit('users', _.flatMap(users, u => u.name))
}

io.on('connection', (client) => {

    console.log('New client connected: ' + client.id)
    users[client.id] = {client: client, name: "Unknown User (" + client.id + ")"}

    console.log('Number of users: ' + Object.keys(users).length)
    
    for(var message in messageHandlers)
    {
        const msg = message
        client.on(message, data => {
            messageHandlers[msg]({
                client: client,
                user: users[client.id],
                users: users,
                data: data,
                state: state,
            })
        })
    }

    onUserLogin()

    client.on('disconnect', reason => {
        delete users[client.id];
        console.log('Client disconnected with reason: ' + reason)
        console.log('Number of users: ' + Object.keys(users).length)
        onUserLogin()
    })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);