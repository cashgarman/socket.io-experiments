const io = require('socket.io')();
const messageHandlers = require('./messageHandlers')
const _ = require('lodash');
const Util = require('./util') 
var moment = require('moment')
var db = require("seraph")({
    server: "http://localhost:7474",
    pass: "klaxon" });
console.log('Connected to Neo4J DB')

const state = {
    counter: 0,
    chat: [],
    users: {},
    clients: [],
}

function onUsersChanged()
{
    // TODO: Duplicated in messageHandlers
    Util.sendToClients(state.clients, 'users', _.flatMap(state.users, u => u.name), 'subscribedToUsers')
}

io.on('connection', (client) => {

    console.log('New client connected: ' + client.id)
    state.clients.push(client)
    state.users[client.id] = {client: client, name: client.id}
    console.log('Number of users: ' + state.clients.length)
    
    for(var message in messageHandlers)
    {
        const msg = message
        client.on(message, data =>
            {
                messageHandlers[msg]({
                    client: client,
                    user: state.users[client.id],
                    clients: state.clients,
                    users: state.users,
                    data: data,
                    state: state,
                })
            })
    }

    onUsersChanged()

    client.on('disconnect', reason =>
    {
        console.log('Client ' + state.users[client.id].name + 'disconnected with reason: ' + reason)
        delete state.users[client.id];
        _.remove(state.clients, c => c.id == client.id)
        console.log('Number of users: ' + state.clients.length)

        onUsersChanged()
    })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

// Start the timer
setInterval(() =>
{
    Util.sendToClients(state.clients, 'time', moment().format('MMMM Do YYYY, h:mm:ss a'))
}, 1000);