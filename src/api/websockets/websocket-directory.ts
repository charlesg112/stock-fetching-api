import { WebSocket } from 'ws';
import { Stock } from '../../stocks/stock';

export class WebsocketDirectory {
    private socketsMap: Map<string, WebSocket[]>;

    constructor() {
        this.socketsMap = new Map<string, WebSocket[]>();
    }

    public addSubscription(webSocket: WebSocket, stockId: string) {
        let connectedSockets = this.socketsMap.get(stockId);
        if (!connectedSockets) {
            connectedSockets = [];
        }

        if (connectedSockets.find((ws) => ws === webSocket) == undefined) {
            connectedSockets.push(webSocket);
        }

        this.socketsMap.set(stockId, connectedSockets);
    }

    public notifyStockUpdate(stock: Stock) {
        const stockId = stock.id;
        const connectedSockets = this.socketsMap.get(stockId);
        if (connectedSockets) {
            connectedSockets.forEach((s) => s.send(JSON.stringify(stock)));
        }
    }
}
