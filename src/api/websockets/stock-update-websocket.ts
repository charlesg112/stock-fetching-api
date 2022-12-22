import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';
import { WebsocketDirectory } from './websocket-directory';
import { WebsocketEventAssembler } from './events/websocket-event-assembler';

export class StockUpdateWebsocket {
    private webSocket: WebSocket;
    private websocketDirectory: WebsocketDirectory;
    private server: WebSocketServer;
    private assembler: WebsocketEventAssembler;

    constructor(server: Server, websocketDirectory: WebsocketDirectory, assembler: WebsocketEventAssembler) {
        this.webSocket = new WebSocket.WebSocket('ws:localhost:54321');
        this.server = new WebSocket.Server({ server });
        this.websocketDirectory = websocketDirectory;
        this.assembler = assembler;
        // this.setUpWebSocket();
        this.setUpServer();
    }

    private setUpWebSocket() {
        this.webSocket.on('message', (m) => {
            const dataString = m.toString();
            console.log(dataString);
        });
    }

    private setUpServer() {
        const stockUpdates = this;

        this.server.on('connection', (ws) => {
            ws.on('message', (m) => {
                try {
                    const event = stockUpdates.assembler.parseEvent(m.toString());
                    event.handle(ws);
                } catch (e: any) {
                    ws.send(e.toString());
                }
            });
        });
    }
}
