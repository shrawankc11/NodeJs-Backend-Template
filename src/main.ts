import * as dotenv from 'dotenv';
dotenv.config({
    'path':
        process.env.NODE_ENV === 'production'
            ? __dirname + '/../.env'
            : __dirname + '/../.env'
})

import http from 'http';
import app from './app.module';
import { WebSocketServer } from 'ws';

const port = process.env.PORT || 3000;

const wss = new WebSocketServer({ noServer: true });

const server = http.createServer(app).listen(port, () => {
    console.log(`Server listening at port: ${port}.`)
});


server.on('upgrade', (request, socket, head) => {

    if ((request.url || '/') === '/destroy-socket') {
        socket.destroy();
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    })
})

wss.on('connection', (socket) => {
    socket.send('hello from websocket server 1.');
})