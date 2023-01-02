import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';
import { WebsocketDirectory } from './websocket-directory';
import { WebsocketClientEventAssembler } from './events/client-events/websocket-client-event-assembler';
import { WebsocketWorkerEventAssembler } from './events/worker-events/websocket-worker-event-assembler';

export class StockUpdateWebsocket {
    private webSocket: WebSocket;
    private server: WebSocketServer;
    private readonly websocketDirectory: WebsocketDirectory;
    private readonly clientEventAssembler: WebsocketClientEventAssembler;
    private readonly workerEventAssembler: WebsocketWorkerEventAssembler;

    constructor(server: Server, websocketDirectory: WebsocketDirectory, clientEventAssembler: WebsocketClientEventAssembler, workerEventAssembler: WebsocketWorkerEventAssembler, address: string) {
        this.webSocket = new WebSocket.WebSocket(address);
        this.server = new WebSocket.Server({ server });
        this.websocketDirectory = websocketDirectory;
        this.clientEventAssembler = clientEventAssembler;
        this.workerEventAssembler = workerEventAssembler;
        this.setUpWebSocket();
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
                    const event = stockUpdates.clientEventAssembler.parseEvent(m.toString());
                    event.handle(ws);
                } catch (e: any) {
                    ws.send(e.toString());
                }
            });
        });
    }
}
