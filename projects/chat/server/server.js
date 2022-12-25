/* eslint-disable prettier/prettier */
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 400 }, () => {
    console.log('Server started on port 4000');
})

const clients = new Set()

wss.on('connection', (wsClient) => {
    console.log('connect');
    clients.add(wsClient)

    wsClient.on('message', message => {
        const req = JSON.parse(message.toString())
        console.log(req);
        broadcast(req)
    })

    wsClient.on('close', () => {
        clients.delete(wsClient)
        broadcast({event: 'logout', payload: { data: 'logout'}})
    })
})

function broadcast(param) {
    let res

    clients.forEach(client => {
        switch (param.event) {
            case 'login':
                res = {type: 'login', payload: {data: 'login'}}
                break;
            case 'message':
                res = {type: 'message', payload: param.payload}
                break;
            default:
                res = {type: 'logout', payload: {data: 'logout'}}
                break;
        }

        client.send(JSON.stringify(res))
    })
}
