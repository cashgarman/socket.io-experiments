var _ = require('lodash');
var Util = require('./util')
var moment = require('moment')

const stateFetchers = {
    'counter': state => state.counter,
    'time': state => moment().format('MMMM Do YYYY, h:mm:ss a'),
    'users': state => _.flatMap(state.users, u => u.name),
    'chat': state => state.chat,
}

function broadcastState(state, subject)
{
    Util.sendToClients(state.clients, subject, stateFetchers[subject](state))
}

module.exports =
{
    'subscribe': (context) =>
    {
        const subjects = context.data
        context.client.subscriptions = subjects
        subjects.forEach(s => {
            Util.sendToClient(context.client, s, stateFetchers[s](context.state));
        })
    },
    'incrementCounter': (context) =>
    {
        context.state.counter++
        broadcastState(context.state, 'counter')
    },
    'changeUsername': (context) =>
    {
        console.log(context.user.name + ' changed their name to ' + context.data.name)
        context.user.name = context.data.name
        broadcastState(context.state, 'users')
    },
    'sendChat': (context) =>
    {
        console.log(context.user.name + ' sent chat: ' + context.data.message)
        context.state.chat.push(context.user.name + ': ' + context.data.message)
        broadcastState(context.state, 'chat')
    }
};