import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';


export class StockUpdateWebsocket {

    private connectedSockets: WebSocket[];
    private server: WebSocketServer;

    constructor(server: Server) {
        this.server = new WebSocket.Server({ server });
        this.connectedSockets = [];
        this.setUpServer();
        setTimeout(() => this.sendStockUpdates())
    }

    private setUpServer() {
        const stockUpdates = this;

        this.server.on('connection', function connection(ws) {
            stockUpdates.connectedSockets.push(ws);
        });
    }

    private sendStockUpdates() {
        this.connectedSockets.forEach(s => s.send("yo"));
        setTimeout(() => this.sendStockUpdates(), 5000);
    }
}
