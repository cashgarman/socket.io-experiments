var _ = require('lodash');

module.exports =
{
    'subscribeToTimer': (context) =>
    {
        const interval = context.data.interval
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() =>
        {
            context.client.emit('timer', new Date());
        }, interval);
        context.client.emit('timer', new Date());
    },
    'subscribeToCounter': (context) =>
    {
        context.client.subscribedToCounter = true
        context.client.emit('counter', context.state.counter);
    },
    'subscribeToUsers': (context) =>
    {
        context.client.subscribedToUsers = true
        // TODO: Repeated in server.js
        context.client.emit('users', _.flatMap(context.users, u => u.name))
    },
    'incrementCounter': (context) =>
    {
        context.state.counter++
        
        for(var i in context.users)
            if(context.users[i].client.subscribedToCounter)
                context.users[i].client.emit('counter', context.state.counter);
    },
    'changeUsername': (context) =>
    {
        console.log(context.user.name + ' changed their name to ' + context.data.name)
        context.user.name = context.data.name
        
        // TODO: Duplicated in messageHandlers
        for(var id in context.users)
            if(context.users[id].client.subscribedToUsers)
                context.users[id].client.emit('users', _.flatMap(users, u => u.name))
    }
};