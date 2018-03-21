import openSocket from 'socket.io-client';

const socket = openSocket('http://dev.ventureviewer.com:8000');

function subscribeToTimer(cb)
{
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', {interval: 1000});
}

function subscribeToCounter(cb)
{
    socket.on('counter', counter => cb(null, counter));
    socket.emit('subscribeToCounter');
}

function subscribeToUsers(cb)
{
    socket.on('users', users => cb(null, users));
    socket.emit('subscribeToUsers');
}

function incrementCounter()
{
    socket.emit('incrementCounter');
}

function changeUsername(name)
{
    socket.emit('changeUsername', {name: name});
}

export {
    subscribeToTimer,
    subscribeToCounter,
    subscribeToUsers,
    incrementCounter,
    changeUsername,
};