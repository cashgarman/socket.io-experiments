var _ = require('lodash');

module.exports.sendToClient = function (client, message, data, checkFlag=undefined)
{
    if(!checkFlag || clients[i].client[checkFlag])
        client.emit(message, data)
}

module.exports.sendToClients = function (clients, subject, data)
{
    for(var i in clients)
        if(_.includes(clients[i].subscriptions, subject))
            clients[i].emit(subject, data)
}