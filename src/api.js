import openSocket from 'socket.io-client';

const socket = openSocket('http://dev.ventureviewer.com:8000');

function subscribeTo(subjects, cb)
{
    for(var subject in subjects)
    {
        // Closure
        const s = subject
        const callback = subjects[s]

        socket.on(s, data => callback(data));
        console.log('Subscribing to ' + subject)
    }
    socket.emit('subscribe', Object.keys(subjects));
}

function incrementCounter()
{
    socket.emit('incrementCounter');
}

function changeUsername(name)
{
    socket.emit('changeUsername', {name: name});
}

function sendChat(message)
{
    socket.emit('sendChat', {message: message});
}

function getRandom()
{
    socket.emit('getRandom');
}

export {
    subscribeTo,
    incrementCounter,
    changeUsername,
    sendChat,
    getRandom,
};