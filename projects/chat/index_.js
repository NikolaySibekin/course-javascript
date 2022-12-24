/* eslint-disable prettier/prettier */
import './chat.html'

let ws;
const socketServerURI = 'ws://localhost:4000';

const loginBtn = document.querySelector('#login');
const msgBtn = document.querySelector('#msg');
const logoutBtn = document.querySelector('#logout');
const textarea = document.querySelector('#textarea');
const input = document.querySelector('#nickname');

loginBtn.addEventListener('click', () => {
    const reqBody = {
        event: 'login',
        payload: {}
    }

    localStorage.nickname = input.value

    ws.send(JSON.stringify(reqBody))
})

msgBtn.addEventListener('click', () => {
    const reqBody = {
        event: 'massage',
        payload: {messageText: textarea.value, author: localStorage.nickname}
    }

    ws.send(JSON.stringify(reqBody))
})

logoutBtn.addEventListener('click', () => {
    const reqBody = {
        event: 'logout',
        payload: {}
    }

    ws.send(JSON.stringify(reqBody))
})

function start(socketURL) {
    ws = new WebSocket(socketURL)

    console.log(ws);
    ws.onmessage = (serverResponse) => {
        const { type, payload } = JSON.parse(serverResponse.data)
        console.log(type);

        switch  (type) {
            case 'login':
                console.log('кто-то залогинился');
                break;
            case 'message':
                console.log('кто-то отправил сообщение');
                document.querySelector('.content').innerHTML += `<div><b>${payload.author}</b><span>${payload.messageText}</span></div>`
                break;
            default:
                console.log('кто-то вышел из чата');
                break;
        }
    }
}

start(socketServerURI)

